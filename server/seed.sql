CREATE TABLE users (
  id  VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  username  VARCHAR UNIQUE,
  email VARCHAR PRIMARY KEY NOT NULL,
  hashedPassword VARCHAR NOT NULL ,
  company VARCHAR,
  location VARCHAR,
  job_title VARCHAR,
  linkedin_url VARCHAR,
  portfolio_url VARCHAR,
  bio VARCHAR DEFAULT 'Hello there, welcome to my profile' 
);

CREATE TABLE posts (
  post_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR NOT NULL,
  post_title VARCHAR NOT NULL,
  post_body VARCHAR NOT NULL,
  post_flair VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE,
  liked_by TEXT[],
  search_helper tsvector,

  FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET DEFAULT
);

CREATE TABLE comments (
  comment_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  parent_comment_id VARCHAR,
  comment_body VARCHAR NOT NULL,
  user_id VARCHAR NOT NULL,
  parent_postid VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE,
  liked_by TEXT[],

  FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET DEFAULT
);


CREATE TABLE companies (
  company_id VARCHAR UNIQUE  DEFAULT uuid_generate_v4(),
  company_logo VARCHAR,
  company_name VARCHAR PRIMARY KEY NOT NULL,
  company_industry VARCHAR NOT NULL,
  company_location VARCHAR NOT NULL,
  company_about VARCHAR NOT NULL,
  company_founded VARCHAR NOT NULL,
  company_website VARCHAR NOT NULL,
  company_size INT NOT NULL DEFAULT 5
);

CREATE TABLE reviews (
  review_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  review_rating INT NOT NULL,
  review_created_at TIMESTAMP DEFAULT NOW(),
  company_name VARCHAR NOT NULL,
  user_id VARCHAR NOT NULL DEFAULT NULL,
  user_position VARCHAR NOT NULL,
  review_pros VARCHAR NOT NULL,
  review_cons VARCHAR NOT NULL,
  review_title VARCHAR NOT NULL,

  FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET DEFAULT,

  FOREIGN KEY(company_name)
    REFERENCES companies(company_name)
    ON DELETE SET DEFAULT
);

CREATE TABLE jobs (
  job_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  job_title VARCHAR NOT NULL,
  job_company VARCHAR NOT NULL,
  job_location VARCHAR NOT NULL,
  job_created_at TIMESTAMP NOT NULL,
  job_desc VARCHAR NOT NULL,
  job_apply_at VARCHAR NOT NULL,
  job_is_approved BOOLEAN DEFAULT FALSE,
  search_helper tsvector
)