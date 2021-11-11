package main

import (
	"encoding/json"
	"net/http"
	"strconv"
	"sync"
	"webservice/ChaincodeController"
	"webservice/auth"
	"webservice/explorer"
	"webservice/login"
	"webservice/userQR"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"
	"github.com/unrolled/render"
	"github.com/urfave/negroni"
)

var rd *render.Render = render.New()

type Children struct {
	Name string `json:"name"`
	Coin int    `json:"coin"`
}

// ---------- get Children's info ---------------------------
type KVRecord struct {
	Key    string   `json:"Key"`
	Record Children `json:"Record"`
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

// ---------- get Tx's History ---------------------------
type TxHistory struct {
	TxId  string `json:"TxId"`
	Value string `json:"Value"`
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

// get All Tx's Log
func getTransactionLog(w http.ResponseWriter, r *http.Request) {
	byteReult := ChaincodeController.GetTxLogAll()

	TxRecord := []TxRecord{}

	json.Unmarshal(byteReult, &TxRecord)

	rd.JSON(w, http.StatusOK, TxRecord)
}

// ---------- purchase Item ---------------------------
type purchaseItem struct {
	Name          string          `json:"name"`
	PurchaseLists []PurchaseLists `json:"purchaseLists"`
}

type PurchaseLists struct {
	Title    string `json:"title"`
	Price    int    `json:"price"`
	Quantity int    `json:"Quantity"`
}

func purchase(w http.ResponseWriter, r *http.Request) {
	var pi purchaseItem

	err := json.NewDecoder(r.Body).Decode(&pi)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userName, err := auth.AuthActing(r)
	if err != nil {
		rd.JSON(w, http.StatusUnauthorized, "unauthorized")
		return
	}

	// check cookies's name == AuthActing's name
	if userName != pi.Name {
		rd.JSON(w, http.StatusUnauthorized, "not match name")
		return
	}

	// transfer Coin
	var wait sync.WaitGroup
	for i := 0; i < len(pi.PurchaseLists); i++ {
		wait.Add(1)
		coin := pi.PurchaseLists[i].Price * pi.PurchaseLists[i].Quantity
		go func(i int) {
			defer wait.Done()
			ChaincodeController.TransferCoin(userName, pi.PurchaseLists[i].Title, strconv.Itoa(coin))
		}(i)
	}
	wait.Wait()

	rd.JSON(w, http.StatusOK, "SUCCESS")
}

// ---------- transfer Money ---------------------------
type Transfer struct {
	Sender   string `json:"sender"`
	Receiver string `json:"receiver"`
	Coin     string `json:"coin"`
	UserID   string `json:"user_id"`
}

func transferMoney(w http.ResponseWriter, r *http.Request) {
	var tx Transfer

	err := json.NewDecoder(r.Body).Decode(&tx)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	userID, err := auth.AuthActing(r)
	if err != nil {
		rd.JSON(w, http.StatusUnauthorized, tx)
		return
	}

	tx.UserID = userID

	from := tx.Sender
	to := tx.Receiver
	coin := tx.Coin

	err = ChaincodeController.TransferCoin(from, to, coin)
	if err != nil {
		rd.JSON(w, http.StatusForbidden, tx)
	}

	rd.JSON(w, http.StatusOK, tx)
}

func NewHandler() http.Handler {
	// Using React
	// rd = render.New(render.Options{
	// 	Extensions: []string{".html", ".tmpl"},
	// 	Directory:  "./../front/html/",
	// })

	router := mux.NewRouter()

	n := negroni.New(negroni.NewRecovery(), negroni.NewLogger())
	n.UseHandler(router)

	router.HandleFunc("/getTransaction/{name}", getTransactionHistory).Methods("GET")
	router.HandleFunc("/transactionLogAll", getTransactionLog).Methods("GET")
	router.HandleFunc("/getAllInfo", getAllChildrenInfo).Methods("GET")
	router.HandleFunc("/transfer", transferMoney).Methods("POST")
	router.HandleFunc("/purchase", purchase).Methods("POST")

	app := &explorer.AppHandler{Handler: n, DB: explorer.NewDBHandler()}
	router.HandleFunc("/blocks", app.GetBlocks).Methods("GET")
	router.HandleFunc("/channel", app.GetChannel).Methods("GET")
	router.HandleFunc("/chaincode", app.GetChaincode).Methods("GET")
	router.HandleFunc("/txs", app.GetTxs).Methods("GET")

	// Login
	router.HandleFunc("/login", login.LoginCheck).Methods("POST")
	router.HandleFunc("/logout", login.Logout).Methods("POST")
	router.HandleFunc("/signup", login.SignUp).Methods("POST")
	router.HandleFunc("/auth", login.Auth).Methods("POST")
	router.HandleFunc("/childInfo/{name}", login.ChildrenInfo).Methods("GET")

	// Info QRCODE
	router.HandleFunc("/qrcode/{name}", userQR.Qrcode).Methods("GET")

	// Not use FileServer for web --> Use React Library
	// router.PathPrefix("/css").Handler(http.StripPrefix("/css/", http.FileServer(http.Dir("../front/css/"))))
	// router.PathPrefix("/js").Handler(http.StripPrefix("/js/", http.FileServer(http.Dir("../front/js/"))))
	// router.PathPrefix("/").Handler(http.FileServer(http.Dir("./../front/html/")))

	// CORS
	credentials := handlers.AllowCredentials()
	headers := handlers.AllowedHeaders([]string{"X-Requested-With", "Content-Type", "Authorization", "Access-Control-Allow-Origin", "Access-Control-Allow-Methods", "Access-Control-Allow-Credentials"})
	methods := handlers.AllowedMethods([]string{"GET", "POST", "PUT", "HEAD"})
	origins := handlers.AllowedOrigins([]string{"http://localhost:3000", "http://205c-182-208-92-34.ngrok.io"})
	return handlers.CORS(headers, credentials, methods, origins)(app)

}
