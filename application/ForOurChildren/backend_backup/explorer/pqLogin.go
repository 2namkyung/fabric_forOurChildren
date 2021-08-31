package explorer

func (pq *pqHandler) SignUpChildren(name, password, location, phone, expiration string, age int) {
	sqlStatement := `INSERT INTO children (name, password, location, phone, expiration, age) VALUES ($1, $2, $3, $4, $5, $6)`
	_, err := pq.db.Query(sqlStatement, name, password, location, phone, expiration, age)

	if err != nil {
		panic(err)
	}
}

func (pq *pqHandler) LoginChildren(name, password string) bool {
	sqlStatement := `SELECT name, password FROM children where name=$1 AND password=$2`
	rows, err := pq.db.Query(sqlStatement, name, password)

	if err != nil {
		panic(err)
	}

	if rows.Next() {
		return true
	}

	return false
}
