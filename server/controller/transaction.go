package controller

import (
	"exert-shop/helper"
	"exert-shop/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func Checkout(context *gin.Context) {

}

func ViewTransaction(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	transaction, err := model.GetTransactionByID(id)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	if transaction.BuyerID != user.ID && transaction.SellerID != user.ID {
		context.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": transaction})
}
