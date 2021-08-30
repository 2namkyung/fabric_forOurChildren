package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	_ "github.com/lib/pq"
)

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginStatus struct {
	LoginStatus bool `json:"login_status"`
}

func LoginCheck(w http.ResponseWriter, r *http.Request) {
	var login Login

	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		fmt.Println(err)
		fmt.Println(login)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := login.Email
	password := login.Password
	check := LoginStatus{}

	if email == "iddbxk@naver.com" && password == "1234" {
		check.LoginStatus = true
		rd.JSON(w, http.StatusOK, check)
		return
	}

	check.LoginStatus = false
	rd.JSON(w, http.StatusBadRequest, check)
}
