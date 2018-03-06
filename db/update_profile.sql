UPDATE Profile_User
SET
    First_Name = $1,
    Last_Name = $2,
    Gender = $3,
    Hair_Color = $4,
    Eye_Color = $5,
    Hobby = $6,
    Birth_Day = $7,
    Birth_Month = $8,
    Birth_Year = $9,
    MyImage = $11
WHERE ID = $10