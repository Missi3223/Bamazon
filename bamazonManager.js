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
    console.log("\n-----------------------------\n" +
    " Manager's Bamazon Data Base ".red +
    "\n-----------------------------\n");

    runSearch ();
    
});
//   SELECT * FROM bamazon_db.products;
function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "\n What would you like to do? ",
      choices: [
        "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product",
        "exit"
      ]
    })
    .then(function(answer) {
      switch (answer.action) {
      case "View Products for Sale":
        displayAll();
        break;

      case "View Low Inventory":
        lowInventory();
        break;

      case "Add to Inventory":
        addInventory();
        break;

      case "Add New Product":
        newProduct();
         break; 

      case "exit":
        connection.end();
        break;
      }
    });
}      
        
function displayAll() {
    //show all ids, names, and products from database.
    connection.query('SELECT * FROM bamazon_db.products', function(error, response) {
        if (error) { console.log(error) };
        //New instance of our constructor
        var theDisplayTable = new Table({
            //declare the value categories
            head:  ['Item ID'.cyan, 'Product Name'.cyan, 'Department'.cyan, 'Price'.cyan, 'Quantity'.cyan,'Product Sales'.cyan],
            //set widths to scale
            colWidths: [10, 30, 18, 10, 14,25]
        });
        //for each row of the loop
        for (i = 0; i < response.length; i++) {
            //push data to table
            theDisplayTable.push(
                [response[i].item_id, response[i].product_name, response[i].department_name,"$"+ response[i].price, response[i].stock_quantity,"$"+ response[i].product_sales ]
            );
        }
        //log the completed table to console
        console.log("\n-----------------------------------------------------\n")   
        console.log(theDisplayTable.toString());
        runSearch();
    })
} 
function lowInventory(){
    connection.query("SELECT * FROM bamazon_db.products WHERE NOT stock_quantity >= '5'", function(error, response) {
        if (error) { console.log(error) }; 
    
        var theDisplayTable = new Table({
            //declare the value categories
            head:  ['Item ID'.cyan, 'Product Name'.cyan, 'Department'.cyan, 'Price'.cyan, 'Quantity'.cyan, 'Product Sales'.cyan],
            //set widths to scale
            colWidths: [10, 30, 18, 10, 14,25]
        });
        //for each row of the loop
        for (i = 0; i < response.length; i++) {
            //push data to table
            theDisplayTable.push(
                [response[i].item_id, response[i].product_name, response[i].department_name,"$"+ response[i].price, response[i].stock_quantity,"$"+ response[i].product_sales ]
            );
        }
        //log the completed table to console
        console.log("\n-----------------------------------------------------\n")   
        console.log(theDisplayTable.toString());
        runSearch();
})
}
function addInventory(){
        //user input
        inquirer.prompt([    
            {
                name: "ID",
                type: "input",
                message: "What is the item number in need of restocking ?"
            }, {
                name: 'Quantity',
                type: 'input',
                message: "How many would you like to add?"
            },
    
        ]).then(function(answers) {
            //set captured input as variables, pass variables as parameters.
            var quantityAdded = answers.Quantity;
            var IDOfProduct = answers.ID;
            updateDataBase(IDOfProduct, quantityAdded);
        });
    }; 
    
    //runs on user parameters from the request function
    function updateDataBase(id, quantityAdded) {
        //update the database
        connection.query('SELECT * FROM bamazon_db.products WHERE item_id = ' + id, function(error, response) {
            if (error) { console.log(error) };
            connection.query('UPDATE bamazon_db.products SET stock_quantity = stock_quantity + '+ quantityAdded + ' WHERE item_id = ' + id);
            connection.query('SELECT * FROM bamazon_db.products WHERE item_id = ' + id, function(error, response) {
                if (error) { console.log(error) };
            var theDisplayTable = new Table({
                //declare the value categories
                head:  ['Item ID'.cyan, 'Product Name'.cyan, 'Department'.cyan, 'Price'.cyan, 'Quantity'.cyan, 'Product Sales'.cyan],
                //set widths to scale
                colWidths: [10, 30, 18, 10, 14,25]
            });
            //for each row of the loop
            for (i = 0; i < response.length; i++) {
                //push data to table
                theDisplayTable.push(
                    [response[i].item_id, response[i].product_name, response[i].department_name,"$"+ response[i].price, response[i].stock_quantity,"$"+ response[i].product_sales ]
                );
            }
            //log the completed table to console
            console.log("\n-----------------------------------------------------\n")   
            console.log(theDisplayTable.toString());
            runSearch(); 
        });
    })
}; 

    function newProduct(){
        inquirer.prompt([
            {
                name: "Name",
                type: "input",
                message: "What is the name of the item to be added?"
            },
            {
                name: 'Department',
                type: 'input',
                message: "What department will this product be in?"
            },
            {
                name: 'Price',
                type: 'input',
                message: "Cost of product?"
            },
            {
                name: 'Quantity',
                type: 'input',
                message: "How many will be added?"
            },

        ]).then(function(answers){
            //gather user input, store as variables, pass as parameters
            var name = answers.Name;
    	    var department = answers.Department;
    	    var price = answers.Price;
    	    var quantity = answers.Quantity;
    	addNewItem(name,department,price,quantity);
    });
}; 

            function addNewItem(name,department,price,quantity){
                //query database, insert new item
                connection.query('SELECT * FROM bamazon_db.products', function(error, response) {
                    if (error) { console.log(error) };
                connection.query("INSERT INTO bamazon_db.products (product_name,department_name,price,stock_quantity) VALUES ('" + name + "','" +  department +  "'," + price + ',' + quantity + ")"); 
                connection.query('SELECT * FROM bamazon_db.products', function(error, response) {
                    if (error) { console.log(error) };
                var theDisplayTable = new Table({
                    //declare the value categories
                    head:  ['Item ID'.cyan, 'Product Name'.cyan, 'Department'.cyan, 'Price'.cyan, 'Quantity'.cyan,'Product Sales'.cyan],
                    //set widths to scale
                    colWidths: [10, 30, 18, 10, 14,25]
                });
                //for each row of the loop
                for (i = 0; i < response.length; i++) {
                    //push data to table
                    theDisplayTable.push(
                        [response[i].item_id, response[i].product_name, response[i].department_name,"$"+ response[i].price, response[i].stock_quantity, "$"+ response[i].product_sales ]
                    );
                }
                //log the completed table to console
                console.log("\n-----------------------------------------------------\n")   
                console.log(theDisplayTable.toString()); 
                runSearch();            
            }); 
        })
    } 
    
             
       
      
