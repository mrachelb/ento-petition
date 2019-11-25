const supertest = require("supertest");

const { app } = require("./index");

// we mock the npm packages that we have to use but did not create ourselves!

// so here we're requiring the FAKE cookie-session -- the one that lives in the "__mocks__" directory.
const cookieSession = require("cookie-session");

test("GET /home with no cookies causes me to be redirected", () => {
    return supertest(app)
        .get("/home")
        .then(res => {
            //I want to check if I'm actually being redirected!
            //1. 302
            //2. header called "location"
            console.log("location header: ", res.headers.location);
            expect(res.statusCode).toBe(302);
            expect(res.headers.location).toBe("/registration");
        });
});

test("GET /home returns an h1 as response", () => {
    return supertest(app)
        .get("/home")
        .then(res => {
            // console.log("res: ", res);
            // 'res' represents the response I'm getting from the server
            console.log("headers: ", res.headers);
            expect(res.statusCode).toBe(200);
            expect(res.text).toBe("<h1>home</h1");
            expect(res.headers["content-type"]).toContain("text/html");
        });
});

test.only('GET /home request sends h1 as response when "whatever" cookie is sent!', () => {
    //this is the function we need to invoke to create
    //a fake cookie (ie req.session)
    cookieSession.mockSessionOnce({
        whatever: true
    });
    // so now when we use supertest to make our request to the server, the fake cookie will automatically be sent along with the request (without us explicitly telling it to do so)
    return supertest(app)
        .get("/home")
        .then(res => {
            console.log("body of the res!", res.text);
        });
});

test('POST /welcome should set "submitted" cookie', () => {
    //we will need to work with mockSessionOnce if we want to:
    //(1) send a test / dummy cookie as part of the REQUEST we make the server;
    //(2) if we need to see the cookie we receive as part of the response. In other words, if we need to check that a cookie has been set, then we'll need mockSession / mockSessionOnce
    //send over an empty cookie as part of the REQUEST I make
    //so that server has an empty cookie to put data into.
    //in this case, "data" refers to { submitted: true}
    const emptyCookie = {};
    cookieSession.mockSessionOnce(emptyCookie);

    //next step is to use supertest to make POST REQUEST
    return supertest(app)
        .post("/welcome")
        .then(res => {
            console.log("obj: ", emptyCookie);

            //emptyCookie is the cookie that my server wrote data to.
        });
});
