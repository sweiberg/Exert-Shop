package test

import (
	"io"
	"log"
	"net/http"
	"strings"
	"testing"
)

func TestJWT(t *testing.T) {
	client := &http.Client{}

	var data = strings.NewReader(`{"username" : "test", "email" : "test@gmail.com", "password" : "gogators"}`)
	request, err := http.NewRequest("POST", "http://localhost:4300/auth/register", data)

	if err != nil {
		log.Fatal(err)
	}

	request.Header.Set("Content-Type", "application/json")
	response, err := client.Do(request)

	if err != nil {
		log.Fatal(err)
		t.Log("User creation failed during the JWT test.")
	}

	t.Log("User creation for JWT test passed.")

	defer response.Body.Close()

	data = strings.NewReader(`{"username" : "test", "email" : "test@gmail.com", "password" : "gogators"}`)
	request, err = http.NewRequest("POST", "http://localhost:4300/auth/login", data)

	request.Header.Set("Content-Type", "application/json")
	response, err = client.Do(request)

	if err != nil {
		log.Fatal(err)
		t.Log("User login failed during the JWT test.")
	}

	defer response.Body.Close()

	bodyText, err := io.ReadAll(response.Body)

	if err != nil {
		log.Fatal(err)
	}

	t.Logf("%s\n", bodyText)

	t.Log("User login for JWT test passed.")
}
