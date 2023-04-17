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

	Seller *User          `json:"seller,omitempty"`
	Tags   pq.StringArray `gorm:"type:text[]" json:"tags"`
	Price  currency.USD   `gorm:"not null" json:"originalPrice"`

	SellerID   uint
	Quantity   uint `gorm:"not null" json:"quantity"`
	CategoryID uint `gorm:"not null" json:"categoryID"`
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

	err := db.Database.Preload("Seller").Where("id=?", id).Find(&product).Error

	if err != nil {
		return Product{}, err
	}

	return product, nil
}

func GetProductsByKeywords(keywords string) ([]Product, error) {
	var products []Product

	err := db.Database.Where("to_tsvector('english', name) @@ to_tsquery(?)", keywords).Find(&products).Error

	if err != nil {
		return []Product{}, err
	}

	return products, nil
}
