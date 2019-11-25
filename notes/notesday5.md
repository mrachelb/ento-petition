_UPDATING & DELETING_

need to change the user profile's table

POST route from the 'update' is more complicated because the data goes to two different tables
there are 2 different queries, and we have to pick one.
when we render the form, we will fill in the data, except the password

if they write something in the password, we have to hash the password.

we have to do a whole different query for dealing with the user's profile.  
we don't know if we have to do an update, or insert.

e.g.
CREATE TABLE users (
first VARCHAR NOT NULL CHECK (first <> '')
)

for deleting the signature

<form method='POST' action="/signature/delete">
<input name "csrf" type="hidden">
<button>Delete signature</button>
</form>
