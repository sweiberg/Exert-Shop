package test

import (
	"io"
	"net/http"
	"strings"
	"testing"
)

func GetUserJWT(t *testing.T) string {
	client := &http.Client{}

	var data = strings.NewReader(`{"username" : "test", "email" : "test@gmail.com", "password" : "gogators"}`)
	request, err := http.NewRequest("POST", "http://localhost:4300/auth/login", data)

	if err != nil {
		t.Fatal(err)
		t.Log("Failed to process the login request.")
	}

	request.Header.Set("Content-Type", "application/json")
	response, err := client.Do(request)

	if err != nil {
		t.Fatal(err)
		t.Log("Failed to receive a login response.")
	}

	defer response.Body.Close()

	bodyText, err := io.ReadAll(response.Body)

	if err != nil {
		t.Fatal(err)
		t.Log("Failed to retrieve a user JWT.")
	}

	jwtString := strings.TrimLeft(strings.TrimRight(string(bodyText), "\"}"), "{\"jwt\":\"")

	if jwtString == "" {
		t.Fatal(err)
		t.Log("The JWT retrieved was unable to be trimmed. The resulting string is empty.")
	}

	return jwtString
}

func TestCreateUser(t *testing.T) {
	client := &http.Client{}

	var data = strings.NewReader(`{"username" : "test", "email" : "test@gmail.com", "password" : "gogators"}`)
	request, err := http.NewRequest("POST", "http://localhost:4300/auth/register", data)

	if err != nil {
		t.Fatal(err)
		t.Log("User creation failed to process the request.")
	}

	request.Header.Set("Content-Type", "application/json")
	response, err := client.Do(request)

	if err != nil {
		t.Fatal(err)
		t.Log("User creation failed to receive a response.")
	}

	t.Log("User creation test passed.")

	defer response.Body.Close()
}

func TestLoginUser(t *testing.T) {
	jwtString := GetUserJWT(t)

	t.Logf("User login test passed with token: %s", jwtString)
}

func TestAddCategory(t *testing.T) {
	client := &http.Client{}

	jwt := GetUserJWT(t)

	var data = strings.NewReader(`{ "name" : "Test Category", "description" : "A test category for checking functionality."}`)

	request, err := http.NewRequest("POST", "http://localhost:4300/api/addcategory", data)

	if err != nil {
		t.Fatal(err)
		t.Log("Add category failed to process the request.")
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Fatal(err)
		t.Log("Add category failed to process the response.")
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

		"CategoryID" : 1,
		"SellerID" : 1,
		"BuyerID" : 1
	}`)

	request, err := http.NewRequest("POST", "http://localhost:4300/api/addproduct", data)

	if err != nil {
		t.Fatal(err)
		t.Log("Add product failed to process the request.")
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwt)
	response, err := client.Do(request)

	if err != nil {
		t.Fatal(err)
		t.Log("Add product failed to process the response.")
	}

	defer response.Body.Close()

	t.Log("Product add test passed.")
}
