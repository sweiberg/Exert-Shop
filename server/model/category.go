package model

import (
	"exert-shop/db"

	"gorm.io/gorm"
)

type Category struct {
	gorm.Model

	Name        string `gorm:"size:255;not null;unique" json:"name"`
	Description string `gorm:"type:text;not null" json:"description"`

	Products []*Product `json:",omitempty"`
}

func (category *Category) Create() (*Category, error) {
	err := db.Database.Create(&category).Error

	if err != nil {
		return &Category{}, err
	}

	return category, nil
}

func GetCategoryByID(id uint) (Category, error) {
	var category Category

	err := db.Database.Preload("Products").Where("id=?", id).Find(&category).Error

	if err != nil {
		return Category{}, err
	}

	return category, nil
}

func GetCategoriesWithLimit(limit int) ([]Category, error) {
	var categories []Category

	err := db.Database.Preload("Products", func(tx *gorm.DB) *gorm.DB {
		return tx.Limit(limit)
	}).Find(&categories).Error

	if err != nil {
		return []Category{}, err
	}

	return categories, nil
}
