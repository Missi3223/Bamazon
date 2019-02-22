DROP DATABASE IF EXISTS bamazon_db;

CREATE DATABASE bamazon_db;

USE bamazon_db;

CREATE TABLE products(
    item_id INT NOT NULL AUTO_INCREMENT,
    product_name VARCHAR(100) NULL,
    department_name VARCHAR(100) NULL,
    price DECIMAL(10, 2) NULL,
    stock_quantity INT NULL,
    product_sales DECIMAL(10, 2) DEFAULT 0.00,
    PRIMARY KEY(item_id)
);

INSERT INTO products(product_name, department_name, price, stock_quantity, product_sales)
VALUES("Surface Pro ", "Computers", 980.00, 10, 0), ("Samsung wall charger", "Phone", 10.00, 50, 0), ("GE Dryer",
        "Appliances", 950.99, 6, 0), ("Kuerig", "Small Appliances", 105.00, 14, 0), ("Kleenex", "Household", 2.50, 200, 0), ("LG
        Headset ", "
        Phone ", 99.99, 80,0), ("
        GE Washer ", "
        Appliances ", 650.00, 8,0), ("
        Galaxy Note 10 ", "
        Phone ", 799.00, 0,0),
        ("Living Proof Shampoo", "Beauty", 25.00, 50, 0), ("HP Laptop", "Computers", 450.00, 5, 0); SELECT * FROM bamazon_db.products; CREATE TABLE departments(
            department_id INT NOT NULL AUTO_INCREMENT,
            department_name VARCHAR(100) NULL,
            over_head_costs DECIMAL(10, 2) NULL,
            product_sales DECIMAL(10, 2) DEFAULT 0.00,
            PRIMARY KEY(department_id)
        ); INSERT INTO departments(department_name, over_head_costs) VALUES('Appliances', 200000), ('Beauty', 15000), ('Computers', 150000), ('Household', 15000), ('Outdoors', 30000), ('Phone',
            100000), ('Small Appliances', 90000); SELECT * FROM bamazon_db.departments;
