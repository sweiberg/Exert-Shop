package controller

import (
	"exert-shop/helper"
	"exert-shop/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func Register(context *gin.Context) {
	var input model.UserAuth

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	user := model.User{
		Username: input.Username,
		Email:    input.Email,
		Password: input.Password,
	}

	newUser, err := user.Create()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusCreated, gin.H{"user": newUser})
}

func Login(context *gin.Context) {
	var input model.UserAuth

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	user, err := model.GetUserByName(input.Username)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	err = user.AuthPassword(input.Password)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	jwt, err := helper.CreateJWT(user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"jwt": jwt, "data": user.ID, "username": user.Username})
}

func Authorize(context *gin.Context) {
	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": user.ID, "username": user.Username})
}
