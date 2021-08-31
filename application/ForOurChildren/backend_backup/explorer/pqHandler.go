package explorer

import (
	"fmt"
)

type Chaincode struct {
	CCID      int    `json:"cc_id"`
	Name      string `json:"cc_name"`
	Version   string `json:"cc_version"`
	CreatedAt string `json:"cc_createdat"`
}

type Txs struct {
	BlockID   int    `json:"tx_blockID"`
	CCName    string `json:"tx_ccName"`
	Status    int    `json:"tx_status"`
	CreatedAt string `json:"tx_createdat"`
}

type Block struct {
	BlockNum      int    `json:"block_number"`
	PrevBlockHash string `json:"prevblock_hash"`
	BlockHash     string `json:"block_hash"`
	CreatedAt     string `json:"created_at"`
	Network       string `json:"network_name"`
}

type Channel struct {
	ID        int    `json:"network_id"`
	Name      string `json:"network_name"`
	Blocks    int    `json:"network_blocks"`
	CreatedAt string `json:"network_createdat"`
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

func (pq *pqHandler) QueryChannel() []Channel {

	var networkID, networkBlocks int
	var networkName, createdAt string

	var result []Channel

	rows, err := pq.db.Query("SELECT id, name, blocks, createdt FROM channel")
	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&networkID, &networkName, &networkBlocks, &createdAt)
		if err != nil {
			fmt.Println(err)
		}
		channel := Channel{ID: networkID, Blocks: networkBlocks, Name: networkName, CreatedAt: createdAt}
		result = append(result, channel)
	}

	return result
}

func (pq *pqHandler) QueryTxs() []Txs {

	var txBlockID, txStatus int
	var txCCName, createdAt string

	var result []Txs

	rows, err := pq.db.Query("SELECT blockid, chaincodename, status, createdt FROM transactions")
	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&txBlockID, &txCCName, &txStatus, &createdAt)
		if err != nil {
			fmt.Println(err)
		}
		tx := Txs{BlockID: txBlockID, CCName: txCCName, Status: txStatus, CreatedAt: createdAt}
		result = append(result, tx)
	}

	return result
}

func (pq *pqHandler) QueryChaincode() []Chaincode {

	var ccID int
	var ccName, ccVersion, createdAt string

	var result []Chaincode

	rows, err := pq.db.Query("SELECT id, name , version, createdt FROM chaincodes")
	if err != nil {
		fmt.Println(err)
	}

	defer rows.Close()

	for rows.Next() {
		err = rows.Scan(&ccID, &ccName, &ccVersion, &createdAt)
		if err != nil {
			fmt.Println(err)
		}
		cc := Chaincode{CCID: ccID, Name: ccName, Version: ccVersion, CreatedAt: createdAt}
		result = append(result, cc)
	}

	return result
}
