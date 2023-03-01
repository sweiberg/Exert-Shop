package middleware

import (
	"exert-shop/helper"
	"net/http"

	"github.com/gin-gonic/gin"
)

func VerifyJWT() gin.HandlerFunc {
	return func(context *gin.Context) {
		err := helper.VerifyHeaderJWT(context)

		if err != nil {
			context.JSON(http.StatusUnauthorized, gin.H{"error": "User authorization failed"})
			context.Abort()

			return
		}

		context.Next()
	}
}
