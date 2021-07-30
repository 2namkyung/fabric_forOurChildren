package main

import (
	"encoding/json"
	"fmt"
	"log"
	"time"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing a children
type SmartContract struct {
	contractapi.Contract
}

// Children
type Children struct {
	Name string `json:"name"`
	Coin int    `json:"coin"`
}

type Transfer struct {
	Children
	Time string `json:"time"`
}

type QueryResult struct {
	Key    string    `json:"Key"`
	Record *Children `json:"Record"`
}

type TxHistory struct {
	TxID  string `json:"TxId"`
	Value string `json:"Value"`
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error {
	children := []Children{
		{Name: "Lee", Coin: 3000000},
		{Name: "Kim", Coin: 3000000},
		{Name: "Park", Coin: 3000000},
		{Name: "Choi", Coin: 3000000},
		{Name: "Jin", Coin: 3000000},
		{Name: "Hwang", Coin: 3000000},
	}

	for _, child := range children {
		childAsBytes, _ := json.Marshal(child)
		err := ctx.GetStub().PutState(child.Name, childAsBytes)

		if err != nil {
			return fmt.Errorf("Failed to put to world state. %s", err.Error())
		}
	}

	return nil
}

func (s *SmartContract) CreateCoin(ctx contractapi.TransactionContextInterface, name string, coin int) error {
	child := Children{Name: name, Coin: coin}

	childAsBytes, _ := json.Marshal(child)

	return ctx.GetStub().PutState(name, childAsBytes)
}

func (s *SmartContract) QueryCoin(ctx contractapi.TransactionContextInterface, name string) (*Children, error) {
	childAsBytes, err := ctx.GetStub().GetState(name)

	if err != nil {
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if childAsBytes == nil {
		return nil, fmt.Errorf("%s does not exist", name)
	}

	child := new(Children)
	_ = json.Unmarshal(childAsBytes, child)
	return child, nil

}

func (s *SmartContract) QueryAllChildren(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
	startKey := ""
	endKey := ""

	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	results := []QueryResult{}

	for resultsIterator.HasNext() {
		queryResponse, err := resultsIterator.Next()

		if err != nil {
			return nil, err
		}

		child := new(Children)
		_ = json.Unmarshal(queryResponse.Value, child)
		QueryResult := QueryResult{Key: queryResponse.Key, Record: child}
		results = append(results, QueryResult)
	}

	return results, nil
}

func (s *SmartContract) QueryTransactionHistroy(ctx contractapi.TransactionContextInterface, key string) []TxHistory {
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

func (s *SmartContract) TransferAsset(ctx contractapi.TransactionContextInterface, from, to string, coin int) error {
	fromAsBytes, err := ctx.GetStub().GetState(from)
	if err != nil {
		log.Fatal(err)
	}

	t := time.Now().UTC()

	fromResult := Transfer{}
	json.Unmarshal(fromAsBytes, &fromResult)
	fromResult.Coin -= coin
	fromResult.Time = t.Format("2006-01-02 15:04:05")
	fromMinus, _ := json.Marshal(fromResult)
	ctx.GetStub().PutState(from, fromMinus)

	toAsBytes, err := ctx.GetStub().GetState(to)
	toResult := Transfer{}
	json.Unmarshal(toAsBytes, &toResult)
	toResult.Coin += coin
	toResult.Time = t.Format("2006-01-02 15:04:05")
	toPlus, _ := json.Marshal(toResult)
	return ctx.GetStub().PutState(to, toPlus)
}

func main() {
	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil {
		fmt.Printf("Error create ForOurChildren chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting ForOurChildren chaincode: %s", err.Error())
	}
}
