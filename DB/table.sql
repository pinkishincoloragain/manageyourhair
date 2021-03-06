show databases;
DROP DATABASE manager;
CREATE DATABASE manager default CHARACTER SET UTF8;
use manager;

CREATE TABLE USER
(
    CUSTOMER_ID INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY,
    CUSTOMER_FIRST_NAME VARCHAR(50),
    CUSTOMER_LAST_NAME VARCHAR(50),
    CONTACT_NO VARCHAR(20) NOT NULL,
    LOGIN_ID VARCHAR(20) NOT NULL,
    LOGIN_PW VARCHAR(60) NOT NULL,
    PHOTO_LINK VARCHAR(100)
);

CREATE TABLE HAIRSHOP
(
    SHOP_ID INT UNIQUE NOT NULL PRIMARY KEY,
    NAME VARCHAR(100),
    LOGIN_ID VARCHAR(20) NOT NULL,
    LOGIN_PW VARCHAR(20) NOT NULL,
    ADDRESS VARCHAR(100),
    LOC_X FLOAT,
    LOC_Y FLOAT,
    SCORE FLOAT,
    WEBSITE VARCHAR(100),
    CONTACT VARCHAR(100),
    OPEN_HOUR VARCHAR(256),
    DESCRIPTION VARCHAR(500),
    PHOTO_LINK VARCHAR(500)
);

CREATE TABLE BOOKING
(
    BOOKING_ID INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY,
    SHOP_ID INT NOT NULL,
    CUSTOMER_ID INT NOT NULL,
    BOOKING_DATE DATE NOT NULL,
    DESCRIPTION VARCHAR(100),
    FOREIGN KEY (SHOP_ID)
    REFERENCES  HAIRSHOP(SHOP_ID) ON UPDATE CASCADE,
    FOREIGN KEY (CUSTOMER_ID)
    REFERENCES  USER(CUSTOMER_ID) ON UPDATE CASCADE
);

CREATE TABLE COMMENT
(
    COMMENT_ID INT UNIQUE NOT NULL AUTO_INCREMENT PRIMARY KEY,
    BOOKING_ID INT NOT NULL,
    CUSTOMER_ID INT NOT NULL,
    SHOP_ID INT NOT NULL,
    BOOKING_DATE DATE NOT NULL,
    COMMENT_DATE TIMESTAMP NOT NULL DEFAULT NOW(),
    COMMENT_TEXT VARCHAR(500),
    SCORE FLOAT NOT NULL,
    FOREIGN KEY (BOOKING_ID)
    REFERENCES  BOOKING(BOOKING_ID) ON UPDATE CASCADE,
    FOREIGN KEY (CUSTOMER_ID)
    REFERENCES  BOOKING(CUSTOMER_ID) ON UPDATE CASCADE,
    FOREIGN KEY (SHOP_ID)
    REFERENCES  BOOKING(SHOP_ID) ON UPDATE CASCADE

);

show tables;