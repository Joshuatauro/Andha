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
