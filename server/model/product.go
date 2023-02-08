package model

import (
	"exert-shop/db"

	"gorm.io/gorm"
)

type Product struct {
	gorm.Model

	Name        string `gorm:"size:255;not null" json:"name"`
	Description string `gorm:"size:255;not null" json:"description"`
	Price       uint   `gorm:"not null" json:"price"`
	SellerID    uint   `gorm:"not null" json:"sellerid"`
}

func (product *Product) Create() (*Product, error) {
	err := db.Database.Create(&product).Error

	if err != nil {
		return &Product{}, err
	}

	return product, nil
}
