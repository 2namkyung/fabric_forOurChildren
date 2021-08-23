package api

import (
	"encoding/json"
	"net/http"
)

type SignForm struct {
	Name string `json:"name"`
}

type SignUpCheck struct {
	StatusCode int `json:"statusCode"`
}

func signUp(w http.ResponseWriter, r *http.Request) {
	var signform SignForm
	var status SignUpCheck

	err := json.NewDecoder(r.Body).Decode(&signform)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	name := signform.Name

	err = EnrollAdmin()
	if err != nil {
		status.StatusCode = 0 // 0 : enroll admin error
		rd.JSON(w, http.StatusBadRequest, status)
		return
	}

	err = RegisteringUser(name)
	if err != nil {
		status.StatusCode = 1 // 1 : register user error
		rd.JSON(w, http.StatusBadRequest, status)
		return
	}

	err = MakeUserMSP(name)
	if err != nil {
		status.StatusCode = 2 // 2 : make user msp error
		rd.JSON(w, http.StatusBadRequest, status)
		return
	}

	status.StatusCode = 3 // 3 : OKAY
	rd.JSON(w, http.StatusOK, status)
}
