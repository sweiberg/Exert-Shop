package model

import (
	"exert-shop/db"

	"gorm.io/gorm"
)

type Message struct {
	gorm.Model

	ParentID   *uint `gorm:"default:null"`
	ReceiverID uint  `gorm:"not null" json:"receiverID"`
	SenderID   uint  `gorm:"not null" json:"senderID"`

	Message string `gorm:"type:text;not null" json:"message"`
	Subject string `gorm:"not null" json:"subject"`

	Replies  []*Message `gorm:"foreignKey:ParentID" json:",omitempty"`
	Sender   *User      `gorm:"foreignKey:SenderID" json:",omitempty"`
	Receiver *User      `gorm:"foreignKey:ReceiverID" json:",omitempty"`
}

func (message *Message) Create() (*Message, error) {
	err := db.Database.Create(&message).Error

	if err != nil {
		return &Message{}, err
	}

	return message, nil
}

func GetMessageByID(id uint) (Message, error) {
	var message Message

	err := db.Database.Preload("Sender").Preload("Receiver").Preload("Replies").Where("id=?", id).Find(&message).Error

	if err != nil {
		return Message{}, err
	}

	return message, nil
}
