package main

import (
	"encoding/json"
	"strconv"
	"time"

	"github.com/hyperledger/fabric-chaincode-go/shim"
	pb "github.com/hyperledger/fabric-protos-go/peer"
)

type Chaincode struct {
}

func (c *Chaincode) Init(stub shim.ChaincodeStubInterface) pb.Response {
	return shim.Success(nil)
}

func (c *Chaincode) Invoke(stub shim.ChaincodeStubInterface) pb.Response {

	function, args := stub.GetFunctionAndParameters()

	if function == "Transfer" {
		return c.Transfer(stub, args)
	}

	return shim.Success(nil)
}

func (c *Chaincode) Transfer(stub shim.ChaincodeStubInterface, args []string) pb.Response {
	if len(args) < 3 {
		return shim.Error("Incorrect number of arguments. Expecting 3")
	}

	from := args[0]
	to := args[1]
	amount := args[2]

	fromBytes, err := stub.GetState(from)
	if err != nil {
		return shim.Error("Failed to get Coin : " + err.Error())
	} else if fromBytes == nil {
		return shim.Error("Child does not exist")
	}

	result := TransactionLog{}
	err = json.Unmarshal(fromBytes, &result)
	if err != nil {
		return shim.Error(err.Error())
	}

	result.Sender = from
	result.Receiver = to
	amountInt, _ := strconv.Atoi(amount)
	result.Amount = amountInt

	time := time.Now().Format("2006-01-02 15:04:05")
	result.Time = time

	DataJsonasBytes, _ := json.Marshal(result)
	err = stub.PutState("txLog", DataJsonasBytes)

	if err != nil {
		return shim.Error(err.Error())
	}

	return shim.Success(nil)
}
