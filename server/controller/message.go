package controller

import (
	"exert-shop/helper"
	"exert-shop/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func SendMessage(context *gin.Context) {
	var input model.Message

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	input.SenderID = user.ID

	newMessage, err := input.Create()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusCreated, gin.H{"message": newMessage})
}
