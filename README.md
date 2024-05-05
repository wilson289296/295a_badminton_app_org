# CMPE295 final project-- badminton ML based application

## Backend Endpoint
### 1. User registration: ```localhost:3001/badminton/users/register```
request body JSON:
```
{
    "name",(required)
    "zipCode",(optional)
    "yearsOfExperience",(optional)
    "email",(required)
    "password".(required)
}
```

response JSON:
```
{   statusCode: 200, message: "Account Created" }
```
OR
```
{
  "statusCode": 404,
  "message": "Please provide required information to register an account. User validation failed: password: Password is a required field"
}
```

### 2. User login: ```localhost:3001/badminton/users/login```
request body JSON:
```
{
    "email",
    "password"
}
```

response JSON:
```
{
    statusCode: 200, message: "Welcome "
}
```
OR
```
{
    statusCode: 404,message: "User Not Found" 
}
```

### 3. Fetch user profile information:
```localhost:3001/badminton/users/email/test191@hotmail.com```

response JSON:
```
{
  "statusCode": 200,
  "message": "Found user!",
  "body": {
    "_id": "65683803a7e6ed18569f1aa2",
    "email": "test191@hotmail.com",
    "name": "optionalTesting",
    "skillRating": 1500,
    "onlineStatus": false,
    "matchStatus": false,
    "createdAt": "2023-11-30T07:21:39.224Z",
    "updatedAt": "2023-12-06T21:25:59.536Z",
    "__v": 0,
    "yearsOfExperience": 2,
    "zipCode": "12345",
    "age": 24,
    "gender": "F",
    "matchingDistance": 15,
    "style": "single",
    "yourStory": "i am testing"
  }
}
```
OR
```
{
  "statusCode": 404,
  "message": "user not found"
}
```

### 4. api to update one user's online status: 
```localhost:3001/badminton/users/updateUserOnlineStaus```
request body JSON:
```
{
    "email": "test@hotmail.com"
}
```

response JSON:
```
{
  "statusCode": 200,
  "message": "Update user infor successfully."
}
```

OR:
```
{
  "statusCode": 404,
  "message": "Unkonw error to update user infor."
}
```

### 5. api to update one user's match status:
 ```localhost:3001/badminton/users/updateUserMatchStatus```
request body JSON:
```
{
    "email": "test@hotmail.com"
}
```

response JSON:
```
{
  "statusCode": 200,
  "message": "Update user infor successfully."
}
```

OR:
```
{
  "statusCode": 404,
  "message": "Unkonw error to update user infor."
}
```

### 6. api to update one user's basic information: 
```localhost:3001/badminton/users/updateUserInfo```
request body JSON:
```
{
  "email": "test@hotmaiel.com", //required
  "name": "optional", //optional field
  "zipCode": "90876", //optioanl field
  "yearsOfExperience": 2, //optional field
  "skillRating": 1800 //optional field
  "gender" : "F",
  "age": 24,
  "zipCode": "12345",
  "yearsOfExperience" : 2,
  "style":"aggressive",
  "format": "single",
  "matchingDistance": 15,
  "yourStory": "i am testing"
}
```

response JSON:
```
{
  "statusCode": 200,
  "message": "Update user infor successfully."
}
```
OR:
```
{
  "statusCode": 404,
  "message": "Unkonw error to update user infor."
}
```

### 7. api to input invitation for single player: 
```localhost:3001/badminton/gaming/inviteSinglePlayer```
request body JSON:
```
{
  "invitorEmail": "test191@hotmail.com",
  "inviteeEmail":"test19@hotmail.com",
  "phoneNumber":"12323434325",
  "gamingDate":"2024-12-03",  //String type passed in this format 'YYYY-MM-DD'
  "gameStartTime":"08:20",  //String Type passed in this format 'hh:mm'
  "gameEndTime":"10:20",  //String Type passed in this format 'hh:mm'
  "address":"address",
  "zipCode":"567568756"     
}
```
response JSON:
```
{
  "statusCode": 200,
  "message": "Invitation Created for, optionalTesting",
  "body": {
    "invitor": "test191@hotmail.com",
    "invitee": "test19@hotmail.com"
  }
}
```
OR:
```
{
  "statusCode": 404,
  "message": "Not be able to find the invitee in the system."
}
```

