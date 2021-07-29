package api

import (
	"encoding/json"
	"fmt"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/urfave/negroni"
)

var rd *render.Render = render.New()

type KVRecord struct {
	Key    string   `json:"Key"`
	Record Children `json:"Record"`
}

type Children struct {
	Name string `json:"name"`
	Coin int    `json:"coin"`
}

type TxHistory struct {
	TxId  string `json:"TxId"`
	Value string `json:"Value"`
}

func getAllChildrenInfo(w http.ResponseWriter, r *http.Request) {
	byteReult := GetAllInfo()

	KVRecord := []KVRecord{}
	json.Unmarshal(byteReult, &KVRecord)

	rd.JSON(w, http.StatusOK, KVRecord)
	// fmt.Println("-------------")
	// GetBlockInfo()
	// fmt.Println("-------------")
}

func getTransactionHistory(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	name := vars["name"]

	byteResult := GetTransaction(name)
	tx := []TxHistory{}
	fmt.Println("---------------------")
	fmt.Println(string(byteResult))
	json.Unmarshal(byteResult, &tx)
	fmt.Println("transaction : ", tx)
	fmt.Println("---------------------")

	rd.JSON(w, http.StatusOK, tx)
}

func NewHandler() http.Handler {
	router := mux.NewRouter()

	router.HandleFunc("/getAllInfo", getAllChildrenInfo).Methods("GET")
	router.HandleFunc("/getTransaction/{name}", getTransactionHistory).Methods("GET")

	router.PathPrefix("/css").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("../front/css/"))))
	router.PathPrefix("/js").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("../front/js/"))))
	router.PathPrefix("/").Handler(http.FileServer(http.Dir("./../front/html/")))

	n := negroni.Classic()
	n.UseHandler(router)

	return router
}
