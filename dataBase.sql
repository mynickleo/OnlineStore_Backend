-----
CREATE DATABASE onlinestore;

-- Создание таблицы users
create TABLE users(
	id SERIAL PRIMARY KEY,
	name VARCHAR(255),
	surname VARCHAR(255),
	email VARCHAR(255),
	password VARCHAR(255)
);

-- Создание таблицы roles
create TABLE roles(
	user_id INTEGER,
	role VARCHAR(255),
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);

-- Создание таблицы типов товаров products_types
create TABLE products_types(
	id_type SERIAL PRIMARY KEY,
	name_type VARCHAR(255)
);

-- Создание таблицы списков поставщиков maker_info
create TABLE maker_info(
	id_maker SERIAL PRIMARY KEY,
	name_maker VARCHAR(255)
);

-- Создание таблицы products
create TABLE products(
	id_product SERIAL PRIMARY KEY,
	name_product VARCHAR(255),
	maker_id INTEGER,
	type_id INTEGER,
	price INTEGER,
	FOREIGN KEY (maker_id) REFERENCES maker_info (id_maker),
	FOREIGN KEY (type_id) REFERENCES products_types (id_type)
);

-- Создание таблицы basket
create TABLE basket(
	user_id INTEGER,
	product_id INTEGER,
	count_product INTEGER,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products (id_product)
);

-- Создание таблицы orders_details
create TABLE orders_details(
	order_id SERIAL PRIMARY KEY,
	user_id INTEGER,
	product_id INTEGER,
	count_product INTEGER,
	datetime DATE,
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE,
	FOREIGN KEY (product_id) REFERENCES products (id_product)
);

-- Создание таблицы orders
create TABLE orders(
	id_order INTEGER,
	user_id INTEGER,
	FOREIGN KEY (id_order) REFERENCES orders_details (order_id),
	FOREIGN KEY (user_id) REFERENCES users (id) ON DELETE CASCADE
);