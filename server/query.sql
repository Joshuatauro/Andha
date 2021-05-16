SELECT post_id, post_title, post_body, posts.created_at, posts.username, is_edited, comments.comment_id, comment_body, parent_postid
FROM posts JOIN comments ON posts.post_id = comments.parent_postid
GROUP BY post_id, comment_id

SELECT
    post_id, post_title, post_body, posts.created_at, posts.username, posts.is_edited, posts.username,
    COUNT(comments.parent_postid) As "comment_count"
FROM
    posts
LEFT JOIN
    comments ON posts.post_id = comments.parent_postid
GROUP BY
    posts.post_id
ORDER BY 
    posts.created_at DESC;

    SELECT
        post_id, post_title, post_body, posts.post_flair, posts.created_at, posts.user_id, posts.is_edited, posts.username,
        COUNT(comments.parent_postid) As "comment_count"
    FROM
        posts
    LEFT JOIN
        comments ON posts.post_id = comments.parent_postid
    GROUP BY
        posts.post_id
    ORDER BY 
        posts.created_at DESC

SELECT 
    post_id, post_title, post_body, post_flair, created_at, username, is_edited, comment_count
FROM 
    (
        SELECT
        post_id, post_title, post_body, posts.post_flair, posts.created_at, posts.user_id, posts.is_edited,
        COUNT(comments.parent_postid) As "comment_count"
        FROM
            posts
        LEFT JOIN
            comments ON posts.post_id = comments.parent_postid
        GROUP BY
            posts.post_id
        ORDER BY 
            posts.created_at DESC
    ) AS NEW_TABLE
LEFT JOIN users ON id = NEW_TABLE.user_id

SELECT 
    post_id, post_title, post_body, post_flair, created_at, username, is_edited
FROM 
    (
    SELECT 
        *
    FROM 
        posts
    WHERE 
        post_id = '9f20ce7c-1fd9-4e16-8dc5-842795f892ce'
    ) AS NEW_TABLE
LEFT JOIN users on id = NEW_TABLE.user_id

SELECT comment_id, comment_body, username, parent_postid, parent_comment_id, created_at
FROM
    (
        SELECT * FROM comments WHERE parent_postid='9f20ce7c-1fd9-4e16-8dc5-842795f892ce'
    ) AS NEW_TABLE
LEFT JOIN users ON id = NEW_TABLE.user_id


SELECT
    company_id, companies.company_name, company_industry, company_website,
    AVG(reviews.review_rating) As "company_rating"
FROM
    companies
LEFT JOIN
    reviews ON reviews.company_name = companies.company_name
GROUP BY
    companies.company_name
ORDER BY    
    company_rating ASC;

SELECT * FROM comments
JOIN posts ON post_id = parent_postid
WHERE parent_postid='8696cf1a-cd23-4278-8c5a-576dbedd50fe' 

ALTER TABLE users ADD COLUMN linkedin_url VARCHAR;