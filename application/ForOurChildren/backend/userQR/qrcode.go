package userQR

import (
	"fmt"
	"io/ioutil"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/skip2/go-qrcode"
	"github.com/unrolled/render"
)

var rd *render.Render = render.New()

func Qrcode(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	name := vars["name"]

	fmt.Println("name : ", name)
	err := qrcode.WriteFile("http://localhost:4000/getTransaction/"+name, qrcode.Medium, 256, name+".png")
	if err != nil {
		fmt.Println(err)
		return
	}

	fileBytes, err := ioutil.ReadFile(name + ".png")
	if err != nil {
		fmt.Println(err)
		return
	}

	w.Header().Set("Content-Type", "application/octet-stream")
	w.Write(fileBytes)

	rd.JSON(w, http.StatusOK, "SUCCESS")
}
