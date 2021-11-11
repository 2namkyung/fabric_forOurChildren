package explorer

type DBHandler interface {
	QueryBlock() []Block
	QueryChannel() []Channel
	QueryChaincode() []Chaincode
	QueryTxs() []Txs
	Close()
}

func NewDBHandler() DBHandler {
	return PQConn()
}
