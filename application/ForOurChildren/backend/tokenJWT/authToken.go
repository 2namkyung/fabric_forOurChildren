package tokenJWT

import (
	"fmt"
	"net/http"

	"github.com/dgrijalva/jwt-go"
)

type AccessDetails struct {
	AccessUUID string
	Name       string
}

func ExtractToken(r *http.Request) string {
	authToken := r.Header.Get("Authorization")
	// fmt.Println(authToken)

	return authToken
}

func VerifyToken(r *http.Request) (*jwt.Token, error) {
	tokenString := ExtractToken(r)
	// fmt.Println(tokenString)
	token, err := jwt.Parse(tokenString, func(token *jwt.Token) (interface{}, error) {
		if _, ok := token.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("unexpected signing method : %v", token.Header["alg"])
		}
		return []byte("secret"), nil
	})

	if err != nil {
		// fmt.Println("here")
		return nil, err
	}

	return token, nil
}

func TokenValid(r *http.Request) error {
	token, err := VerifyToken(r)
	if err != nil {
		return err
	}

	if _, ok := token.Claims.(jwt.Claims); !ok && !token.Valid {
		return err
	}

	return nil
}

func ExtractTokenMetadata(r *http.Request) (*AccessDetails, error) {
	token, err := VerifyToken(r)
	if err != nil {
		// fmt.Println("verifyToken error")
		return nil, err
	}

	claims, ok := token.Claims.(jwt.MapClaims)
	if ok && token.Valid {
		accessUUID, ok := claims["access_UUID"].(string)
		// fmt.Println(ok)
		if !ok {
			// fmt.Println("ok error")
			return nil, err
		}

		// fmt.Println(claims["user_id"])
		name := claims["user_id"].(string)

		return &AccessDetails{
			AccessUUID: accessUUID,
			Name:       name,
		}, nil
	}

	return nil, err
}

func FetchAuth(auth *AccessDetails) (string, error) {

	client, err := RedisInit()
	if err != nil {
		return "", err
	}

	name, err := client.Get(auth.AccessUUID).Result()
	if err != nil {
		return "", err
	}

	return name, nil
}

func DeleteAuth(givenUUID string) (int64, error) {

	client, err := RedisInit()
	if err != nil {
		return 0, err
	}

	deleted, err := client.Del(givenUUID).Result()
	if err != nil {
		return 0, err
	}

	return deleted, nil
}
