package explorer

import (
	"fmt"
)

type Block struct {
	BlockNum      int    `json:"block_number"`
	PrevBlockHash string `json:"prevblock_hash"`
	BlockHash     string `json:"block_hash"`
	CreatedAt     string `json:"created_at"`
	Network       string `json:"network_name"`
}

func (pq *pqHandler) QueryBlock() []Block {

	var blocknum int
	var preblockHash, blockHash, createdAt, network string

	var result []Block

	rows, err := pq.db.Query("SELECT blocknum, prehash, blockhash, createdt, network_name FROM blocks")
	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&blocknum, &preblockHash, &blockHash, &createdAt, &network)
		if err != nil {
			fmt.Println(err)
		}
		block := Block{BlockNum: blocknum, PrevBlockHash: preblockHash, BlockHash: blockHash, CreatedAt: createdAt, Network: network}
		result = append(result, block)
	}

	return result
}
