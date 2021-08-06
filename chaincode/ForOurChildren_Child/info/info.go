package info

import (
	"encoding/json"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing a children
type CC_Query struct {
	contractapi.Contract
}

// Children
type Children struct {
	Name string `json:"name"`
	Coin int    `json:"coin"`
}

type Transfer struct {
	Receiver string `json:"receiver"`
	Sender   string `json:"sender"`
	Coin     int    `json:"coin"`
	Amount   int    `json:"amount"`
	Time     string `json:"time"`
}

type QueryResult struct {
	Key    string    `json:"Key"`
	Record *Children `json:"Record"`
}

func (c *CC_Query) InitLedger(ctx contractapi.TransactionContextInterface) error {
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

func (c *CC_Query) CreateCoin(ctx contractapi.TransactionContextInterface, name string, coin int) error {
	child := Children{Name: name, Coin: coin}

	childAsBytes, _ := json.Marshal(child)

	return ctx.GetStub().PutState(name, childAsBytes)
}

func (c *CC_Query) QueryCoin(ctx contractapi.TransactionContextInterface, name string) (*Children, error) {
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

func (c *CC_Query) QueryAllChildren(ctx contractapi.TransactionContextInterface) ([]QueryResult, error) {
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
