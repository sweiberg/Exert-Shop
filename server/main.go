package main

import (
	"exert-shop/db"
	"exert-shop/model"
	"log"

	"github.com/joho/godotenv"
)

func main() {
	loadEnv()
	loadDB()
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
