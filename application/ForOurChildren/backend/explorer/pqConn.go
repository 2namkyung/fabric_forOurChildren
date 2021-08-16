package explorer

import (
	"database/sql"
	"fmt"

	_ "github.com/lib/pq"
)

type pqHandler struct {
	db *sql.DB
}

const (
	host     = "localhost"
	port     = 5432
	user     = "hppoc"
	password = "password"
	dbname   = "fabricexplorer"
)

func (pq *pqHandler) Close() {
	pq.db.Close()
}

func PQConn() DBHandler {
	psqlInfo := fmt.Sprintf("host=%s port=%d user=%s "+"password=%s dbname=%s sslmode=disable", host, port, user, password, dbname)

	db, err := sql.Open("postgres", psqlInfo)
	if err != nil {
		panic(err)
	}

	return &pqHandler{db: db}
}
