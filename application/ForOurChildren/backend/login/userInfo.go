package login

import (
	"net/http"
	"webservice/explorer"

	"github.com/gorilla/mux"
)

func ChildrenInfo(w http.ResponseWriter, r *http.Request) {

	vars := mux.Vars(r)
	name := vars["name"]

	userInfo := explorer.PQConn().GetUserInfo(name)

	rd.JSON(w, http.StatusOK, userInfo)
}
