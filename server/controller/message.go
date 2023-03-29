package controller

import (
	"exert-shop/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func SendMessage(context *gin.Context) {

}

func ViewMessage(context *gin.Context) {
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

	context.JSON(http.StatusOK, gin.H{"data": message})
}
