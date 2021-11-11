package explorer

import (
	"net/http"

	"github.com/unrolled/render"
)

type AppHandler struct {
	http.Handler
	DB DBHandler
}

var rd *render.Render = render.New()

func (a *AppHandler) GetBlocks(w http.ResponseWriter, r *http.Request) {
	result := a.DB.QueryBlock()

	rd.JSON(w, http.StatusOK, result)
}

func (a *AppHandler) GetChannel(w http.ResponseWriter, r *http.Request) {
	result := a.DB.QueryChannel()

	rd.JSON(w, http.StatusOK, result)
}

func (a *AppHandler) GetChaincode(w http.ResponseWriter, r *http.Request) {
	result := a.DB.QueryChaincode()

	rd.JSON(w, http.StatusOK, result)
}

func (a *AppHandler) GetTxs(w http.ResponseWriter, r *http.Request) {
	result := a.DB.QueryTxs()

	rd.JSON(w, http.StatusOK, result)
}
