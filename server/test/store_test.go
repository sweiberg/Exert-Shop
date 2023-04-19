package test

import (
	"encoding/json"
	"exert-shop/currency"
	"fmt"
	"net/http"
	"strings"
	"testing"
)

func GetUserJWT(t *testing.T) string {
	client := &http.Client{}

	var data = strings.NewReader(`{"username" : "test", "email" : "test@gmail.com", "password" : "gogators"}`)
	request, err := http.NewRequest("POST", "http://localhost:4300/auth/login", data)

	if err != nil {
		t.Log("Failed to process the login request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	response, err := client.Do(request)

	if err != nil {
		t.Log("Failed to receive a login response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	var bodyJSON map[string]interface{}
	err = json.NewDecoder(response.Body).Decode(&bodyJSON)

	if err != nil {
		t.Log("Failed to parse the JSON response from the http request.")
		t.Fatal(err)
	}

	jwt := bodyJSON["jwt"]

	if jwt == nil {
		t.Fatal("Failed to retrieve a user JWT.")
	}

	return fmt.Sprint(jwt)
}

func CreateUser(t *testing.T, name string, email string, password string) {
	client := &http.Client{}

	var data = strings.NewReader(`{"username" : "` + name + `", "email" : "` + email + `", "password" : "` + password + `"}`)
	request, err := http.NewRequest("POST", "http://localhost:4300/auth/register", data)

	if err != nil {
		t.Log("User creation failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	response, err := client.Do(request)

	if err != nil {
		t.Log("User creation failed to receive a response.")
		t.Fatal(err)
	}

	t.Logf("User creation for user %v passed.", name)

	defer response.Body.Close()
}

func TestCreateUser(t *testing.T) {
	CreateUser(t, "test", "jonweiberg@gmail.com", "gogators")
	CreateUser(t, "test2", "test2@gmail.com", "gogators")
	CreateUser(t, "test3", "test3@gmail.com", "gogators")
}

func TestLoginUser(t *testing.T) {
	jwt := GetUserJWT(t)

	t.Logf("User login test passed with token: %s", jwt)
}

func TestViewProfile(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	request, err := http.NewRequest("GET", "http://localhost:4300/api/profile/1", nil)

	if err != nil {
		t.Log("View user profile failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("View user profile failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("View user profile test passed.")
}

func AddCategory(t *testing.T, name string, description string) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	var data = strings.NewReader(`{ "name" : "` + name + `", "description" : "` + description + `"}`)

	request, err := http.NewRequest("POST", "http://localhost:4300/api/addcategory", data)

	if err != nil {
		t.Log("Add category failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("Add category failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("Category add test passed.")
}

func TestAddCategory(t *testing.T) {
	AddCategory(t, "Category 1", "Test category 1 for exert shop.")
	AddCategory(t, "Category 2", "Test category 2 for exert shop.")
	AddCategory(t, "Category 3", "Test category 3 for exert shop.")
}

func TestViewCategory(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	request, err := http.NewRequest("GET", "http://localhost:4300/api/category/1", nil)

	if err != nil {
		t.Log("View category failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("View category failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("View category test passed.")
}

func TestViewCategoryAll(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	request, err := http.NewRequest("GET", "http://localhost:4300/api/category/all", nil)

	if err != nil {
		t.Log("View all categories failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("View all categories failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("View all categories test passed.")
}

func AddProduct(t *testing.T, name string, description string, imageURL string, originalPrice string, finalPrice string, quantity string, category string) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	var data = strings.NewReader(`{
		"name" : "` + name + `",
		"description" : "` + description + `",
		"imageURL" : "` + imageURL + `",

		"originalPrice" : ` + originalPrice + `,
		"finalPrice" : ` + finalPrice + `,
		"quantity" : ` + quantity + `,

		"categoryID" : ` + category + `
	}`)

	request, err := http.NewRequest("POST", "http://localhost:4300/api/addproduct", data)

	if err != nil {
		t.Log("Add product failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("Add product failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("Product add test passed.")
}

func TestAddProduct(t *testing.T) {
	AddProduct(t, "Product 1", "Test product 1 for exert shop.", "http://product1.jpg", "1000", "1000", "20", "1")
	AddProduct(t, "Product 2", "Test product 2 for exert shop.", "http://product2.jpg", "3500", "3500", "8", "1")
	AddProduct(t, "Product 3", "Test product 3 for exert shop.", "http://product3.jpg", "6700", "6700", "55", "1")
}

func TestViewProduct(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	request, err := http.NewRequest("GET", "http://localhost:4300/api/product/1", nil)

	if err != nil {
		t.Log("View product failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("View product failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("View product test passed.")
}

func AddMessage(t *testing.T, subject string, message string, receiverID string) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	var data = strings.NewReader(`{
		"subject" : "` + subject + `",
		"message" : "` + message + `",

		"parentID" : null,
		"receiverID" : ` + receiverID + `
	}`)

	request, err := http.NewRequest("POST", "http://localhost:4300/api/sendmessage", data)

	if err != nil {
		t.Log("Send message failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("Send message failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("Send message test passed.")
}

func TestAddMessage(t *testing.T) {
	AddMessage(t, "Test Message 1", "This is test message 1 for exert shop.", "2")
	AddMessage(t, "Test Message 2", "This is test message 2 for exert shop.", "3")
	AddMessage(t, "Test Message 3", "This is test message 3 for exert shop.", "2")
}

func TestViewMessage(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	request, err := http.NewRequest("GET", "http://localhost:4300/api/message/1", nil)

	if err != nil {
		t.Log("View message failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("View message failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("View message test passed.")
}

func TestViewInbox(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	request, err := http.NewRequest("GET", "http://localhost:4300/api/message/inbox", nil)

	if err != nil {
		t.Log("View inbox failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("View inbox failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("View inbox test passed.")
}

func TestViewSentMessages(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	request, err := http.NewRequest("GET", "http://localhost:4300/api/message/sent", nil)

	if err != nil {
		t.Log("View sent messages failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("View sent messages failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("View sent messages test passed.")
}

func TestCurrencyMultiply(t *testing.T) {
	cost := currency.FloatToUSD(float64(18.32))
	var tax float64 = 0.065

	got := cost.Multiply(tax)
	want := currency.FloatToUSD(float64(1.19))

	if want != got {
		t.Errorf("Expected %q but got %q", want, got)
		t.Fatal("Currency multiplication test failed.")
	}

	t.Log("Currency multiplication test passed.")
}

func TestCurrencyDivide(t *testing.T) {
	cost := currency.FloatToUSD(float64(18.32))
	var tax float64 = 0.065

	got := cost.Divide(tax)
	want := currency.FloatToUSD(float64(281.85))

	if want != got {
		t.Errorf("Expected %q but got %q", want, got)
		t.Fatal("Currency division test failed.")
	}

	t.Log("Currency division test passed.")
}

func TestAddTransaction(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	var data = strings.NewReader(`{
		"productID" : 1,
		"buyerID" : 1,
		"sellerID" : 2,
		"quantity" : 15,
		"soldPrice" : 1000
	}`)

	request, err := http.NewRequest("POST", "http://localhost:4300/api/transaction/add", data)

	if err != nil {
		t.Log("Add transaction failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("Add transaction failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("Add transaction test passed.")
}

func TestViewTransaction(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	request, err := http.NewRequest("GET", "http://localhost:4300/api/transaction/1", nil)

	if err != nil {
		t.Log("View transaction failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("View transaction failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("View transaction test passed.")
}

func TestCheckout(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	var data = strings.NewReader(`[
		{"id" : 1, "quantity" : 1}, 
		{"id" : 2, "quantity" : 1},
		{"id" : 3, "quantity" : 1}
	]`)

	request, err := http.NewRequest("POST", "http://localhost:4300/api/checkout", data)

	if err != nil {
		t.Log("Checkout failed to process the request.")
		t.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Log("Checkout failed to process the response.")
		t.Fatal(err)
	}

	defer response.Body.Close()

	t.Log("Checkout test passed.")
}
