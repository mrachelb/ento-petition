Next steps for petition part 1:

1. create the templates you need for petition, thank-you page, and signers page.
   a. make it so the user can navigate to:

-   the /petition route and see the petition template;
-   the /petition/signed route to see the thank-you template;
-   and the /petition/signers to see the signers template

2. server routes we'll need:

a. GET /petition

-   renders petition template (the one with input fields and the canvas element)

b. POST /petition

-   runs when the user enters a first name, last name, and signs the canvas element, and then clicks the "submit" button
    notes during class:
    //POST route, because the query is modifying the database
    this example is not 100% what you will have to do in this project.
    In the project, the values you insert into a database will come from values the user enters in an input field.
    We will have to figure how to get access to those values in our server!
    c. GET /petition/signed

-   renders the thank-you template. That's it!

d. GET /petition/signers

-   renders the signers template

3. handlebars templates etc that we'll need:

-   petition template (that's the one with the input fields and canvas)
    -   <form> tag  <input> for first name, <input> for last name, <input> signature, and canvas.
          - we will need front-end JS code to: (1) allowed user to MOUSEDOWN on canvas: (2) allow users to MOUSEMOVE on canvas, and draw a line as user mouse moves, and (3) allow user to MOUSEUP to stop drawing on the canvas.
        			- what's up with the hidden input field??? when the user signs the petition, we need to convert the canvas drawing into a url that can be inserted into our table. That url should be assigned as the value of the hidden input field when the user finishes signing the petition.
        			  - We do this so that when the "submit" button is clicked and the POST request is made, the values of the first, last, and hidden input fields are sent to the server.
    -   we need a <form> tag because form tags will make POST requests to our servers when the user clicks the "submit" button
-   thank-you template (that's the one that just says, "Thanks for signing!" along with the # of signers, and a link to the signers page)
-   signers template (that's the one that lists everyone who's signed the petition so far)
-   layout (our link to CSS, front-end JS will go here)
-   (optional) partials for things like navigation bars

4. queries we'll need:

-   INSERT INTO signatures
    -   should be invoked when the user signs the petition (so the user gives us their first, last, and signature)
-   SELECT the names of the signers
    -   this query should run when the user goes to the /petition/signers page
-   (optional) SELECT query to get the number of signers
    -this query should run when the user goes to the /petition/signed page (the "Thank-you" page)
