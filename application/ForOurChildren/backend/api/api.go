package api

import (
	"encoding/json"
	"fmt"
	"net/http"
	"webservice/explorer"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/urfave/negroni"
)

var rd *render.Render = render.New()

type AppHandler struct {
	http.Handler
	db explorer.DBHandler
}

type KVRecord struct {
	Key    string   `json:"Key"`
	Record Children `json:"Record"`
}

type TransactionLog struct {
	Sender   string `json:"sender"`
	Receiver string `json:"receiver"`
	Amount   int    `json:"amount"`
	Time     string `json:"time"`
}

type TxRecord struct {
	Key   string          `json:"Key"`
	TxLog *TransactionLog `json:"TransactionLog"`
}

type Children struct {
	Name string `json:"name"`
	Coin int    `json:"coin"`
}

type TxHistory struct {
	TxId  string `json:"TxId"`
	Value string `json:"Value"`
}

type Transfer struct {
	Sender   string `json:"sender"`
	Receiver string `json:"receiver"`
	Coin     string `json:"coin"`
}

type SignForm struct {
	Name string `json:"name"`
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
	// rd.HTML(w, http.StatusOK, "transaction", tx)
}

func getTransactionLog(w http.ResponseWriter, r *http.Request) {
	byteReult := GetTxLogAll()

	TxRecord := []TxRecord{}
	fmt.Println("---------------------")
	fmt.Println(string(byteReult))
	json.Unmarshal(byteReult, &TxRecord)
	fmt.Println("transaction : ", TxRecord)
	fmt.Println("---------------------")

	rd.JSON(w, http.StatusOK, TxRecord)
}

func transferMoney(w http.ResponseWriter, r *http.Request) {
	var tx Transfer

	err := json.NewDecoder(r.Body).Decode(&tx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	from := tx.Sender
	to := tx.Receiver
	coin := tx.Coin
	TransferCoin(from, to, coin)
	rd.JSON(w, http.StatusOK, tx)
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

func NewHandler() http.Handler {
	// Using React
	// rd = render.New(render.Options{
	// 	Extensions: []string{".html"},
	// 	Directory:  "./../front/html/",
	// })

	router := mux.NewRouter()

	router.HandleFunc("/getTransaction/{name}", getTransactionHistory).Methods("GET", "OPTIONS")
	router.HandleFunc("/transactionLogAll", getTransactionLog).Methods("GET", "OPTIONS")
	router.HandleFunc("/getAllInfo", getAllChildrenInfo).Methods("GET", "OPTIONS")
	router.HandleFunc("/transfer", transferMoney).Methods("POST")
	router.HandleFunc("/signup", signUp).Methods("POST")

	n := negroni.New(negroni.NewRecovery(), negroni.NewLogger())
	n.UseHandler(router)

	app := &AppHandler{Handler: n, db: explorer.NewDBHandler()}
	router.HandleFunc("/blocks", app.getBlocks).Methods("GET", "OPTIONS")
	router.HandleFunc("/channel", app.getChannel).Methods("GET", "OPTIONS")
	router.HandleFunc("/chaincode", app.getChaincode).Methods("GET", "OPTIONS")
	router.HandleFunc("/txs", app.getTxs).Methods("GET", "OPTIONS")

	// Using React
	// router.PathPrefix("/css").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("../front/css/"))))
	// router.PathPrefix("/js").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("../front/js/"))))
	// router.PathPrefix("/").Handler(http.FileServer(http.Dir("./../front/html/")))

	return handlers.CORS(handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Methods"}), handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD", "OPTIONS"}), handlers.AllowedOrigins([]string{"*"}))(router)
}
