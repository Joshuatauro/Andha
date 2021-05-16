CREATE TABLE users (
  id  VARCHAR UNIQUE NOT NULL DEFAULT uuid_generate_v4(),
  username  VARCHAR UNIQUE,
  email VARCHAR PRIMARY KEY NOT NULL,
  hashedPassword VARCHAR NOT NULL ,
  company VARCHAR,
  company_location VARCHAR,
  job_title VARCHAR
);

CREATE TABLE posts (
  post_id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id VARCHAR NOT NULL,
  post_title VARCHAR NOT NULL,
  post_body VARCHAR NOT NULL,
  post_flair VARCHAR NOT NULL,
  created_at TIMESTAMP NOT NULL,
  is_edited BOOLEAN DEFAULT FALSE,

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
  is_edited BOOLEAN DEFAULT FALSE

  FOREIGN KEY(user_id)
    REFERENCES users(id)
    ON DELETE SET DEFAULT
);

CREATE TABLE salaries (
  id VARCHAR PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_name VARCHAR NOT NULL,
  company_job_title VARCHAR NOT NULL,
  salary INT NOT NULL,
  user_id VARCHAR NOT NULL,
  company_industry VARCHAR NOT NULL,

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

CREATE TABLE FLAIRS (
  flair VARCHAR UNIQUE NOT NULL
)