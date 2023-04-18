package helper

import (
	"exert-shop/model"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)

func GetThisUserID(context *gin.Context) (uint, error) {
	err := VerifyHeaderJWT(context)

	if err != nil {
		return 0, err
	}

	token, _ := GetHeaderJWT(context)
	claims, _ := token.Claims.(jwt.MapClaims)
	id := uint(claims["id"].(float64))

	return id, nil
}

func GetThisUser(context *gin.Context) (model.User, error) {
	id, err := GetThisUserID(context)

	if err != nil {
		return model.User{}, err
	}

	user, err := model.GetUserByID(id)

	if err != nil {
		return model.User{}, err
	}

	return user, nil
}
