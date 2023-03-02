package controller

import (
	"exert-shop/helper"
	"exert-shop/model"
	"net/http"

	"github.com/gin-gonic/gin"
)

func AddProduct(context *gin.Context) {
	var input model.Product

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	input.SellerID = user.ID

	newProduct, err := input.Create()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": newProduct})
}
