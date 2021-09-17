package ChaincodeController

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"time"
	"webservice/auth"
)

func TransferCoin(args ...string) {
	contract := auth.GetAuth_Contract("children")
	from := args[0]
	to := args[1]
	time := time.Now().Format("2006-01-02 15:04:05")
	coin := args[2]

	// Tx Key
	h := sha1.New()
	h.Write([]byte(time))
	hash := h.Sum(nil)
	TxID := "TxLog_" + hex.EncodeToString(hash[:5])

	_, err := contract.SubmitTransaction("TransferAsset", from, to, time, TxID, coin)
	if err != nil {
		fmt.Printf("Failed to submit transaction: %s\n", err)
		return
	}
}
