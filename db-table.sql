
CREATE TABLE category(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(50),
    imgUrl VARCHAR(300),
    PRIMARY KEY (id)
);

CREATE TABLE product(
    id int NOT NULL AUTO_INCREMENT,
    name VARCHAR(250) NOT NULL,
    categoryId INTEGER NOT NULL,
    imgUrl VARCHAR(300),
    description VARCHAR(255),
    price INTEGER,
    status VARCHAR(20),
    PRIMARY KEY (id)
);

INSERT INTO category (name,  imgUrl) VALUES('Gourmand Delight','https://res.cloudinary.com/drippyi9f/image/upload/v1708680468/pngegg_12_rbij8j.png');

INSERT INTO product (name, categoryId, imgUrl, description, price, status, ) VALUES('Whispering Woods ','1','https://res.cloudinary.com/drippyi9f/image/upload/v1708680468/pngegg_12_rbij8j.png',' A sophisticated blend of earthy woods and delicate whispers of nature, reminiscent of a tranquil forest','100','true',);