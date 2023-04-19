package model

import (
	"exert-shop/currency"
	"exert-shop/db"

	"gorm.io/gorm"
)

type Transaction struct {
	gorm.Model

	ProductID uint `gorm:"not null" json:"productID"`
	BuyerID   uint `gorm:"not null" json:"buyerID"`
	SellerID  uint `gorm:"not null" json:"sellerID"`
	Quantity  uint `gorm:"not null" json:"quantity"`

	Price currency.USD `gorm:"not null" json:"soldPrice"`

	Product *Product `json:",omitempty"`
	Buyer   *User    `json:",omitempty"`
	Seller  *User    `json:",omitempty"`
}

func (transaction *Transaction) Create() (*Transaction, error) {
	err := db.Database.Create(&transaction).Error

	if err != nil {
		return &Transaction{}, err
	}

	return transaction, nil
}

func GetTransactionByID(id uint) (Transaction, error) {
	var transaction Transaction

	err := db.Database.Preload("Buyer").Preload("Seller").Where("id=?", id).Find(&transaction).Error

	if err != nil {
		return Transaction{}, err
	}

	return transaction, nil
}
