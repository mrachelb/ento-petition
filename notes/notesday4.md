_JOIN tables_

SELECT songs.name AS song_name, singers.name AS singer_name
FROM singers
JOIN songs
ON singers.id = songs.singer_id;

(songs.name is specifying which table I want to get the name from)

_INNER JOIN_ only gives you rows where both of the tables are involved.
if you want to garantee that you do something with both table you do _OUTER JOIN_ / FULL JOIN

SELECT songs.name AS song_name, singers.name AS singer_name
FROM singers
FULL JOIN songs
ON singers.id = songs.singer_id;

_OR_

SELECT songs.name AS song_name, singers.name AS singer_name
FROM singers
LEFT JOIN songs
ON singers.id = songs.singer_id;

If there is no data on, that it shows as null.

_OR_

SELECT songs.name AS song_name, singers.name AS singer_name
FROM singers
LEFT JOIN songs
ON albums.singers.id = songs.singer_id;

---

Change the initial query, we want a LEFT JOIN!! add in that we want the id from the signatures.
Both tables have an id column. SIGNATURE.id 'AS'
Even before we check the password.

We can now change signature table so that it no longer has a first and last name. We were only doing that for convinience.
Now we can JOIN the signatures table, and get get the first, and last name from users table. This makes it much easier.

We need a new route for part IV.
When the user clicks continue, we can do INSERT, or SKIP it.

After they click continue, we send them to the petition.

CREATE TABLE user_profiles(
id SERIAL PRIMARY KEY,
city VARCHAR,
age INT,
url VARCHAR
userid INTEGER NOT NULL REFERENCES(users.id) UNIQUE
);

-   we need a new route

        app.get('/signers/:city', (req, res) => {
        const city = req.params.city;

            			db.getSignersByCity(city).then()

    //the query is exactly the same, except there's a WHERE clause
    })

        WHERE LOWER(city) = LOWER($1);

        		http://
        		https://
        		//

        		the safest thing to do is to prepend. The easiest time to do, is when the submit the form. You can handle it but throwing the url out, or by prepending http://

        				make a link to a new route.
        				the other changes,

---

_VULNERABILITIES_

Trying to avoid vulnerabilities.

SQL INJECTIONS work, is user input, can go to what is malicious craft. It can from data to actual code.
When you concatinate to a string of SQL, that's the problem.
If a eval was ever introduced.

var a = 10;
eval('a = 20');

console.log(a);

json.parse came because using eval to convert JS is extremely dangerous.

setTimeout() -> in node is fine, but not in browsers.

setTimeout("alert")

X-FRAME-OPTIONS

res.setHeader('X-FRAME-OPTIONS', 'DENY')
const express = require('express');
const app = express()

app.use((req, res, next) {
res.setHeader('X-FRAME-OPTIONS', 'DENY');
next();
});
