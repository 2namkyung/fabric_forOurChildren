package api

import (
	"crypto/sha1"
	"encoding/hex"
	"fmt"
	"os"
	"time"

	"github.com/hyperledger/fabric-sdk-go/pkg/client/ledger"
	"github.com/hyperledger/fabric-sdk-go/pkg/common/providers/context"
	contextImpl "github.com/hyperledger/fabric-sdk-go/pkg/context"
	"github.com/hyperledger/fabric-sdk-go/pkg/fab/mocks"
)

func GetTransaction(name string) []byte {
	contract := GetAuth_Contract("children")

	result, err := contract.EvaluateTransaction("QueryTransactionHistroy", name)
	if err != nil {
		fmt.Printf("Failed to evaluate transaction: %s\n", err)
		os.Exit(1)
	}

	return result
}

func GetAllInfo() []byte {
	contract := GetAuth_Contract("children")

	result, err := contract.EvaluateTransaction("QueryAllChildren")
	if err != nil {
		fmt.Printf("Failed to evaluate transaction: %s\n", err)
		os.Exit(1)
	}

	return result
}

func GetTxLogAll() []byte {
	contract := GetAuth_Contract("children")

	result, err := contract.EvaluateTransaction("QueryTransactionLogAll")
	if err != nil {
		fmt.Printf("Failed to evaluate transaction: %s\n", err)
		os.Exit(1)
	}

	return result
}

func TransferCoin(args ...string) {
	contract := GetAuth_Contract("children")
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
		os.Exit(1)
	}
}

func GetBlockInfo() {

	ctx := TestChannelProvider("mychannel")
	// ctx := ChannelProvider("mychannel")
	c, err := ledger.New(ctx)
	if err != nil {
		fmt.Println("failed to create client")
	}

	block, err := c.QueryBlock(1)
	if err != nil {
		fmt.Printf("failed to query for blockchain info : %s\n", err)
	}

	if block != nil {
		fmt.Println("Retrieved ledger info")
		fmt.Println(block)
	}
}

func TestChannelProvider(channelID string) context.ChannelProvider {
	channelProvider := func() (context.Channel, error) {
		return mocks.NewMockChannel(channelID)
	}

	return channelProvider
}

func ChannelProvider(channelID string) context.ChannelProvider {
	channelProvider := func() (context.Channel, error) {
		user := new(contextImpl.Channel)
		cx := user.Providers()
		cp := createClientContext(cx)
		return contextImpl.NewChannel(cp, channelID)
	}

	return channelProvider
}

func createChannelContext(clientContext context.ClientProvider, channelID string) context.ChannelProvider {

	channelProvider := func() (context.Channel, error) {
		return contextImpl.NewChannel(clientContext, channelID)
	}

	return channelProvider
}

func createClientContext(client context.Client) context.ClientProvider {
	return func() (context.Client, error) {
		return client, nil
	}
}
