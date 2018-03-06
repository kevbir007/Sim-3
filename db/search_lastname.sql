SELECT * FROM Other_Users
WHERE Last_Name ILIKE CONCAT('%',$1,'%')
ORDER BY First_Name ASC