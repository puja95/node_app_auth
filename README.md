# node_app_auth

A simple Node js application that registers users, stores data in MySql database and allows user login  after validation.

API DETAILS:

/register : To register user, encrypt password, create a JWT token and insert user details in MySql tables .Type: POST

Sample JSON Request:

```{
    "email": "puja@gmail.com",
    "password":"pass@123!",
    "age":"24",
    "role":"admin"
}
```

Sample Response :

```{
    "auth": true,
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NiwiaWF0IjoxNjAwMTg4MzA1LCJleHAiOjE2MDAxOTE5MDV9.CtyaBr155xCJApqU-TqJcguDq7f6vEX2KkWbf9Lf4mQ" 
}
```

/login : To login user and validate encrypted password with the one stored in table. Type : POST

Sample JSON Request:

```{
    "id":"8",
    "password":"pass@123!"
    
}
```

Sample Response : 

```{
    "auth": true,
    "status": "login successfull",
    "details": [
        {
            "id": 8,
            "email": "puja@gmail.com",
            "password": "$2a$08$UCdG7Y9p90WKmpB4e5e8F.S9NiMoGwnui2CwmaHitDTElexD16py6",
            "age": "24",
            "role": "admin"
        }
    ]
}
```