### 8. api to input invitation for double player: 
```localhost:3001/badminton/gaming/inviteDoublePlayer```
request body JSON:
```
{

  "invitorEmail": "test191@hotmail.com",
  "invitorPartnerEmail":"test19@hotmail.com",
  "inviteePlayer1Email":"test@hotmail.com",
  "inviteePlayer2Email": "test2@hotmail.com",
  "phoneNumber":"12323434325",
  "gamingDate":"2024-12-20", //String type passed in this format 'YYYY-MM-DD'
  "gameStartTime":"10:20", //String Type passed in this format 'hh:mm'
  "gameEndTime":"13:20", //String Type passed in this format 'hh:mm'
  "address":"address",
  "zipCode":"567568756"
      
}
```
response JSON:
```
{
  "statusCode": 200,
  "message": "Invitation Created for Double players, optionalTesting and optionalTesting",
  "body": {
    "invitor": "test191@hotmail.com",
    "partner": "test19@hotmail.com",
    "opponentPlayer1": "test@hotmail.com",
    "opponentPlayer2": "test2@hotmail.com"
  }
}
```

OR:
```
{
  "statusCode": 404,
  "message": "Not be able to find the this invitor's partner in the system."
}
```
OR:
```
{
  "statusCode": 404,
  "message": "Not be able to invite same player to be your partner or opponent at the same time."
}
```

### 9. api to find players list from invitation record: 
```localhost:3001/badminton/users/findPlayersRecord```
POST call
request body JSON:
```
{
"email": "test191@hotmail.com",
"gamingDate": "2023-10-27", //String type passed in this format 'YYYY-MM-DD'
"gameStartTime":"10:20", //String Type passed in this format 'hh:mm'
}
```
response JSON:
Double players gaming response: 
```
{
  "statusCode": 200,
  "message": "Found players list.",
  "body": {
    "partner": "test@hotmail.com",
    "opponent": [
      "test2@hotmail.com",
      "test1129@hotmail.com"
    ]
  }
}
```
Single players gaming response:
```
{
  "statusCode": 200,
  "message": "Found players list.",
  "body": {
    "opponent": "test@hotmail.com"
  }
}
```
OR:
```
{
  "statusCode": 404,
  "message": "No invitation record found!"
}
```
OR:
```
{
  "statusCode": 404,
  "message": "User Not Found"
}
```

### 10. api to fetch this user's invitation notification: 
```localhost:3001/badminton/gaming/getNotification/test19@hotmail.com```

response body:
```
{
  "statusCode": 200,
  "message": "Invitation notifications.",
  "body": [
    {
      "invitor": "test191@hotmail.com",
      "phoneNumber": "12323434325",
      "gamingDate": "2023-10-28T00:00:00.000Z",
      "gameStartTime": "10:29",
      "message": "You received a gaming invitation as the invitor's opponent."
    },
    {
      "invitor": "test191@hotmail.com",
      "phoneNumber": "12323434325",
      "gamingDate": "2023-10-28T00:00:00.000Z",
      "gameStartTime": "Fri Oct 27 2023 17:00:00 GMT-0700 (Pacific Daylight Time)",
      "message": "You received a gaming invitation as the invitor's opponent."
    }
  ]
}
```

OR:
```
{
  "statusCode": 404,
  "message": "Not be able to find the user in the system."
}
```

### 11. api to add this user's match record: ```localhost:3001/badminton/users/addMatchHistory```
for single playing format:
request body: 
```
{
  "email":"test@hotmail.com",
  "format" : "Single",
  "date": "2024-09-01", //String type passed in this format 'YYYY-MM-DD'
  "yourScore": 34,
  "opponentScore": 56,
  "opponentEmail": ["test26768@hotmail.com"] //This must pass in as array
  
}
```
response body:
```
{
  "statusCode": 200,
  "message": "Match history created for your single player format game."
}
```
OR:
```
{
  "statusCode": 404,
  "message": "Missing your opponent's email."
}
```

For double players gaming mode:
request body: 
```
{
  "email":"test@hotmail.com",
   "format" : "Double",
  "date": "2026-09-01",
  "yourScore": 35,
  "opponentScore": 56,
  "partnerEmail": "test2@gmail.com",
  "opponentEmail": ["test26768@hotmail.com","test112909@hotmail.com"]  //This must pass in as array
  
}
```
response body:
```
{
  "statusCode": 200,
  "message": "Match history created for your double player format game."
}
```
### OR: 
```
{
  "statusCode": 404,
  "message": "Missing your opponent's email."
}
```

