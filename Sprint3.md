<h1>Work Completed</h1>
<h3>Frontend</h3>
- Added Product Home/View Page<br />
- Added Session Based Cart System<br />
- Updated Product Frontend Model<br />
- Updated Product Form<br />
- Updated Login Form<br />
- Updated Registration Form<br />
- Updated User Dropdown in header<br />
- Added user authorization service<br />
- Added cookie storage service<br />
- Added interceptor for automatic bearer in header requests<br />
- Added user profile pages<br />
- Added conditional and routing checks for user status<br />
<h3>Backend</h3>
- Added a custom currency type for USD<br />
- Added currency multiplication that eliminates floating point errors<br />
- Added currency division that eliminates floating point errors<br />
- Added create category with a one-to-many association for products<br />
- Added view category API<br />
- Added view product API<br />
- Added send message with a one-to-many association for replies to a parent message<br />
- Added sent messages and received messages with a one-to-many association for the user model<br />
- Added view message API<br />
- Added view profile API<br />
- Added user authorization API for local caching<br />
- Refactored CORS and converted it to a middleware package<br />
- Refactored the gin routes to include auth, public API and protected API<br />
<br />
<h1>Unit Tests</h1>
<h3>Frontend Unit Tests</h3>
- Tests add product to cart<br />
- Tests remove product from cart<br />
- Tests initial cart<br />
- Tests User Login and Cookie Creation<br />
- Tests Unique User Profile<br />
- Tests User Logout<br />
<h3>Backend Unit Tests</h3>
- Test add category<br />
- Test add products to category<br />
- Test send message between 2 auto generated users<br />
- Test currency multiplication for floating point errors<br />
- Test currency division for floating point errors<br />
<h1>Backend Documentation</h1>
Register<br />
<code>curl -i -H "Content-Type: application/json" -X POST -d "{ \"username\" : \"exert\", \"email\" : \"exert@gmail.com\", \"password\" : \"exert\"}" http://localhost:4300/auth/register</code><br />
- Adds a user to the exert-shop database and encrypts the supplied password.<br />
- Returns 400 Bad Request if the insertion query fails.<br />
- Returns 201 Created upon successful entry and returns the following JSON data:<br />
- ID, createdAt, updateAt, username, email<br />
<br />
Login <br />
<code>curl -i -H "Content-Type: application/json" -X POST -d "{ \"username\" : \"exert\", \"email\" : \"exert@gmail.com\", \"password\" : \"exert\"}" http://localhost:4300/auth/login</code><br />
- Verifies the hashed password and initiates a user session with JWT.<br />
- Returns 400 Bad Request if the provided password does not match the hashed password in the database. Includes a JSON bcrypt error message in the body text.<br />
- Returns 200 OK and returns the JSON Web Token for the created session if the hashed password is verified.<br />
<br />
Add Category<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X POST -d  "{ \"name\" : \"Posters\", \"description\" : \"Posters for your wall.\"}" http://localhost:4300/api/addcategory</code><br />
- Adds a category to the exert shop database with the fields name and description. <br />
- Returns 400 Bad Request if user is not authorized to add categories.<br />
- Returns 200 OK and returns the created category with the following JSON data:<br />
- ID, createdAt, updateAt, name, description, products[]<br />
<br />
View Category<br />
<code>curl -i -H "Content-Type: application/json" -X GET http://localhost:4300/api/category/1</code><br />
- Displays a defined category and its associated products.<br />
- Returns 400 Bad Request if the provided id parameter doesn't exist in the database.<br />
- Returns 200 OK and returns the category fields ID, name and description if the provided id parameter exists in the database. Any products associated with the category are also provided.<br />
<br />
Add Product<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X POST -d  "{ \"name\" : \"Exert\", \"description\" : \"A small exert shop item.\", \"imageURL\" : \"test.com/image.jpg\",  \"originalPrice\" : 42, \"finalPrice\" : 75, \"categoryID\" : 1, \"buyerID\" : 2}" http://localhost:4300/api/addproduct</code><br />
- Adds a product to the exert shop database with the fields name, description and price. The user ID associated with the active session is also added to the database entry.<br />
- Returns 401 Unauthorized if the user does not have a verified and active session. Includes a JSON authorization failed error in the body text.<br />
- Returns 201 Created if the user is verified and authorized, and returns the following JSON data:<br />
- ID, createdAt, updatedAt, name, description, imageURL, originalPrice, finalPrice, categoryID, buyerID.<br />
<br />
View Product<br />
<code>curl -i -H "Content-Type: application/json" -X GET http://localhost:4300/api/product/1</code><br />
- Displays a defined product.<br />
- Returns 400 Bad Request if the provided id parameter doesn't exist in the database.<br />
- Returns 200 OK and returns the following JSON data:<br />
- ID, createdAt, updatedAt, name, description, imageURL, originalPrice, finalPrice, categoryID, buyerID.<br />
<br />
Send Message<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X POST -d  "{ \"subject\" : \"Hello Exert\", \"message\" : \"This is a test message for exert shop.\",  \"parentID\" : 1, \"receiverID\" : 2}" http://localhost:4300/api/sendmessage</code><br />
-  Sends a message to a defined user.<br />
- Returns 400 Bad Request if user is not authorized or if the receiver id is not valid.<br />
- Returns 200 OK and returns the sent message with the following JSON data:<br />
- ID, createdAt, updatedAt, subject, message, parentID, receiverID<br />
<br />
View Message<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X GET http://localhost:4300/api/message/1</code><br />
- Displays a defined message.<br />
- Returns 400 Bad Request if the provided id parameter doesn't exist or if the user is not the sender or the receiver.<br />
- Returns 200 OK and returns the following JSON data:<br />
- ID, createdAt, updatedAt, subject, message, parentID, receiverID<br />
<br />
View Profile<br />
<code>curl -i -H "Content-Type: application/json" -X GET http://localhost:4300/api/profile/1</code><br />
-  Displays a defined user profile.<br />
- Returns 400 Bad Request if the provided id parameter doesn't exist.<br />
- Returns 200 OK and returns the following JSON data:<br />
- ID, createdAt, updateAt, username, email<br />

