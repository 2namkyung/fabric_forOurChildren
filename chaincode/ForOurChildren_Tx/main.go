package main

import (
	"ForOurChildren/tx/tx"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	chaincode, err := contractapi.NewChaincode(new(tx.CC_invoke))

	if err != nil {
		fmt.Printf("Error create ForOurChildren chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting ForOurChildren chaincode: %s", err.Error())
	}

}
