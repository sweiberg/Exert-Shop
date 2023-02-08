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
}

func loadEnv() {
	err := godotenv.Load(".env.local")

	if err != nil {
		log.Fatal("Error! The .env file could not be loaded.")
	}
}

func loadRoutes() {
	router := gin.Default()

	publicRoutes := router.Group("/auth")
	publicRoutes.POST("/register", controller.Register)

	router.Run(":4300")

	fmt.Println("Listen server successfully started on port 4300.")
}
