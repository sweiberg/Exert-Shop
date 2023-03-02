package test

import (
	"io"
	"net/http"
	"strings"
	"testing"
)

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
	client := &http.Client{}

	var data = strings.NewReader(`{"username" : "test", "email" : "test@gmail.com", "password" : "gogators"}`)
	request, err := http.NewRequest("POST", "http://localhost:4300/auth/login", data)

	if err != nil {
		t.Fatal(err)
		t.Log("User login failed to process the request.")
	}

	request.Header.Set("Content-Type", "application/json")
	response, err := client.Do(request)

	if err != nil {
		t.Fatal(err)
		t.Log("User login failed to receive a response.")
	}

	defer response.Body.Close()

	bodyText, err := io.ReadAll(response.Body)

	if err != nil {
		t.Fatal(err)
		t.Log("User login failed because the body text does not exist.")
	}

	jwtString := strings.TrimLeft(strings.TrimRight(string(bodyText), "\"}"), "{\"jwt\":\"")

	t.Logf("User login test passed with token: %s", jwtString)
}

func TestAddProduct(t *testing.T) {
	client := &http.Client{}

	var data = strings.NewReader(`{"username" : "test", "email" : "test@gmail.com", "password" : "gogators"}`)
	request, err := http.NewRequest("POST", "http://localhost:4300/auth/login", data)

	if err != nil {
		t.Fatal(err)
		t.Log("Add product failed to process the login request.")
	}

	request.Header.Set("Content-Type", "application/json")
	response, err := client.Do(request)

	if err != nil {
		t.Fatal(err)
		t.Log("Add product failed to receive a login response.")
	}

	defer response.Body.Close()

	bodyText, err := io.ReadAll(response.Body)

	if err != nil {
		t.Fatal(err)
		t.Log("Add product failed to retreive a user JWT.")
	}

	jwtString := strings.TrimLeft(strings.TrimRight(string(bodyText), "\"}"), "{\"jwt\":\"")

	data = strings.NewReader(`{ "name" : "Gator Poster", "description" : "A small gator poster for your wall.", "price" : 42}`)

	request, err = http.NewRequest("POST", "http://localhost:4300/api/addproduct", data)

	if err != nil {
		t.Fatal(err)
		t.Log("Add product failed to process the request.")
	}

	request.Header.Set("Content-Type", "application/json")
	request.Header.Set("Authorization", "Bearer "+jwtString)
	response, err = client.Do(request)

	if err != nil {
		t.Fatal(err)
		t.Log("Add product failed to process the response.")
	}

	defer response.Body.Close()

	t.Log("Product add test passed.")
}
