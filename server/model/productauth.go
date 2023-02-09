package model

type ProductAuth struct {
	Name        string `json:"name" binding:"required"`
	Description string `json:"description" binding:"required"`
	Price       uint   `json:"price" binding:"required"`
	SellerID    uint   `json:"sellerid" binding:"required"`
}
