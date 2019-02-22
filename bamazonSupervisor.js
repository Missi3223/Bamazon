var mysql = require('mysql');
var inquirer = require('inquirer');
var Table = require('cli-table');
var colors = require('colors');

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
connection.connect(function (err) {
    if (err) throw err;
    console.log("\n----------------------\n" +
        " Supervisor Data Base " +
        "\n----------------------\n");

    startSupervisor();

});

function startSupervisor() {
    inquirer
        .prompt({
            name: "sChoice",
            type: "list",
            message: "\n What would you like to do today?",
            choices: ["View Department Info",
                "View Sales By Department",
                "Add New Department",
                "Exit Supervisor View\n"
            ]
        })
        .then(function (answer) {
            switch (answer.sChoice) {
                case "View Department Info":
                    viewDeptInfo();
                    break;
                case "View Sales By Department":
                    viewDeptSales();
                    break;
                case "Add New Department":
                    addNewDept();
                    break;
                case "Exit Supervisor View":
                    exitSupervisor();
                    break;
            };
        });
}

function viewDeptInfo() {
    //show all ids, names, and products from database.
    connection.query('SELECT * FROM bamazon_db.departments', function (error, response) {
        if (error) {
            console.log(error)
        };
        //New instance of our constructor
        var theDisplayTable = new Table({
            //declare the value categories
            head: ['Dept ID'.cyan, 'Department Name'.cyan, 'Overhead Costs'.cyan, 'Produst Sales'.cyan, 'Total Profit'.cyan],
            //set widths to scale
            colWidths: [10, 30, 18, 15, 20]
        });
        //for each row of the loop
        for (i = 0; i < response.length; i++) {
            //push data to table
            theDisplayTable.push(
                [response[i].department_id, response[i].department_name, response[i].over_head_costs, "$" + response[i].product_sales, "$" + response[i].total_profit]
            );
        }
        //log the completed table to console
        console.log("\n-----------------------------------------------------\n")
        console.log(theDisplayTable.toString());
        startSupervisor();
    })
}
// function viewDeptSales() {
// 	//join products and departments tables by department name, combine product sales by department
// 	var query = "SELECT departments.department_id, departments.department_name, departments.over_head_costs, SUM(products.product_sales" +
// 	query + "FROM products RIGHT JOIN departments ON products.department_name = departments.department_name " +
// 	query + "GROUP BY departments.department_id, products.department_name";connection.query(query, function(error, response){
//         if (error){
//         console.log(error)};
// 		//create table to display product sale

//             var theDisplayTable = new Table({
//                 //declare the value categories
//                 head:  ['Dept ID'.cyan, 'Department Name'.cyan, 'Overhead Costs'.cyan, 'Product Sales'.cyan, 'Total Profit'.cyan],
//                 //set widths to scale
//                 colWidths: [10, 30, 18, 15, 20]
//             });
//             //for each row of the loop

//             response.forEach(function(row){
//             if (row['SUM(products.product_sales)'] === null) {
// 				row['SUM(products.product_sales)'] = 0;
// 			}
// 			//calculate total profit - difference bt sales and overhead
//             var total_profit = (row['SUM(products.product_sales)'] - row.over_head_costs);


//                 [row.department_id, row.department_name, row.over_head_costs, row['SUM'(products.product_sales)], total_profit]

//                 for (i = 0; i < response.length; i++) {
//                     //push data to table
//                     theDisplayTable.push(
//                         [response[i].department_id, response[i].department_name, response[i].over_head_costs,"$"+ response[i].product_sales,"$" + response[i].total_profit]
// 			);	
//                     }
//         })
//         console.log("\n-----------------------------------------------------\n")   
//             console.log(theDisplayTable.toString());
//             startSupervisor();
// })
// 			// push results and profit calc to table
//                 // theDisplayTable.push(
//                 //     [response[i].department_id, response[i].department_name, response[i].over_head_costs,"$"+ response[i].product_sales,"$" + response[i].total_profit]
//                 // );

//             //log the completed table to console
//             console.log("\n-----------------------------------------------------\n")   
//             console.log(theDisplayTable.toString());
//             startSupervisor();
// };