# Bamazon
Create tables with inventory information

Instructions

Customer View- 

- [X] Create a MySQL Database called bamazon.
- [X] Then create a Table inside of that database called products.
The products table should have each of the following columns:

- [X] item_id (unique id for each product)
- [X] product_name (Name of product)
- [X] department_name
- [X] price (cost to customer)
- [X] stock_quantity (how much of the product is available in stores)

- [X] Populate this database with around 10 different products. (i.e. Insert "mock" data rows into this database and table).
- [X] Then create a Node application called bamazonCustomer.js. - [X] Running this application will first display all of the items available for sale. Include the ids, names, and prices of products for sale.
The app should then prompt users with two messages.

- [X] The first should ask them the ID of the product they would like to buy.
- [X] The second message should ask how many units of the product they would like to buy.

- [X] Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.

- [X] If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.

- [X] However, if your store does have enough of the product, you should fulfill the customer's order.

- [X] Update the SQL database to reflect the remaining quantity.
- [X] Once the update goes through, show the customer the total cost of their purchase.

## Manager View (Next Level)

Create a new Node application called bamazonManager.js. Running this application will:

_List a set of menu options:_

- [ ] View Products for Sale
- [ ] View Low Inventory
- [ ] Add to Inventory
- [ ] Add New Product
- [ ] If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
- [ ] If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
- [ ] If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
- [ ] If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.
