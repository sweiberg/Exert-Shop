package controller

import (
	"exert-shop/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func AddCategory(context *gin.Context) {
	var input model.Category

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	newCategory, err := input.Create()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": newCategory})
}

func ViewCategory(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	category, err := model.GetCategoryByID(id)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": category.Products})
}
