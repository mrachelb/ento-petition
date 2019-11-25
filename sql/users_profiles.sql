DROP TABLE IF EXISTS users_profiles;

CREATE TABLE users_profiles (
	  id SERIAL PRIMARY KEY,
		city VARCHAR(255),
		age INTEGER,
		url VARCHAR(255),
		userid INTEGER NOT NULL REFERENCES users(id) ON DELETE CASCADE,
		UNIQUE(userid)
);



-- we need to store id in the cookies
