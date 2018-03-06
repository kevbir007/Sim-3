SELECT * FROM Other_Users
WHERE First_Name ILIKE CONCAT('%',$1,'%')
ORDER BY Last_Name ASC