package controller

import (
	"exert-shop/helper"
	"exert-shop/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func ViewProfile(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	user, err := model.GetUserByID(id)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": user})
}

func ViewPurchases(context *gin.Context) {
	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	purchases, err := model.GetUserPurchases(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": purchases})
}

func ViewSales(context *gin.Context) {
	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	sales, err := model.GetUserSales(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": sales})
}

func ViewInbox(context *gin.Context) {
	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	messages, err := model.GetUserInbox(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": messages})
}

func ViewSentMessages(context *gin.Context) {
	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	messages, err := model.GetUserSentMessages(&user)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": messages})
}
