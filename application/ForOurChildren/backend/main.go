package main

import (
	"net/http"
	"webservice/api"
)

func main() {
	http.ListenAndServe(":4000", api.NewHandler())
}
