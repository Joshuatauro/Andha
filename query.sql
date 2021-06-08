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
        HAVING 
            user_id = $1
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

SELECT comment_body, NEW_TABLE.created_at, parent_postid, username, post_title 
FROM (
    SELECT 
        comments.comment_body, comments.created_at, comments.parent_postid, username
    FROM 
        comments
    LEFT JOIN 
        users ON  id = comments.user_id
) AS NEW_TABLE
LEFT JOIN 
    posts ON post_id = parent_postid;


INSERT INTO COMPANIES (company_logo, company_name, company_industry, company_location, company_about, company_founded, company_website, company_size) VALUES ('https://spng.pngfind.com/pngs/s/31-317703_apple-logo-png-transparent-svg-vector-freebie-supply.png', 'Apple', 'Consumer Electronics', 'Cupertino, CA', "Apple reinvents entire industries with its products and services, but this is only possible thanks to its diverse collection of thinkers and doers who work together to make each other's ideas stronger. Every decision Apple makes is to deliver the best user experience to its customers through its innovative hardware, software, and services.", '1976', 'https://apple.com', 10000);














SELECT 
    review_id,
    review_rating,
    review_created_at,
    company_name,
    user_id,
    user_position,
    review_pros,
    review_cons,
    review_title,
    username FROM reviews 
LEFT JOIN users on users.id = reviews.user_id
WHERE company_name ILIKE 'Google' ORDER BY review_created_at DESC

