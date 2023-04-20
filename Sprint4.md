<h1>Frontend</h1>
-Updated Search System<br />
-Created Search Component<br />
-Updated Product element to complement the search component<br />
-Connected Search logic to the backend call<br />
-Created a Checkout Procedure<br />
    -- Checkout Dialog<br />
    -- Checkout Component<br />
    -- Checkout Form<br />
    -- Sidebar(To display total and cart information<br />
-Connected Checkout to backend<br />
-	Added send message component<br />
-	Added inbox component<br />
-	Added homepage component<br />
-	Added category component<br />
-	Added an admin add category form<br />
-	Added category schema<br />
-	Added message schema<br />
-	Added new services for listing requests<br />
-	Implemented category form as a modal popup in the admin add product form<br />
-	Implemented send message component as a modal popup in the Inbox<br />
-	Implemented sent and received messages in the inbox component<br />
-	Implemented send message component in each profile<br />
<br />
<h1>Frontend Unit Testing</h1>
- Created unit test for search component<br />
- Created unit test for checkout component<br />
-- Tests open, close, load<br />
- Made sure previous unit tests are all passing after updates<br />
-	Homepage unit test<br />
-	Listing cypress unit test<br />
-	Inbox cypress unit test<br />
-	Send Message cypress unit test<br />
<br />
<h1>Backend</h1>
- Added search products API utilizing a tsquery for keywords.<br />
- Added an external package for Stripe payment processing.<br />
- Added a one-to-many association to the user model for sales and purchases.<br />
- Added view purchases API.<br />
- Added view sales API.<br />
- Added a one-to-many association to the user model for the inbox and sent messages.<br />
- Added view inbox API.<br />
- Added view sent messages API.<br />
- Added view dashboard API that shows the latest 10 purchases, sales and messages.<br />
- Added checkout API that integrates Stripe payment processing.<br />
- Added view categories with item limit API for the homepage.<br />
- Added get all categories API for front-end add production functionality.<br />
- Added create transaction API.<br />
- Added view transaction API.<br />
- Added unit tests for add transaction, view profile, view transaction, checkout, add product, view message, view sales, view purchases, view inbox, view sent messages.<br />
<br />
Search Products<br />
<code>curl -i -H "Content-Type: application/json" -X GET http://localhost:4300/api/product/search/gator</code><br />
- Searches for all products containing the defined keywords and returns an array of products.<br />
- Returns 400 Bad Request if no keywords were provided.<br />
- Returns 200 OK and returns an array of products with the following JSON data:<br />
- ID, createdAt, updatedAt, name, description, imageURL, originalPrice, finalPrice, quantity<br />
<br />
View Purchases<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X GET http://localhost:4300/api/purchases</code><br />
- Displays all purchases for the logged in user.<br />
- Returns 401 Unauthorized if the user does not have a verified and active session. <br />
- Returns 200 OK and returns an array of products with the following JSON data:<br />
- ID, createdAt, updatedAt, name, description, imageURL, originalPrice, finalPrice, quantity<br />
<br />
View Sales<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X GET http://localhost:4300/api/sales</code><br />
- Displays all sales for the logged in user.<br />
- Returns 401 Unauthorized if the user does not have a verified and active session. <br />
- Returns 200 OK and returns an array of products with the following JSON data:<br />
- ID, createdAt, updatedAt, name, description, imageURL, originalPrice, finalPrice, quantity<br />
<br />
View Inbox<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X GET http://localhost:4300/api/message/inbox</code><br />
- Displays all received messages for the active user.<br />
- Returns 401 Unauthorized if the user does not have a verified and active session. <br />
- Returns 200 OK and returns an array of messages with the following JSON data:<br />
- ID, createdAt, updatedAt, subject, message, parentID, receiverID<br />
<br />
View Sent Messages<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X GET http://localhost:4300/api/message/sent</code><br />
- Displays all sent messages for the active user.<br />
- Returns 401 Unauthorized if the user does not have a verified and active session. <br />
- Returns 200 OK and returns an array of messages with the following JSON data:<br />
- ID, createdAt, updatedAt, subject, message, parentID, receiverID<br />
<br />
View Dashboard<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X GET http://localhost:4300/api/dashboard</code><br />
- Displays the users latest 10 purchases, latest 10 sales, and latest 10 received messages.<br />
- Returns 401 Unauthorized if the user does not have a verified and active session. <br />
- Returns 200 OK and returns an array of mixed data with the following JSON data:<br />
- ID, createdAt, updatedAt, subject, message, parentID, receiverID<br />
<br />
Checkout<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X POST -d "[{ \"id\" : 1, \"quantity\" : 1}, {\"id\" : 1, \"quantity\" : 1}]" http://localhost:4300/api/checkout</code><br />
- Processes items in the user's cart utilizing the external stripe payment processor.<br />
- Returns 401 Unauthorized if the user does not have a verified and active session. <br />
- Returns 200 OK and returns the Stripe response body. Refer to the Stripe documentation for more information.<br />
<br />
View All Categories<br />
<code>curl -i -H "Content-Type: application/json" -X GET http://localhost:4300/api/category/all/5</code><br />
- Returns all categories and a defined amount of items in each category.<br />
- Returns 200 OK and returns a mixed array of categories and products.<br />
- Category: ID, createdAt, updatedAt, name, description<br />
- Product: ID, createdAt, updatedAt, name, description, imageURL, originalPrice, finalPrice, categoryID, buyerID<br />
<br />
Get All Categories<br />
<code>curl -i -H "Content-Type: application/json" -X GET http://localhost:4300/api/category/all</code><br />
- Returns all categories without items.<br />
- Returns 200 OK and returns an array of categories.<br />
- ID, createdAt, updatedAt, name, description<br />
<br />
Create Transaction<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X POST -d  "{ \"productID\" : 1, \"buyerID\" : 1,  \"sellerID\" : 2, \"quantity\" : 15, \"soldPrice\" : 1000}" http://localhost:4300/api/transaction/add</code><br />
- Creates a new transaction.<br />
- Returns 401 Unauthorized if the user does not have a verified and active session. <br />
- Returns 200 OK and returns the following JSON data:<br /><br />
- ID, createdAt, updatedAt, productID, buyerID, sellerID, quantity, soldPrice<br />
<br />
View Transaction<br />
<code>curl -i -H "Content-Type: application/json" -H "Authorization: Bearer <>" -X GET http://localhost:4300/api/transaction/1</code><br />
- Displays a defined transaction.<br />
- Returns 400 Bad Request if the transaction ID doesn't exist.<br />
- Returns 401 Unauthorized if the user is not the buyer or the seller.<br />
- Returns 200 OK and returns the following JSON data:<br />
- ID, createdAt, updatedAt, productID, buyerID, sellerID, quantity, soldPrice<br />

