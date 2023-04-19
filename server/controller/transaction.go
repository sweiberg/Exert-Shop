package controller

import (
	"exert-shop/external"
	"exert-shop/helper"
	"exert-shop/model"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

type CheckoutData struct {
	ProductID uint `json:"id"`
	Quantity  uint `json:"quantity"`
}

func Checkout(context *gin.Context) {
	user, err := helper.GetThisUser(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	var data []CheckoutData

	err = context.BindJSON(&data)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	var transactions []model.Transaction
	var product model.Product
	var price int64 = 0

	for i := 0; i < len(data); i++ {
		product, err = model.GetProductByID(data[i].ProductID)

		if err != nil {
			context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

			return
		}

		if product.Quantity < data[i].Quantity {
			context.JSON(http.StatusBadRequest, gin.H{"error": "The requested item does not have enough inventory available."})

			return
		}

		var transaction model.Transaction
		transaction.BuyerID = user.ID
		transaction.SellerID = product.SellerID
		transaction.Price = product.FinalPrice
		transaction.Quantity = data[i].Quantity
		transaction.ProductID = product.ID

		transactions = append(transactions, transaction)

		price += int64(product.FinalPrice)
	}

	charge, err := external.StripeProcessCharge(price, user.Email)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	for i := 0; i < len(transactions); i++ {
		transactions[i].Create()
	}

	context.JSON(http.StatusCreated, gin.H{"data": charge})
}

func AddTransaction(context *gin.Context) {
	var input model.Transaction

	if err := context.ShouldBindJSON(&input); err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	id, err := helper.GetThisUserID(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	input.BuyerID = id

	newTransaction, err := input.Create()

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusCreated, gin.H{"data": newTransaction})
}

func ViewTransaction(context *gin.Context) {
	id, err := strconv.ParseUint(context.Param("id"), 10, 64)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	transaction, err := model.GetTransactionByID(uint(id))

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	userID, err := helper.GetThisUserID(context)

	if err != nil {
		context.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})

		return
	}

	if transaction.BuyerID != userID && transaction.SellerID != userID {
		context.JSON(http.StatusUnauthorized, gin.H{"error": err.Error()})

		return
	}

	context.JSON(http.StatusOK, gin.H{"data": transaction})
}
