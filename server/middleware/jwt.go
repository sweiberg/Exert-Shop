package middleware

import (
	"exert-shop/helper"
	"net/http"

	"github.com/gin-gonic/gin"
)

func MiddlewareJWT() gin.HandlerFunc {
	return func(context *gin.Context) {
		err := helper.VerifyJWT(context)

		if err != nil {
			context.JSON(http.StatusUnauthorized, gin.H{"error": "User authorization failed"})
			context.Abort()

			return
		}

		context.Next()
	}
}
