package model

type UserAuth struct {
	Username string `json:"username" binding:"required"`
	Email    string `json:"email"`
	Password string `json:"password" binding:"required"`
}
