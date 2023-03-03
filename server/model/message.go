package model

import (
	"exert-shop/db"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model

	UserID   uint
	SenderID uint   `gorm:"not null" json:"senderid"`
	Message  string `gorm:"type:text" json:"message"`
}

func (message *Message) Create() (*Message, error) {
	err := db.Database.Create(&message).Error

	if err != nil {
		return &Message{}, err
	}

	return message, nil
}
