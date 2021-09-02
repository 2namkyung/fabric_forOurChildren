package login

import (
	"encoding/json"
	"fmt"
	"net/http"
	"time"
	"webservice/explorer"
	"webservice/tokenJWT"

	_ "github.com/lib/pq"
	"github.com/unrolled/render"
)

var rd *render.Render = render.New()

type Login struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type LoginStatus struct {
	AccessToken  string `json:"access_token"`
	RefreshToken string `json:"refresh_token"`
	LoginStatus  bool   `json:"login_status"`
}

func LoginCheck(w http.ResponseWriter, r *http.Request) {
	var login Login

	err := json.NewDecoder(r.Body).Decode(&login)
	if err != nil {
		fmt.Println(err)
		fmt.Println(login)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	email := login.Email
	password := login.Password
	check := LoginStatus{}

	// cookie
	token, err := tokenJWT.CreateToken(email)

	if err != nil {
		fmt.Println(err)
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}

	cookie := http.Cookie{
		Name:     "jwt",
		Value:    token.RefreshToken,
		Expires:  time.Now().Add(time.Hour * 1),
		HttpOnly: true,
	}

	auth := explorer.PQConn().LoginChildren(email, password)
	err = tokenJWT.CreateAuth(email, token)

	if auth && err == nil {
		check.LoginStatus = true
		check.AccessToken = token.AcessToken
		check.RefreshToken = token.RefreshToken
		w.Header().Set("Set-Cookie", cookie.String())
		rd.JSON(w, http.StatusOK, check)
		return
	}

	check.LoginStatus = false
	rd.JSON(w, http.StatusOK, check)
}

func Logout(w http.ResponseWriter, r *http.Request) {

	auth, err := tokenJWT.ExtractTokenMetadata(r)
	if err != nil {
		rd.JSON(w, http.StatusUnauthorized, "unauthorized1")
		return
	}

	deleted, delErr := tokenJWT.DeleteAuth(auth.AccessUUID)
	if delErr != nil || deleted == 0 {
		rd.JSON(w, http.StatusUnauthorized, "unauthorized2")
		return
	}

	cookie := http.Cookie{
		Name:     "jwt",
		Value:    "",
		Expires:  time.Now().Add(-time.Hour),
		HttpOnly: true,
	}

	w.Header().Set("Set-Cookie", cookie.String())

	rd.JSON(w, http.StatusOK, "LOGOUT SUCCESS")
}
