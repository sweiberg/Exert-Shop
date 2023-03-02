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
		t.Log("User login failed because the body text does not exist")
	}

	jwtString := string(bodyText[1])

	t.Logf("User login test passed. %s", jwtString)
}
