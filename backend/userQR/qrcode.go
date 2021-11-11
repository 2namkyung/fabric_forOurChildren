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
	GenQR(name)

	fileBytes, err := ioutil.ReadFile(name + ".png")
	if err != nil {
		fmt.Println(err)
		return
	}

	// fmt.Println(fileBytes)

	// w.Header().Set("Content-Type", "application/octet-stream")
	// w.Write(fileBytes)
	// return
	rd.JSON(w, http.StatusOK, fileBytes)
}

func GenQR(name string) {
	err := qrcode.WriteFile("http://localhost:3000/info/"+name, qrcode.Medium, 256, name+".png")
	// err := qrcode.WriteFile("http://205c-182-208-92-34.ngrok.io/info/"+name, qrcode.Medium, 256, name+".png")
	// err := qrcode.WriteFile("http://205c-182-208-92-34.ngrok.io/transfer/", qrcode.Medium, 256, name+".png")
	if err != nil {
		panic(err)
	}
}
