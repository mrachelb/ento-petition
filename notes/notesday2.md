Data Flow

Back end and Front end

POST request
browser makes the post request to the server:
a) to modify data and when we want to modify data from the front to the back.
b) then the server is going to communicate with the database
c) once the database communicates back that everything is ok, it sends a response back ('thank you or whatever')

we need to be able to know whose signature belong to which user. Therefore, we use cookies to store values.
we can put something into the cookie that says 'yes, the user has signed the petition'

table: id/first_name/last_name/signature

we cannot put the signature in the cookie because the signature is too big.
if you put too much data in the cookie, it could break the website. Instead, we will store just the id in the cookie, and not the signature. The signature will be stored in the signature. (middleware)

a. we are going to put a reference id to the cookie.
b. cookie parser has not security on it.

first cookie
{
signatureID: 1
}

second cookie (encrypted)
{
;alsdjflksdjf;alk:
'aslkdhflsakjdf'
}

the server is going to compare. the middleware is going to decrypt, nand the second cookie will provide another layer of security.

We are going to use cookieSession!

\*var cookieSession = require('cookie-session');

app.use(cookieSession({
secret: `I'm always angry.`,
maxAge: 1000 _ 60 _ 60 _ 24 _ 14
}));\*

next steps for part 2

1. set up the cookie-session middleware
2. change to the POST `/petition` route that was created in part 1 to now put the id of the signature in the cookie.

-   you should be able to console.log(req.session) and see the id of the signature that was just made

3. change the GET `/petition/signed` route (the "thank you" route) to get the user's signature from the database and render it onscreen

-   to render that signature on screen, you will have to take the signature url and put it in an `<img>` tag.

4. add a /logout route. The /logout route will log the user out by deleting the cookie (req.session = null)
