package explorer

type DBHandler interface {
	QueryBlock() []Block
	Close()
}

func NewDBHandler() DBHandler {
	return PQConn()
}
