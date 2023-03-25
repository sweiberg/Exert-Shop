package main

import (
	"exert-shop/controller"
	"exert-shop/db"
	"exert-shop/middleware"
	"exert-shop/model"
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
	db.Database.AutoMigrate(&model.Message{})
}

func loadEnv() {
	err := godotenv.Load(".env.local")

	if err != nil {
		log.Fatal("Error! The .env file could not be loaded.")
	}
}

func loadRoutes() {
	router := gin.Default()

	router.Use(middleware.CORS())
	router.Use(middleware.ErrorHandler)

	auth := router.Group("/auth")
	auth.POST("/register", controller.Register)
	auth.POST("/login", controller.Login)
	auth.POST("/test", controller.Test)

	api := router.Group("/api")
	api.Use(middleware.VerifyJWT())
	api.POST("/addproduct", controller.AddProduct)
	api.POST("/sendmessage", controller.SendMessage)
	api.GET("/viewmessage/:id", controller.ViewMessage)

	router.Run(":4300")
}
