package main

import (
	"exert-shop/controller"
	"exert-shop/db"
	"exert-shop/model"
	"fmt"
	"log"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
)

func main() {
	loadEnv()
	loadDB()
	loadRoutes()
}

func loadDB() {
	db.Connect()
	db.Database.AutoMigrate(&model.User{})
	db.Database.AutoMigrate(&model.Product{})
}

func loadEnv() {
	err := godotenv.Load(".env.local")

	if err != nil {
		log.Fatal("Error! The .env file could not be loaded.")
	}
}

func CORS() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Writer.Header().Set("Access-Control-Allow-Origin", "*")
		c.Writer.Header().Set("Access-Control-Allow-Credentials", "true")
		c.Writer.Header().Set("Access-Control-Allow-Headers", "Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization, accept, origin, Cache-Control, X-Requested-With")
		c.Writer.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS, GET, PUT, DELETE")

		if c.Request.Method == "OPTIONS" {
			c.AbortWithStatus(204)
			return
		}

		c.Next()
	}
}

func loadRoutes() {
	router := gin.Default()
	router.Use(CORS())

	publicRoutes := router.Group("/auth")
	publicRoutes.POST("/register", controller.Register)
	publicRoutes.POST("/login", controller.Login)
	publicRoutes.POST("/addproduct", controller.AddProduct)

	router.Run(":4300")

	fmt.Println("Listen server successfully started on port 4300.")
}
