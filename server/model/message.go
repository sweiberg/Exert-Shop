package model

import (
	"exert-shop/db"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model

	UserID   uint
	SenderID uint   `gorm:"not null" json:"senderid"`
	Message  string `gorm:"type:text;not null" json:"message"`
	Subject  string `gorm:"not null" json:"subject"`
}

func (message *Message) Create() (*Message, error) {
	err := db.Database.Create(&message).Error

	if err != nil {
		return &Message{}, err
	}

	return message, nil
}

func GetMessageByID(id uint64) (Message, error) {
	var message Message

	err := db.Database.Where("id=?", id).Find(&message).Error

	if err != nil {
		return Message{}, err
	}

	return message, nil
}
