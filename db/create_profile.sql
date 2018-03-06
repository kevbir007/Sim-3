INSERT INTO Profile_User (
    First_Name,
    Last_Name,
    Gender,
    Hair_Color,
    Eye_Color,
    Hobby,
    Birth_Day,
    Birth_Month,
    Birth_Year,
    MyImage,
    Auth_Id
)
VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11)
RETURNING ID