//spicedPg setup
const spicedPg = require("spiced-pg");

var db = spicedPg("postgres:postgres:postgres@localhost:5432/salt-petition");
//5432 is the port we listen to database connection
const db = require("./utils/db");
console.log("db: ", db);

app.use(express.static("./public"));

//database query
module.exports.addCity = function addCity(cityFromUser, countryFromUser) {
    db.query(
        `
			  INSERT INTO cities (city, country)
				VALUES ($1, $2);
			`,
        [cityFromUser, countryFromUser]
        //any arg passed to the function must be passed to the array
    );
};

// SQL INJECTION

addCity("Berlin", "DE");
