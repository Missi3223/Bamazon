# Bamazon

## Create interactive tables with inventory information

_Customer View:_

![Finished Assignment](./images/Bamazon Demo.gif "Finished Result")

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

- [X] View Products for Sale
- [X] View Low Inventory
- [X] Add to Inventory
- [X] Add New Product
- [X] If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
- [X] If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
- [X] If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
- [X] If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.

## Supervisor View (Top Level)

- [X] Created a new MySQL table called departments. The table should include the following columns:

- [X] department_id
- [X] department_name
- [X] over_head_costs (A dummy number you set for each department)

- [X] Modify the products table so that there's a product_sales column, and modify your bamazonCustomer.js app so that when a customer purchases anything from the store, the price of the product multiplied by the quantity purchased is added to the product's product_sales column.

- [ ] Make sure your app still updates the inventory listed in the products column.

- [ ] Create another Node app called bamazonSupervisor.js. Running this application will list a set of menu options:

- [ ] View Product Sales by Department
- [ ] Create New Department

- [ ] When a supervisor selects View Product Sales by Department, the app should display a summarized table in their terminal/bash window. Use the table below as a guide.

| department_id | department_name | over_head_costs | product_sales | total_profit |
| ------------- | --------------- | --------------- | ------------- | ------------ |
| 01            | Electronics     | 10000           | 20000         | 10000        |
| 02            | Clothing        | 60000           | 100000        | 40000        |

- [ ] The total_profit column should be calculated on the fly using the difference between over_head_costs and product_sales. total_profit should not be stored in any database. You should use a custom alias.
If you can't get the table to display properly after a few hours, then feel free to go back and just add total_profit to the departments table.

Hint: You may need to look into aliases in MySQL.
Hint: You may need to look into GROUP BYs.
Hint: You may need to look into JOINS.
HINT: There may be an NPM package that can log the table to the console. What's is it? Good question :)
