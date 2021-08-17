package api

import "net/http"

func (a *AppHandler) getBlocks(w http.ResponseWriter, r *http.Request) {
	result := a.db.QueryBlock()

	rd.JSON(w, http.StatusOK, result)
}

func (a *AppHandler) getChannel(w http.ResponseWriter, r *http.Request) {
	result := a.db.QueryChannel()

	rd.JSON(w, http.StatusOK, result)
}

func (a *AppHandler) getChaincode(w http.ResponseWriter, r *http.Request) {
	result := a.db.QueryChaincode()

	rd.JSON(w, http.StatusOK, result)
}

func (a *AppHandler) getTxs(w http.ResponseWriter, r *http.Request) {
	result := a.db.QueryTxs()

	rd.JSON(w, http.StatusOK, result)
}
