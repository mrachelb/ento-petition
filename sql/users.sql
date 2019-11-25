DROP TABLE IF EXISTS users;

CREATE TABLE users (
	  id SERIAL PRIMARY KEY,
		first VARCHAR(255) NOT NULL,
		last VARCHAR(255) NOT NULL,
		email VARCHAR(255) NOT NULL UNIQUE,
		password VARCHAR(255) NOT NULL,
		create_at TIMESTAMP DEFAULT
		CURRENT_TIMESTAMP
);


-- we need to stor id in the cookies

--we're going to do HASHING to store passwords
-- md5, sha1 - never ever ever use these to store passwords!!!!
-- bcrypt  is good!! aand common e.g Twitter and GitHub use it.

-- //signatureId: 2 corresponds with ID from signatures -- not userid!!

-- {
--
-- signatureid: 2;
-- userId: 3;
-- }
