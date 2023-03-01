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

	context.JSON(http.StatusOK, gin.H{"jwt": jwt})
}

func AddProduct(context *gin.Context) {
	var input model.ProductAuth

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	product := model.Product{
		Name:        input.Name,
		Description: input.Description,
		Price:       input.Price,
		SellerID:    input.SellerID,
	}

	newProduct, err := product.Create()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusCreated, gin.H{"product": newProduct})
}
