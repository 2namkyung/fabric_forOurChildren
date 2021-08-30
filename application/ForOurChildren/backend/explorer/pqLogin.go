package explorer

func (pq *pqHandler) SignUpChildren(name, password, location, phone, expiration string, age int) {
	sqlStatement := `INSERT INTO children (name, password, location, phone, expiration, age) VALUES ($1, $2, $3, $4, $5, $6)`
	_, err := pq.db.Query(sqlStatement, name, password, location, phone, expiration, age)

	if err != nil {
		panic(err)
	}
}
