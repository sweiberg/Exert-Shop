package helper

import (
	"exert-shop/model"
	"os"
	"strconv"
	"time"

	"github.com/golang-jwt/jwt"
)

var PrivateKey = []byte(os.Getenv("JWT_PRIVATE_KEY"))

func CreateJWT(user model.User) (string, error) {
	tokenTTL, _ := strconv.Atoi(os.Getenv("TOKEN_TTL"))

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, jwt.MapClaims{
		"id":  user.ID,
		"iat": time.Now().Unix(),
		"eat": time.Now().Add(time.Second * time.Duration(tokenTTL)).Unix(),
	})

	return token.SignedString(PrivateKey)
}
