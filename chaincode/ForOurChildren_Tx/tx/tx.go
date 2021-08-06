package tx

import (
	"encoding/json"
	"fmt"
	"log"
	"strconv"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing a children
type CC_invoke struct {
	contractapi.Contract
}

// TransferLog
type TransactionLog struct {
	Sender   string `json:"sender"`
	Receiver string `json:"receiver"`
	Amount   int    `json:"amount"`
	Time     string `json:"time"`
}

type Transfer struct {
	Receiver string `json:"receiver"`
	Sender   string `json:"sender"`
	Coin     int    `json:"coin"`
	Amount   int    `json:"amount"`
	Time     string `json:"time"`
}

// Children
type Children struct {
	Name string `json:"name"`
	Coin int    `json:"coin"`
}

type TxHistory struct {
	TxID  string `json:"TxId"`
	Value string `json:"Value"`
}

func (c *CC_invoke) TransferAsset(ctx contractapi.TransactionContextInterface, from, to, time, TxID, value string) error {
	amount, _ := strconv.Atoi(value)

	Log := TransactionLog{}
	Log.Sender = from
	Log.Receiver = to
	Log.Amount = amount
	Log.Time = time
	LogResult, _ := json.Marshal(Log)

	// params := []string{"QueryCoin", from}
	// queryArgs := make([][]byte, len(params))
	// for i, arg := range params {
	// 	queryArgs[i] = []byte(arg)
	// }

	// res := ctx.GetStub().InvokeChaincode("QueryCoin", queryArgs, "mychannel")
	// if res.Status != shim.OK {
	// 	return fmt.Errorf("Failed to query chaincode. Got Error : %s", res.Payload)
	// }

	err := ctx.GetStub().PutState(TxID, LogResult)
	if err != nil {
		log.Fatal(err)
	}

	return nil
}

func (c *CC_invoke) QueryTransactionHistroy(ctx contractapi.TransactionContextInterface, key string) []TxHistory {
	history, err := ctx.GetStub().GetHistoryForKey(key)

	if err != nil {
		fmt.Println("history error : ", err)
		log.Fatal(err)
	}

	var arr []TxHistory

	for history.HasNext() {
		modification, err := history.Next()
		if err != nil {
			fmt.Println(err.Error())
			log.Fatal(err)
		}

		tx := TxHistory{TxID: modification.TxId, Value: string(modification.Value)}
		arr = append(arr, tx)
		fmt.Println("Returning information about", string(modification.Value))
	}

	return arr
}
