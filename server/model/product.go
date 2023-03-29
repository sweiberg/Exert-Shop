package model

import (
	"exert-shop/currency"
	"exert-shop/db"

	"github.com/lib/pq"
	"gorm.io/gorm"
)

type Product struct {
	gorm.Model

	Name        string `gorm:"size:255;not null" json:"name"`
	Description string `gorm:"type:text;not null" json:"description"`
	ImageURL    string `gorm:"size:255" json:"imageURL"`

	Tags pq.StringArray `gorm:"type:text[]" json:"tags"`

	OriginalPrice currency.USD `gorm:"not null" json:"originalPrice"`
	FinalPrice    currency.USD `gorm:"default:0" json:"finalPrice"`

	CategoryID uint `gorm:"not null" json:"categoryID"`
	SellerID   uint
	BuyerID    uint
}

func (product *Product) Create() (*Product, error) {
	err := db.Database.Create(&product).Error

	if err != nil {
		return &Product{}, err
	}

	return product, nil
}

func GetProductByID(id uint64) (Product, error) {
	var product Product

	err := db.Database.Where("id=?", id).Find(&product).Error

	if err != nil {
		return Product{}, err
	}

	return product, nil
}
