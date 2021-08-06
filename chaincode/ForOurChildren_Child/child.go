package main

import (
	"ForOurChildren/ForOurChildren_query/info"
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

func main() {
	chaincode, err := contractapi.NewChaincode(new(info.CC_Query))

	if err != nil {
		fmt.Printf("Error create ForOurChildren chaincode: %s", err.Error())
		return
	}

	if err := chaincode.Start(); err != nil {
		fmt.Printf("Error starting ForOurChildren chaincode: %s", err.Error())
	}

	// err = shim.Start(new(Chaincode))
}
