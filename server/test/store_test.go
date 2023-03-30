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
	CreateUser(t, "test", "test@gmail.com", "gogators")
	CreateUser(t, "test2", "test2@gmail.com", "gogators")
}

func TestLoginUser(t *testing.T) {
	jwt := GetUserJWT(t)

	t.Logf("User login test passed with token: %s", jwt)
}

func TestAddCategory(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	var data = strings.NewReader(`{ "name" : "Test Category", "description" : "A test category for checking functionality."}`)

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

func TestAddProduct(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	var data = strings.NewReader(`{
		"name" : "Gator Poster",
		"description" : "A small gator poster for your wall.",
		"imageURL" : "http://test.com",

		"originalPrice" : 3249,
		"finalPrice" : 8862,

		"categoryID" : 1,
		"buyerID" : 1
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

func TestAddMessage(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	var data = strings.NewReader(`{
		"subject" : "Test Message",
		"message" : "Hello gator nation this is an automatically generated test message.",

		"parentID" : 1,
		"receiverID" : 2
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
