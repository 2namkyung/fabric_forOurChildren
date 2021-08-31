package login

import (
	"encoding/json"
	"net/http"
	"time"
	"webservice/explorer"
)

type SignForm struct {
	Name       string `json:"name"`
	Password   string `json:"password"`
	Age        int    `json:"age"`
	Location   string `json:"location"`
	Expiration string `json:"expiration"`
	Phone      string `json:"phone"`
}

type SignUpCheck struct {
	StatusCode int `json:"statusCode"`
}

func SignUp(w http.ResponseWriter, r *http.Request) {
	var signform SignForm
	var status SignUpCheck

	err := json.NewDecoder(r.Body).Decode(&signform)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	name := signform.Name
	password := signform.Password
	age := signform.Age
	location := signform.Location
	phone := signform.Phone
	expiration := time.Now().Add(time.Hour * 24 * 365).Format("2006-01-02 15:04:05")

	check := true

	err = EnrollAdmin()
	if err != nil {
		status.StatusCode = 0 // 0 : enroll admin error
		rd.JSON(w, http.StatusBadRequest, status)
		check = false
		return
	}

	err = RegisteringUser(name)
	if err != nil {
		status.StatusCode = 1 // 1 : register user error
		rd.JSON(w, http.StatusBadRequest, status)
		check = false
		return
	}

	err = MakeUserMSP(name)
	if err != nil {
		status.StatusCode = 2 // 2 : make user msp error
		rd.JSON(w, http.StatusBadRequest, status)
		check = false
		return
	}

	if check {
		explorer.PQConn().SignUpChildren(name, password, location, phone, expiration, age)
	}

	status.StatusCode = 3 // 3 : OKAY
	rd.JSON(w, http.StatusOK, status)
}
