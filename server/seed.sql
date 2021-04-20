CREATE TABLE users (
  id VARCHAR NOT NULL,
  username  VARCHAR UNIQUE,
  email VARCHAR PRIMARY KEY NOT NULL,
  hashedPassword VARCHAR NOT NULL ,
  company VARCHAR,
  company_location VARCHAR,
  job_title VARCHAR
);

CREATE TABLE posts (
  post_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  username VARCHAR NOT NULL,
  post_title VARCHAR NOT NULL,
  post_body VARCHAR NOT NULL,
  post_flair VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE
);

CREATE TABLE comments (
  comment_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  comment_body VARCHAR NOT NULL,
  username VARCHAR NOT NULL,
  parent_postid VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL
);

CREATE TABLE likes (
  username VARCHAR NOT NULL,
  parent_postid VARCHAR NOT NULL
);

CREATE TABLE salaries (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR NOT NULL,
  company_job_title VARCHAR NOT NULL,
  salary INT NOT NULL,
  username VARCHAR NOT NULL,
  company_industry VARCHAR NOT NULL
);

CREATE TABLE companies (
  company_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_rating INT NOT NULL DEFAULT 0,
  company_name VARCHAR NOT NULL,
  company_industry VARCHAR NOT NULL,
  company_location VARCHAR NOT NULL
);

CREATE TABLE reviews (
  review_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR NOT NULL,
  company_review VARCHAR NOT NULL,
  review_rating INT NOT NULL,
  company_industry VARCHAR NOT NULL
);