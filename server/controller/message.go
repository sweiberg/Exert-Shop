package controller

import (
	"exert-shop/helper"
	"exert-shop/model"
	"net/http"
	"strconv"

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

func ViewMessage(context *gin.Context) {
	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	message, err := model.GetMessageByID(id)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	if message.SenderID != user.ID || message.UserID != user.ID {
		context.JSON(http.StatusForbidden, gin.H{"error": "The user attempting to view this message is not authorized."})

		return
	}

	context.JSON(http.StatusOK, gin.H{"message": message, "username": user.Username})
}

func Test(context *gin.Context) {
	context.AbortWithStatusJSON(http.StatusBadRequest, "err")
	context.JSON(http.StatusOK, gin.H{"ok": "its good"})
}
