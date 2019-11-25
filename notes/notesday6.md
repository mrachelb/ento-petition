_Auth Flow_

registration(no cookie) ||
login(no cookie)

profile(cookie = userid)
petition (cookie = userid)
thanks (cookie = signatureID)
edit (cookie = userid)
signers (cookie = userid)

// ------------------these routes are for the supertest demo only

// app.post("/welcome", (req, res) => {
// // so the sole purpose of this route is to see how to write a unit test that will confirm that a certain cookie has been set!
// req.session.submitted = true;
// });
// 3 main properties of res that we'll be interested in are:
//
// 1. text. text gives us the BODY of the response!
// -- text gives us the BODY of the response!
//
// 2. headers.
// -- gives us the headers that were sent as part of response
//
// 3. statusCode.
// -- gives us status code of response

// ------------------ end supertest demo routes