### 12. api to fetch a user's match history: 
```localhost:3001/badminton/users/getMatchHistory/:email```

response body:
```
{
  "statusCode": 200,
  "message": "Match history found.",
  "body": [
    {
      "_id": "65722e1411b00b7248119dfd",
      "email": "test@hotmail.com",
      "date": "2026-09-01T00:00:00.000Z",
      "format": "Single",
      "matchingOpponents": [
        "test26768@hotmail.com"
      ],
      "yourScore": 35,
      "opponentScore": 56,
      "createdAt": "2023-12-07T20:41:56.297Z",
      "updatedAt": "2023-12-07T20:41:56.297Z",
      "__v": 0
    },
    {
      "_id": "65722f498c96ccbeed86544b",
      "email": "test@hotmail.com",
      "date": "2026-09-01T00:00:00.000Z",
      "format": "Double",
      "matchingPartners": "test2@gmail.com",
      "matchingOpponents": [
        "test26768@hotmail.com",
        "test112909@hotmail.com"
      ],
      "yourScore": 35,
      "opponentScore": 56,
      "createdAt": "2023-12-07T20:47:05.397Z",
      "updatedAt": "2023-12-07T20:47:05.397Z",
      "__v": 0
    }
  ]
}
```

OR:
```
{
  "statusCode": 404,
  "message": "User Not Found"
}
```

### 13. api to store AI training data into DB: ```localhost:3001/badminton/users/addAImodelData```
request body:
```
{
  "email": "test@hotmail.com", //required field
  "choices": [, //required field
    ["u1@gmail.com","u2@gmail.com",0],
    ["u1@gmail.com","u2@gmail.com",1],
    ["u1@gmail.com","u2@gmail.com",0],
    ["u1@gmail.com","u2@gmail.com",1],
    ["u1@gmail.com","u2@gmail.com",1]
  ]
}
```

response body:
```
{
  "statusCode": 200,
  "message": "Successfully created AI training data for user, test@hotmail.com"
}
```
### OR:
```
{
  "statusCode": 404,
  "message": "User Not Found"
}
```

### 14. APi to fetch a user's AI training model data: 
```localhost:3001/badminton/users/getAImodelData/test12340226@gmail.com```
```
{
  "statusCode": 200,
  "message": "Successfully get AI training data for user, test12340226@gmail.com",
  "body": {
    "_id": "65d9931006dea9ce811dc370",
    "email": "test12340226@gmail.com",
    "choices": [
      [
        "u1@gmail.com",
        "u2@gmail.com",
        0
      ],
      [
        "u1@gmail.com",
        "u2@gmail.com",
        1
      ],
      [
        "u1@gmail.com",
        "u2@gmail.com",
        0
      ],
      [
        "u1@gmail.com",
        "u2@gmail.com",
        1
      ],
      [
        "u1@gmail.com",
        "u2@gmail.com",
        1
      ]
    ],
    "weights": {
      "age_diff": -0.5414381889533985,
      "yoe_diff": -0.42705239244499316,
      "format_compat": 0.08391591231691248,
      "style_compat": -0.42429159089896257,
      "rating_diff": -0.009866942037373792,
      "onlineStatus": 0.10385781902388118,
      "matchStatus": -0.6471027957443989
    },
    "createdAt": "2024-02-24T06:56:16.298Z",
    "updatedAt": "2024-02-24T06:56:16.298Z",
    "__v": 0
  }
}
```
### OR:
```
{
  "statusCode": 404,
  "message": "User Not Found"
}
```

### 15. APi to fetch 20 users's email: ```localhost:3001/badminton/users/randomUsers```

GET call 
response body:
```
{
  "statusCode": 200,
  "message": "Successfully Fetch 20 users!",
  "body": [
    "karmawilkerson@sjsu.edu",
    "keithpowell@sjsu.edu",
    "elainehuskey@sjsu.edu",
    "michaelkiefer@sjsu.edu",
    "melvinfrick@sjsu.edu",
    "cheryldunham@sjsu.edu",
    "elbabridges@sjsu.edu",
    "charlotteheath@sjsu.edu",
    "joewolfgang@sjsu.edu",
    "eduardolombardo@sjsu.edu",
    "peterclark@sjsu.edu",
    "dorothyhanson@sjsu.edu",
    "meganmoret@sjsu.edu",
    "christophersliva@sjsu.edu",
    "eugenemarks@sjsu.edu",
    "colbyselleck@sjsu.edu",
    "marywhite@sjsu.edu",
    "kirkclement@sjsu.edu",
    "martyvogel@sjsu.edu",
    "brittanythao@sjsu.edu"
  ]
}
```

