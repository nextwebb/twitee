# twitee
<https://twitee.herokuapp.com/>
Twitee is a mini and substandard runoff of Twitter. Users register and login and can put up anything that crosses their mind. The whole world can view their twits and comment on their twits /and like them. We want you to build this project using NodeJS as your backend tool.

## DETAILED DESIGN 
  

- Each user should have an account detail containing their name, email, password and date_created
- Your app should have just 3 routes: login route, register route, post/posts route
- Every authenticated user can comment or like every post that is posted.
- Only the user that owns a post can delete that particular post.
- Users can log out and get redirected to the login route
- Unauthenticated users cannot interface with the app.


  1.In short, a feature list of the app will be  
  2.User registration and authentication  
  3.User Log in  
  4.User POST twit  
  5.User DELETE twit (if owned by user)  
  6.User POST comments under twits  
  7.Post page shows all posted twits and comments under twits
  8.User log out  

  ## Comments on tweets

Returns all comments.

`GET`  <https://twitee.herokuapp.com/api/v1/comments/all/:authorId>
****
Add comments from the client

`POST`  <https://twitee.herokuapp.com/v1/comments/add>
  Sample comment data
`{
"authorId": "121213123",
 "guestComment":"hello man. nice post",
 "guestId":"2132431432"
 }`
****
