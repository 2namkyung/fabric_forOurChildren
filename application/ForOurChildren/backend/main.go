package main

import (
	"fmt"
	"net/http"
	"webservice/api"
)

func main() {
	fmt.Println("Server:4000 Start!!")
	http.ListenAndServe(":4000", api.NewHandler())
}
