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

func GetUserByID(id uint64) (User, error) {
	var user User

	err := db.Database.Where("id=?", id).Find(&user).Error

	if err != nil {
		return User{}, err
	}

	return user, nil
}
