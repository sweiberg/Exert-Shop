package helper

import (
	"exert-shop/model"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func GetThisUser(context *gin.Context) (model.User, error) {
	err := VerifyHeaderJWT(context)

	if err != nil {
		return model.User{}, err
	}

	token, _ := GetHeaderJWT(context)
	claims, _ := token.Claims.(jwt.MapClaims)
	uid := uint(claims["id"].(float64))

	user, err := model.GetUserByID(uid)

	if err != nil {
		return model.User{}, err
	}

	return user, nil
}
