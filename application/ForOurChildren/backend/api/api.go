package api

import (
	"encoding/json"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/urfave/negroni"
)

var rd *render.Render = render.New()

type Children struct {
	Name string `json:"name"`
	Coin int    `json:"coin"`
}

func getAllChildrenInfo(w http.ResponseWriter, r *http.Request) {
	byteReult := GetResults()

	children := Children{}
	json.Unmarshal(byteReult, &children)

	rd.JSON(w, http.StatusOK, children)
}

func NewHandler() http.Handler {
	router := mux.NewRouter()

	router.HandleFunc("/getAllInfo", getAllChildrenInfo).Methods("GET")

	router.PathPrefix("/css").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("../front/css/"))))
	router.PathPrefix("/js").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("../front/js/"))))
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./../front/html/")))

	n := negroni.Classic()
	n.UseHandler(router)

	return router
}
