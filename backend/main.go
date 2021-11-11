package main

import (
	"fmt"
	"net/http"
	"webservice/explorer"
)

func main() {
	fmt.Println("Server:4000 Start!!")

	pq := explorer.PQConn()

	defer pq.Close()

	http.ListenAndServe(":4000", NewHandler())
}
