CREATE DATABASE IF NOT EXISTS store_rating_db;
USE store_rating_db;

CREATE TABLE IF NOT EXISTS users (
  uid INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  address VARCHAR(400),
  password VARCHAR(255) NOT NULL,
  role ENUM('admin', 'normal_user', 'store_owner') NOT NULL DEFAULT 'normal_user',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- used in later stages, created now to keep schema design in one place
CREATE TABLE IF NOT EXISTS stores (
  sid INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(60) NOT NULL,
  email VARCHAR(100),
  address VARCHAR(400),
  owner_uid INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (owner_uid) REFERENCES users(uid) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS ratings (
  rid INT AUTO_INCREMENT PRIMARY KEY,
  uid INT NOT NULL,
  sid INT NOT NULL,
  rating TINYINT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE KEY unique_user_store_rating (uid, sid),
  FOREIGN KEY (uid) REFERENCES users(uid) ON DELETE CASCADE,
  FOREIGN KEY (sid) REFERENCES stores(sid) ON DELETE CASCADE
);
