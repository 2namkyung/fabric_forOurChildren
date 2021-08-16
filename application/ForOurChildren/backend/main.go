package main

import (
	"fmt"
	"net/http"
	"webservice/api"
	"webservice/explorer"
)

func main() {
	fmt.Println("Server:4000 Start!!")

	pq := explorer.PQConn()
	err := pq.Ping()

	if err != nil {
		fmt.Println(err)
	}

	var id int
	var blockNum int
	rows, err := pq.Query("SELECT id, blocknum FROM blocks")
	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()
	for rows.Next() {
		err = rows.Scan(&id, &blockNum)
		if err != nil {
			fmt.Println(err)
		}
		fmt.Println(id, blockNum)
	}

	defer pq.Close()

	http.ListenAndServe(":4000", api.NewHandler())
}
