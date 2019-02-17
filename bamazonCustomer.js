var mysql = require ('mysql');
var inquirer = require ('inquirer');
var Table = require ('cli-table');
var colors = require ('colors');

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon_db"
});
connection.connect(function(err) {
    if (err) throw err;
    console.log("\n----------------------\n" +
    " Welcome to Bamazon " +
    "\n----------------------\n");

    displayAll ();
    
});


//   SELECT * FROM bamazon_db.products;
function displayAll() {
  //show all ids, names, and products from database.
  connection.query('SELECT * FROM bamazon_db.products', function(error, response) {
      if (error) { console.log(error) };
      //New instance of our constructor
      var theDisplayTable = new Table({
          //declare the value categories
          head:  ['Item ID', 'Product Name', 'Department', 'Price', 'Quantity'],
          //set widths to scale
          colWidths: [10, 30, 18, 10, 14]
      });
      //for each row of the loop
      for (i = 0; i < response.length; i++) {
          //push data to table
          theDisplayTable.push(
              [response[i].item_id, response[i].product_name, response[i].department_name,"$"+ response[i].price, response[i].stock_quantity]
          );
      }
      //log the completed table to console
      console.log(theDisplayTable.toString());
      
      inquireForPurchase();
    });


}; //end displayAll
function inquireForPurchase() {
    //get item ID and desired quantity from user. Pass to purchase from Database
    inquirer.prompt([

        {
            name: "ID",
            type: "input",
            message: "What is the item number for the product you wish to purchase?"
        }, {
            name: 'Quantity',
            type: 'input',
            message: "How many would you like to buy?"
        },

    ]).then(function(answers) {
        //set captured input as variables, pass variables as parameters.
        var quantityDesired = answers.Quantity;
        var IDDesired = answers.ID;
        purchaseFromDatabase(IDDesired, quantityDesired);
    });

}; 

function purchaseFromDatabase(ID, quantityNeeded) {
    //check DB to see if the quatity is available. If available subtract the amount ordered for DB.  If unavailable the let user know 
    connection.query('SELECT * FROM bamazon_db.products WHERE item_id = ' + ID, function(error, response) {
        if (error) { console.log(error) };

        //if in stock
        if (quantityNeeded <= response[0].stock_quantity) {
            //calculate cost
            var totalCost = response[0].price * quantityNeeded;
            //inform user
            console.log("We have you covered! ");
            console.log("Your total cost for " + quantityNeeded + " " + response[0].product_name + " is $" + totalCost + ". Thank you for shopping at Bamazon!");
            //update database, minus purchased quantity
            connection.query('UPDATE bamazon_db.products SET stock_quantity = stock_quantity - ' + quantityNeeded + ' WHERE item_id = ' + ID);
        } else {
            console.log("OH NO!!!!  We are sold out of " + response[0].product_name + " and are unable to fulfill your order.");
        };
        continueShopping();
    });
};
function continueShopping(){
    inquirer.prompt(
        {
        type: "input",
        name:"response",
        message: "Are you done shopping for today?",
        choices: ["Yes", "No"]
        })

       .then(function(answers){
           
        
       if (answers.response === "No")
            displayAll();
           
            
       })
       
    };
    
 