### 16. APi to request recommendations for partners or singles opponents:
```localhost:3001/badminton/users/getSinglePlayerRecommendations/bruceoconnor@sjsu.edu```
GET call 
response body:
```
{
  "statusCode": 200,
  "message": "Successfully get recommendations for singles user. ",
  "body": [
    "meganmoret@sjsu.edu",
    "carlamccracken@sjsu.edu",
    "rubiencallado@sjsu.edu",
    "josefriedlander@sjsu.edu",
    "leahreker@sjsu.edu",
    "patriciathompson@sjsu.edu",
    "bradenriquez@sjsu.edu",
    "charlottepayne@sjsu.edu"
  ]
}
```
 ### OR:
 ```
 {
  "statusCode": 400,
  "message": "Can not get recommendations for singles user. ",
  "body": {
    "detail": "carmenanderson@sjsu.edu could not be found in mldata."
  }
}
```

### 17. APi to request recommendations for first doubles opponent:
```localhost:3001/badminton/users/getFirstDoublePlayerRecommendations/carmenanderson@sjsu.edu/bruceoconnor@sjsu.edu```
GET call
response body:
```
{
  "statusCode": 200,
  "message": "Successfully get recommendations for first double player. ",
  "body": [
    "charlottepayne@sjsu.edu",
    "meganmoret@sjsu.edu",
    "rubiencallado@sjsu.edu",
    "joycewhite@sjsu.edu",
    "mariapierce@sjsu.edu",
    "marcellacorzo@sjsu.edu",
    "annettebrashier@sjsu.edu",
    "leahreker@sjsu.edu"
  ]
}
```
OR:
```
{
  "statusCode": 400,
  "message": "Can not get recommendations for first double player. ",
  "body": {
    "detail": "carmenanderson@sjsu.edu could not be found in mldata."
  }
}
```

### 18. APi to request recommendations for second doubles opponent:
```localhost:3001/badminton/users/getSecondDoublePlayerRecommendations/shelleyfoster@sjsu.edu/albertmcallister@sjsu.edu/buddyreeder@sjsu.edu```
GET call
Response body:
```
{
  "statusCode": 200,
  "message": "Successfully get recommendations for this user. ",
  "body": [
    "marcellacorzo@sjsu.edu",
    "joanroush@sjsu.edu",
    "charlotteheath@sjsu.edu",
    "mariapierce@sjsu.edu",
    "marycarignan@sjsu.edu",
    "amyham@sjsu.edu",
    "meganmoret@sjsu.edu",
    "emilycarlson@sjsu.edu"
  ]
}
```

OR:
```
{
  "statusCode": 400,
  "message": "Can not get recommendations for second double player. ",
  "body": {
    "detail": "shelleyfoster@sjsu.edu could not be found in mldata."
  }
}
```
### 19. APi for finding one user's inviation:
```localhost:3001/badminton/users/findInvitationRecord/jamesharris@sjsu.edu```
GET call
Response body:
```
{
  "statusCode": 200,
  "message": "Found players list.",
  "body": [
    {
      "_id": "657100ec48b850875c310d66",
      "invitorEmail": "jamesharris@sjsu.edu",
      "inviteeEmail": [
        "test19@hotmail.com"
      ],
      "phoneNumber": "12323434325",
      "gameStartTime": "gameStartTime",
      "gameEndTime": "gameEndTime",
      "address": "address",
      "zipCode": "567568756",
      "createdAt": "2023-12-06T23:17:00.985Z",
      "updatedAt": "2023-12-06T23:17:00.985Z",
      "__v": 0
    },
    {
      "_id": "66072ba6c39b2f33cdd74382",
      "invitorEmail": "jamesharris@sjsu.edu",
      "inviteeEmail": [
        {
          "partner": "shelleyfoster@sjsu.edu"
        },
        {
          "opponent": [
            "cheryldunham@sjsu.edu",
            "albertmcallister@sjsu.edu"
          ]
        }
      ],
      "phoneNumber": "12323434325",
      "gamingDate": "2024-01-03T00:00:00.000Z",
      "gameStartTime": "14:30",
      "gameEndTime": "15:30",
      "address": "address",
      "zipCode": "567568756",
      "createdAt": "2024-03-29T20:59:18.196Z",
      "updatedAt": "2024-03-29T20:59:18.196Z",
      "__v": 0
    }
  ]
}
```

