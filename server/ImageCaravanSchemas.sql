DROP DATABASE IF EXISTS imagecaravan;
CREATE DATABASE imagecaravan;
USE imagecaravan;

CREATE TABLE Users (
  id INT AUTO_INCREMENT,
  userName TEXT NOT NULL,
  password TEXT NOT NULL,
  bio TEXT,
  location TEXT NOT NULL,
  profilePicture LONGTEXT,
  imageList TEXT,
  PRIMARY KEY (id)
);
CREATE TABLE Image (
  imageTitle TEXT,
  imageUUID INT AUTO_INCREMENT,
  imageCaption TEXT,
  imageBase64 LONGTEXT,
  imageUploader TEXT,
  visible BOOLEAN DEFAULT '1',
  PRIMARY KEY (imageUUID)
);
CREATE TABLE Hashtag (
  hashtag TEXT,
  visible BOOLEAN DEFAULT '1',
  imageUUID INT
);
CREATE TABLE Followers (
  userName TEXT,
  follower TEXT
);
CREATE TABLE Following (
  userName TEXT,
  following TEXT
);
CREATE TABLE ProfileComments (
  id INT AUTO_INCREMENT,
  profile TEXT NOT NULL,
  comment TEXT,
  commenter TEXT,
  PRIMARY KEY (id)
);
CREATE TABLE ImageComments (
  id INT AUTO_INCREMENT,
  imageUUID INT NOT NULL,
  comment TEXT,
  commenter TEXT,
  PRIMARY KEY (id)
);
