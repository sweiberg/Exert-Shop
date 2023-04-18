package model

import (
	"exert-shop/db"
	"html"
	"strings"

	"golang.org/x/crypto/bcrypt"
	"gorm.io/gorm"
)

type User struct {
	gorm.Model

	Username string `gorm:"size:255;not null;unique" json:"username"`
	Email    string `gorm:"size:255;not null;unique" json:"email"`
	Password string `gorm:"size:255;not null;" json:"-"`

	Purchases []*Transaction `gorm:"foreignKey:BuyerID" json:",omitempty"`
	Sales     []*Transaction `gorm:"foreignKey:SellerID" json:",omitempty"`
	Inbox     []*Message     `gorm:"foreignKey:ReceiverID" json:",omitempty"`
	Sent      []*Message     `gorm:"foreignKey:SenderID" json:",omitempty"`
}

func (user *User) Create() (*User, error) {
	err := db.Database.Create(&user).Error

	if err != nil {
		return &User{}, err
	}

	return user, nil
}

func (user *User) BeforeCreate(*gorm.DB) error {
	pwHash, err := bcrypt.GenerateFromPassword([]byte(user.Password), bcrypt.DefaultCost)

	if err != nil {
		return err
	}

	user.Password = string(pwHash)
	user.Username = html.EscapeString(strings.TrimSpace(user.Username))

	return nil
}

func (user *User) AuthPassword(password string) error {
	return bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password))
}

func GetUserByName(username string) (User, error) {
	var user User

	err := db.Database.Where("username=?", username).Find(&user).Error

	if err != nil {
		return User{}, err
	}

	return user, nil
}

func GetUserByID(id uint) (User, error) {
	var user User

	err := db.Database.Where("id=?", id).Find(&user).Error

	if err != nil {
		return User{}, err
	}

	return user, nil
}

func GetUserPurchases(id uint) (User, error) {
	var purchases User

	err := db.Database.Preload("Purchases.Seller").Where("id=?", id).Find(&purchases).Error

	if err != nil {
		return User{}, err
	}

	return purchases, nil
}

func GetUserSales(id uint) (User, error) {
	var sales User

	err := db.Database.Preload("Sales.Buyer").Where("id=?", id).Find(&sales).Error

	if err != nil {
		return User{}, err
	}

	return sales, nil
}

func GetUserSentMessages(id uint) (User, error) {
	var sent User

	err := db.Database.Preload("Sent.Receiver").Where("id=?", id).Find(&sent).Error

	if err != nil {
		return User{}, err
	}

	return sent, nil
}

func GetUserInbox(id uint) (User, error) {
	var inbox User

	err := db.Database.Preload("Inbox.Sender").Where("id=?", id).Find(&inbox).Error

	if err != nil {
		return User{}, err
	}

	return inbox, nil
}

func GetUserDashboard(id uint) (User, error) {
	var dashboard User

	err := db.Database.Preload("Purchases", func(tx *gorm.DB) *gorm.DB {
		return tx.Limit(10)
	}).Preload("Sales", func(tx *gorm.DB) *gorm.DB {
		return tx.Limit(10)
	}).Preload("Inbox", func(tx *gorm.DB) *gorm.DB {
		return tx.Limit(10)
	}).Where("id=?", id).Find(&dashboard).Error

	if err != nil {
		return User{}, err
	}

	return dashboard, nil
}