OR:
```
{
  "statusCode": 404,
  "message": "No invitation record found for this user: albertmcallister@sjsu.edu"
}
```


## ML Endpoints
### 1. API to calculate elo changes for doubles games
URL: ```GET localhost:8000/2p```

Uses URL query parameters, as in: ```http://localhost:8000/1p?p1Elo=2000&p2Elo=1000&s1=3&s2=21```

**This is used after a doubles match is reported to calculate the adjustments to the skill ratings of the players in that match.**

*t1p1Elo --> team 1 player 1 original skillRating*

*t1p2Elo --> team 1 player 2 original skillRating*

*t2p1Elo --> team 2 player 1 original skillRating*

*t2p2Elo --> team 2 player 2 original skillRating*

*s1 --> score of team 1*

*s2 --> score of team 2*

*t1p1EloNew --> team 1 player 1 new skillRating*

*t1p2EloNew --> team 1 player 2 new skillRating*

*t2p1EloNew --> team 2 player 1 new skillRating*

*t2p2EloNew --> team 2 player 2 new skillRating*



Request structure:
```
{
    "t1p1Elo": float,
    "t1p2Elo": float,
    "t2p1Elo": float,
    "t2p2Elo": float,
    "s1": integer,
    "s2": integer
}
```

Response structure: 
```
{
    "t1p1EloNew": float,
    "t1p2EloNew": float,
    "t2p1EloNew": float,
    "t2p2EloNew": float
}
```

Response example: 
```
{
    "t1p1EloNew": 1742.8196868608447,
    "t1p2EloNew": 1742.8196868608447,
    "t2p1EloNew": 1256.1803131391553,
    "t2p2EloNew": 1256.1803131391553
}
```

### 2. API to calculate elo changes for singles games
URL: ```GET localhost:8000/1p```

Uses URL query parameters, as in: ```localhost:8000/2p?t1p1Elo=1678.0&t1p2Elo=1678.0&t2p1Elo=1321.0&t2p2Elo=1321.0&s1=21&s2=0```

**This is used after a singles match is reported to calculate the adjustments to the skill ratings of the players in that match.**

*p1Elo --> player 1 original skillRating*

*p2Elo --> player 2 original skillRating*

*s1 --> score of player 1*

*s2 --> score of player 2*

*p1EloNew --> player 1 new skillRating*

*p2EloNew --> player 2 new skillRating*

Request structure:
```
{
    "p1Elo": float,
    "p2Elo": float,
    "s1": integer,
    "s2": integer
}
```

Response structure: 
```
{
    "p1EloNew": float,
    "p2EloNew": float,
}
```

Response example: 
```
{
    "p1EloNew": 1742.8196868608447,
    "p2EloNew": 1742.8196868608447
}
```

### 3. API to request the training of a user's preference model
URL: ```GET localhost:8000/trainml```

Uses URL query parameters, as in: ```localhost:8000/trainml?userEmail=bruceoconnor@sjsu.edu```

Request structure:
```
{
    "userEmail": string
}
```
Request exmaple:
```
{
    "userEmail": "bruceoconnor@sjsu.edu"
}
```
Response example:
```
"[SUCCESS] model training completed for bruceoconnor@sjsu.edu."
```

### 4. API to request recommendations for partners or singles opponents
URL : ```GET localhost:8000/recSingles```

Uses URL query parameters, as in: ```localhost:8000/recsingles?userEmail=bruceoconnor@sjsu.edu```

Parameters:

- userEmail

Response: 

- array of 8 other user emails as recommendations

### 5. API to request first doubles opponent
URL : ```GET localhost:8000/recDoubles1```

Uses URL query parameters, as in: ```localhost:8000/recdoubles1?userEmail=bruceoconnor@sjsu.edu&partnerEmail=buddyreeder@sjsu.edu```

Parameters:

- userEmail
- partnerEmail

Response: 

- array of 8 other user emails as recommendations

### 6. API to request second doubles opponent
URL : ```GET localhost:8000/recDoubles2```

Uses URL query parameters, as in: ```localhost:8000/recdoubles2?userEmail=bruceoconnor@sjsu.edu&partnerEmail=buddyreeder@sjsu.edu&oppEmail=charlottepayne@sjsu.edu```

Parameters:

- userEmail
- partnerEmail
- oppEmail

Response: 

- array of 8 other user emails as recommendations
