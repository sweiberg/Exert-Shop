<h1>Work Completed</h1>
<h3>Frontend</h3>
- Added Product Form <br />
- Added Registration Form <br />
- Added Login Form <br />
- Connected Product Form to Backend <br />
- Connected Registration Form to Backend <br />
- Connected Login Form to Backend <br />
- Added Product Form Unit Test <br />
- Added Login Form Unit Test <br />
- Added Registration Form Unit Test <br />
- Added Cypress Registration Submission Test <br />
<h3>Backend</h3>
- Added JWT with a defined private key for user authentication. <br />
- Added user registration that incorporates bycrpt to hash passwords. <br />
- Added user login that validates hashed passwords and assigns a JWT in the header for persistent sessions. <br />
- Added API functionality for user login and user registration. <br />
- Added functions to grab the JWT from the request header with a bearer string. <br />
- Added JWT verification that compares the login token with the header token. <br />
- Added middleware for protected routes to prevent unauthorized actions and access. <br />
- Migrated add product to protected routes and incorporated data from the user session. <br />
- Added various unit tests for login, registration and JWT authentication. <br />
- Added CORS to prevent frontend from experiencing HTTP protocols being blocked because of cross-origin resource sharing.

<br />
<h1>Unit Tests</h1>
<h3>Frontend Unit Tests</h3>
- Tests title and access of homepage <br />
- Tests title and access of login form page<br />
- Tests title and access of registration form page<br />
- Tests access of product form page<br />
- Tests form elements of Login and Registration forms <br />
- Tests valid field in the Add Product form <br />
- Tests setting values in the Add Product form <br />
<h3>Frontend Cypress Test</h3>
- Tests insertion of input values in registration form <br />
- Tests submission of registration form <br />
- Tests routing to login page on successful registration<br />
<h3>Backend Unit Test</h3>
- Create JWT: Test if JWT is accessible and that a signed string utilizing the private key is being returned. <br />
- Create user: Test if a user can successfully be added to the exert shop database. <br />
- User login: Test if the user login route responds with a valid JWT. <br />
- User authorization: Test if the JWT middleware for protected routes is properly blocking unauthorized access. <br />
- Add product: Test if users with a verified JWT can access the protected add product route. <br />

<br />
<h1>Backend Documentation</h1>
<h3>Register</h3>
<code>curl -i -H "Content-Type: application/json" -X POST -d "{ \"username\" : \"exert\", \"email\" : \"exert@exert.shop\", \"password\" : \"exert\"}" http://localhost:4300/auth/register</code> <br />
- Adds a user to the exert-shop database and encrypts the supplied password. <br />
- Returns 400 Bad Request if the insertion query fails.<br />
- Returns 201 Created upon successful entry and returns the following JSON data: <br />
- ID, CreatedAt, UpdateAt, username, email<br />

<h3>Login</h3> 
<code>curl -i -H "Content-Type: application/json" -X POST -d "{ \"username\" : \"exert\", \"email\" : \"exert@exert.shop\", \"password\" : \"exert\"}" http://localhost:4300/auth/login</code><br />
- Verifies the hashed password and initiates a user session with JWT.<br />
- Returns 400 Bad Request if the provided password does not match the hashed password in the database. Includes a JSON bcrypt error message in the body text.<br />
- Returns 200 OK and returns the JSON Web Token for the created session if the hashed password is verified.<br />

<h3>Add Product</h3>
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <<TOKEN HERE>>" -X POST -d  "{ \"name\" : \"Gator Poster\", \"description\" : \"A small gator poster for your wall.\", \"price\" : 42}" http://localhost:4300/api/addproduct</code><br />
  - Adds a product to the exert shop database with the fields name, description and price. The user ID associated with the active session is also added to the database entry.<br />
  - Returns 401 Unauthorized if the user does not have a verified and active session. Includes a JSON authorization failed error in the body text.<br />
  - Returns 201 Created if the user is verified and authorized, and returns the following JSON data in the body text:<br />
  - ID, CreatedAt, UpdatedAt, name, description, price, sellerid

