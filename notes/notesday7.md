_index.js class example_

---

const redis = require("./redis");
app.get("/redis-fun", (req, res) => {
// if the value you're setting in redis is an OBJECT or an ARRAY, you gotta JSON.stringify it!
redis
.setex(
"cute-puppies",
120,
JSON.stringify({
name: "layla",
age: 9,
cutenessScore: 10000000
})
)
.then(() => {
// the code I write will run AFTER setex has completed (so after the 'cute-puppies'
//propoerty has been set or placed in Redis)
res.send("<h1>Your cute puppy has been cached!</h1>");
})
.catch(err => {
console.log("err in SETEX ", err);
});
});

app.get("/get-cute-puppies", (req, res) => {
redis
.get("cute-puppies")
.then(resp => {
console.log("resp from redis GET: ", JSON.parse(resp));
res.send(`<h1>cutest pupy is: ${JSON.parse(resp).name}</h1>`);
})
.catch(err => {
console.log("get cute puppies error: ", err);
});
});

app.get("/delete-cute-puppies", (req, res) => {
redis
.del("cute-puppies")
.then(() => {
//will run when cute-puppies has been deleted from redis
res.send("cute puppies gone from redis: (");
})
.catch(err => {
console.log("err in redis DEL ", err);
});
});

**********************\_\_\_**********************--
