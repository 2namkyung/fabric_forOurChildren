package ChaincodeController

import (
	"fmt"
	"os"
	"webservice/auth"

	"github.com/hyperledger/fabric-sdk-go/pkg/client/ledger"
	"github.com/hyperledger/fabric-sdk-go/pkg/common/providers/context"
	contextImpl "github.com/hyperledger/fabric-sdk-go/pkg/context"
	"github.com/hyperledger/fabric-sdk-go/pkg/fab/mocks"
)

func GetTransaction(name string) []byte {
	contract := auth.GetAuth_Contract("children")

	result, err := contract.EvaluateTransaction("QueryTransactionHistroy", name)
	if err != nil {
		fmt.Printf("Failed to evaluate transaction: %s\n", err)
		os.Exit(1)
	}

	return result
}

func GetAllInfo() []byte {
	contract := auth.GetAuth_Contract("children")

	result, err := contract.EvaluateTransaction("QueryAllChildren")
	if err != nil {
		fmt.Printf("Failed to evaluate transaction: %s\n", err)
		os.Exit(1)
	}

	return result
}

func GetTxLogAll() []byte {
	contract := auth.GetAuth_Contract("children")

	result, err := contract.EvaluateTransaction("QueryTransactionLogAll")
	if err != nil {
		fmt.Printf("Failed to evaluate transaction: %s\n", err)
		os.Exit(1)
	}

	return result
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

// ------------------Testing------------------------------

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
