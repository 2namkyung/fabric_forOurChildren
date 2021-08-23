package api

import (
	"encoding/json"
	"fmt"
	"net/http"
)

type SignForm struct {
	Name string `json:"name"`
}

func signUp(w http.ResponseWriter, r *http.Request) {
	var signform SignForm

	err := json.NewDecoder(r.Body).Decode(&signform)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	name := signform.Name
	fmt.Println(name)
	err = RegisteringUser(name)
	err = MakeUserMSP(name)

	if err != nil {
		rd.JSON(w, http.StatusForbidden, signform)
	}
	rd.JSON(w, http.StatusOK, signform)
}
