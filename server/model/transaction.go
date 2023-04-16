package model

import (
	"exert-shop/currency"
	"exert-shop/db"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model

	ProductID uint
	BuyerID   uint
	SellerID  uint
	Quantity  uint

	Product Product
	Buyer   User
	Seller  User

	Price currency.USD
}

func (transaction *Transaction) Create() (*Transaction, error) {
	err := db.Database.Create(&transaction).Error

	if err != nil {
		return &Transaction{}, err
	}

	return transaction, nil
}
