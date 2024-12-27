
-- Create database
CREATE DATABASE IF NOT EXISTS mern_app;
USE mern_app;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY, -- Primary key
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    mobile_number VARCHAR(15) NOT NULL UNIQUE,
    password_hash VARCHAR(255) NOT NULL, -- Store hashed passwords
    created_date DATETIME DEFAULT CURRENT_TIMESTAMP, -- Created date in UTC
    created_by VARCHAR(50) DEFAULT 'system', -- Creator information
    updated_date DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- Auto-updates on modification
    updated_by VARCHAR(50) DEFAULT 'system' -- Updater information
);

-- Insert stored procedure
DELIMITER //
CREATE PROCEDURE InsertUser(
    IN fname VARCHAR(50),
    IN lname VARCHAR(50),
    IN mobile VARCHAR(15),
    IN pwd_hash VARCHAR(255),
    IN createdBy VARCHAR(50)
)
BEGIN
    INSERT INTO users (first_name, last_name, mobile_number, password_hash, created_by, updated_by)
    VALUES (fname, lname, mobile, pwd_hash, createdBy, createdBy);
END //
DELIMITER ;

-- Select stored procedure
DELIMITER //
CREATE PROCEDURE GetUserByID(IN userID INT)
BEGIN
    SELECT * FROM users WHERE id = userID;
END //
DELIMITER ;

-- Update stored procedure
DELIMITER //
CREATE PROCEDURE UpdateUser(
    IN userID INT,
    IN fname VARCHAR(50),
    IN lname VARCHAR(50),
    IN updatedBy VARCHAR(50)
)
BEGIN
    UPDATE users
    SET first_name = fname, last_name = lname, updated_date = CURRENT_TIMESTAMP, updated_by = updatedBy
    WHERE id = userID;
END //
DELIMITER ;

-- Delete stored procedure
DELIMITER //
CREATE PROCEDURE DeleteUser(IN userID INT)
BEGIN
    DELETE FROM users WHERE id = userID;
END //
DELIMITER ;
