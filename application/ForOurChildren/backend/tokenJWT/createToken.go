package tokenJWT

import (
	"fmt"
	"time"

	"github.com/dgrijalva/jwt-go"
	"github.com/twinj/uuid"
)

type Token struct {
	AcessToken   string
	RefreshToken string
	AccessUUID   string
	RefreshUUID  string
	AtExpires    int64
	RtExpires    int64
}

// Create JWT Token
func CreateToken(name string) (*Token, error) {

	var err error

	tokenDetails := &Token{
		AccessUUID:  uuid.NewV4().String(),
		RefreshUUID: uuid.NewV4().String(),
		AtExpires:   time.Now().Add(time.Hour * 1).Unix(),
		RtExpires:   time.Now().Add(time.Hour * 24).Unix(),
	}

	atClaims := jwt.MapClaims{}
	atClaims["authorized"] = true
	atClaims["access_UUID"] = tokenDetails.AccessUUID
	atClaims["user_id"] = name
	atClaims["expires"] = tokenDetails.AtExpires

	accessToken := jwt.NewWithClaims(jwt.SigningMethodHS256, atClaims)
	tokenDetails.AcessToken, err = accessToken.SignedString([]byte("secret"))
	if err != nil {
		return nil, err
	}

	rtClaims := jwt.MapClaims{}
	rtClaims["refresh_UUID"] = tokenDetails.RefreshUUID
	rtClaims["user_id"] = name
	rtClaims["expires"] = tokenDetails.RtExpires

	refreshToken := jwt.NewWithClaims(jwt.SigningMethodHS256, rtClaims)
	tokenDetails.RefreshToken, err = refreshToken.SignedString([]byte("secret"))
	if err != nil {
		return nil, err
	}

	return tokenDetails, nil
}

// Set Token in Redis
func CreateAuth(name string, t *Token) error {

	client, err := RedisInit()
	if err != nil {
		fmt.Println(err)
		return err
	}

	at := time.Unix(t.AtExpires, 0)
	rt := time.Unix(t.RtExpires, 0)
	now := time.Now()

	errAccess := client.Set(t.AccessUUID, name, at.Sub(now)).Err()
	if errAccess != nil {
		return errAccess
	}

	errRefresh := client.Set(t.RefreshUUID, name, rt.Sub(now)).Err()
	if errRefresh != nil {
		return errRefresh
	}

	return nil
}
