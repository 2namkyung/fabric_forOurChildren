package auth

import (
	"net/http"
	"webservice/tokenJWT"
)

func AuthActing(r *http.Request) (string, error) {
	tokenAuth, err := tokenJWT.ExtractTokenMetadata(r)
	if err != nil {
		return "", err
	}

	userID, err := tokenJWT.FetchAuth(tokenAuth)
	if err != nil {
		return "", err
	}

	return userID, nil
}
