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
	db.Database.AutoMigrate(&model.Category{})
	db.Database.AutoMigrate(&model.Transaction{})
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

	authAPI := router.Group("/auth")
	authAPI.POST("/register", controller.Register)
	authAPI.POST("/login", controller.Login)
	authAPI.GET("/authorize", controller.Authorize)

	publicAPI := router.Group("/api")
	publicAPI.GET("/product/:id", controller.ViewProduct)
	publicAPI.GET("/category/:id", controller.ViewCategory)
	publicAPI.GET("/profile/:id", controller.ViewProfile)
	publicAPI.GET("/product/search/:keywords", controller.SearchProducts)
	publicAPI.GET("/category/all/:limit", controller.ViewCategoriesItems)
	publicAPI.GET("/category/all", controller.ViewCategories)

	protectedAPI := router.Group("/api")
	protectedAPI.Use(middleware.VerifyJWT())
	protectedAPI.POST("/addproduct", controller.AddProduct)
	protectedAPI.POST("/addcategory", controller.AddCategory)
	protectedAPI.POST("/sendmessage", controller.SendMessage)
	protectedAPI.POST("/checkout", controller.Checkout)
	protectedAPI.POST("/transaction/add", controller.AddTransaction)
	protectedAPI.GET("/message/:id", controller.ViewMessage)
	protectedAPI.GET("/transaction/:id", controller.ViewTransaction)
	protectedAPI.GET("/sales", controller.ViewSales)
	protectedAPI.GET("/purchases", controller.ViewPurchases)
	protectedAPI.GET("/message/inbox", controller.ViewInbox)
	protectedAPI.GET("/message/sent", controller.ViewSentMessages)
	protectedAPI.GET("/dashboard", controller.ViewDashboard)

	router.Run(":4300")
}
