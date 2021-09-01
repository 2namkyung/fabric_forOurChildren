package main

import (
	"encoding/json"
	"net/http"
	"webservice/ChaincodeController"
	"webservice/explorer"
	"webservice/login"
	"webservice/tokenJWT"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/urfave/negroni"
)

var rd *render.Render = render.New()

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
	UserID   string `json:"user_id`
}

func getAllChildrenInfo(w http.ResponseWriter, r *http.Request) {
	byteReult := ChaincodeController.GetAllInfo()

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

	byteResult := ChaincodeController.GetTransaction(name)
	tx := []TxHistory{}

	json.Unmarshal(byteResult, &tx)

	rd.JSON(w, http.StatusOK, tx)
	// rd.HTML(w, http.StatusOK, "transaction", tx)
}

func getInfoHistory(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	name := vars["name"]

	byteResult := ChaincodeController.GetTransaction(name)
	tx := []TxHistory{}

	json.Unmarshal(byteResult, &tx)

	rd.JSON(w, http.StatusOK, tx)
	// rd.HTML(w, http.StatusOK, "transaction", tx)
}

func getTransactionLog(w http.ResponseWriter, r *http.Request) {
	byteReult := ChaincodeController.GetTxLogAll()

	TxRecord := []TxRecord{}

	json.Unmarshal(byteReult, &TxRecord)

	rd.JSON(w, http.StatusOK, TxRecord)
}

func transferMoney(w http.ResponseWriter, r *http.Request) {
	var tx Transfer

	err := json.NewDecoder(r.Body).Decode(&tx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	tokenAuth, err := tokenJWT.ExtractTokenMetadata(r)
	if err != nil {
		rd.JSON(w, http.StatusUnauthorized, "unauthorized1")
		return
	}

	userID, err := tokenJWT.FetchAuth(tokenAuth)
	if err != nil {
		rd.JSON(w, http.StatusUnauthorized, "unauthorized2")
		return
	}

	tx.UserID = userID

	from := tx.Sender
	to := tx.Receiver
	coin := tx.Coin
	ChaincodeController.TransferCoin(from, to, coin)
	rd.JSON(w, http.StatusOK, tx)
}

func NewHandler() http.Handler {
	// Using React
	// rd = render.New(render.Options{
	// 	Extensions: []string{".html"},
	// 	Directory:  "./../front/html/",
	// })

	router := mux.NewRouter()

	n := negroni.New(negroni.NewRecovery(), negroni.NewLogger())
	n.UseHandler(router)

	router.HandleFunc("/getTransaction/{name}", getTransactionHistory).Methods("GET")
	router.HandleFunc("/transactionLogAll", getTransactionLog).Methods("GET")
	router.HandleFunc("/getAllInfo", getAllChildrenInfo).Methods("GET")
	router.HandleFunc("/transfer", transferMoney).Methods("POST")

	app := &explorer.AppHandler{Handler: n, DB: explorer.NewDBHandler()}
	router.HandleFunc("/blocks", app.GetBlocks).Methods("GET")
	router.HandleFunc("/channel", app.GetChannel).Methods("GET")
	router.HandleFunc("/chaincode", app.GetChaincode).Methods("GET")
	router.HandleFunc("/txs", app.GetTxs).Methods("GET")

	// Login
	router.HandleFunc("/login", login.LoginCheck).Methods("POST")
	router.HandleFunc("/logout", login.Logout).Methods("POST")
	router.HandleFunc("/signup", login.SignUp).Methods("POST")
	router.HandleFunc("/childInfo/{name}", login.ChildrenInfo).Methods("GET")

	// Not use FileServer for web --> Use React Library
	// router.PathPrefix("/css").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("../front/css/"))))
	// router.PathPrefix("/js").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("../front/js/"))))
	// router.PathPrefix("/").Handler(http.FileServer(http.Dir("./../front/html/")))

	// CORS
	credentials := handlers.AllowCredentials()
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Methods"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD"})
	origins := handlers.AllowedOrigins([]string{"*"})
	return handlers.CORS(headers, credentials, methods, origins)(app)

}