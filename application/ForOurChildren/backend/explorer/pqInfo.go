package explorer

type UserInfo struct {
	Name       string `json:"name"`
	Location   string `json:"location"`
	Phone      string `json:"phone"`
	Expiration string `json:"expiration"`
	Age        int    `json:"age"`
}

func (pq *pqHandler) GetUserInfo(name string) UserInfo {
	sqlStatement := `SELECT name, location, phone, expiration, age FROM children where name=$1`
	rows, err := pq.db.Query(sqlStatement, name)

	var userName, location, phone, expiration string
	var age int

	if err != nil {
		panic(err)
	}

	if rows.Next() {
		rows.Scan(&userName, &location, &phone, &expiration, &age)

	}

	return UserInfo{Name: userName, Location: location, Phone: phone, Expiration: expiration, Age: age}
}
