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

	category, err := model.GetCategoryByID(uint(id))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": category})
}

func ViewCategoriesItems(context *gin.Context) {
	limit, err := strconv.ParseInt(context.Param("limit"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	categories, err := model.GetCategoriesItems(int(limit))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": categories})
}

func ViewCategories(context *gin.Context) {
	categories, err := model.GetCategories()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": categories})
}
