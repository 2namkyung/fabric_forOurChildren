package main

import(
	"encoding/json"
	"fmt"
	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for managing a children
type SmartContract struct{
	contractapi.Contract
}

// Children
type Children struct{
	Name string `json:"name"`
	Coin int `json:"coin"`
}

type QueryResult struct{
	Key string `json:"Key"`
	Record *Children
}

func (s *SmartContract) InitLedger(ctx contractapi.TransactionContextInterface) error{
	children := []Children{
		Children{Name:"Lee", Coin:3000000},
		Children{Name:"Kim", Coin:3000000},
		Children{Name:"Park", Coin:3000000},
		Children{Name:"Choi", Coin:3000000},
		Children{Name:"Jin", Coin:3000000},
		Children{Name:"Hwang", Coin:3000000},
	}

	for _, child := range children{
		childAsBytes, _ := json.Marshal(child)
		err := ctx.GetStub().PutState(child.Name, childAsBytes)

		if err != nil{
			return fmt.Errorf("Failed to put to world state. %s", err.Error())
		}
	}

	return nil
}

func(s *SmartContract) CreateCoin(ctx contractapi.TransactionContextInterface, name string, coin int) error{
	child := Children{Name:name, Coin:coin}

	childAsBytes, _ := json.Marshal(child)

	return ctx.GetStub().PutState(name, childAsBytes)
}

func(s *SmartContract) QueryCoin(ctx contractapi.TransactionContextInterface, name string) (*Children, error){
	childAsBytes, err := ctx.GetStub().GetState(name)

	if err != nil{
		return nil, fmt.Errorf("Failed to read from world state. %s", err.Error())
	}

	if childAsBytes == nil{
		return nil, fmt.Errorf("%s does not exist", name)
	}

	child := new(Children)
	_ = json.Unmarshal(childAsBytes, child)
	return child, nil

}

func(s *SmartContract) QueryAllChildren(ctx contractapi.TransactionContextInterface) ([]QueryResult, error){
	startKey := ""
	endKey := ""

	resultsIterator, err := ctx.GetStub().GetStateByRange(startKey, endKey)

	if err != nil {
		return nil, err
	}
	defer resultsIterator.Close()

	results := []QueryResult{}

	for resultsIterator.HasNext(){
		queryResponse, err := resultsIterator.Next()

		if err != nil{
			return nil, err
		}

		child := new(Children)
		_ = json.Unmarshal(queryResponse.Value, child)
		QueryResult := QueryResult{Key:queryResponse.Key, Record:child}
		results = append(results, QueryResult)
	}

	return results, nil
}

func main(){
	chaincode, err := contractapi.NewChaincode(new(SmartContract))

	if err != nil{
		fmt.Printf("Error create ForOurChildren chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil{
		fmt.Printf("Error starting ForOurChildren chaincode: %s", err.Error())
	}
}