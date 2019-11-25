--now we're going to set up the table we'll need for parts 1 and 2
DROP TABLE IF EXISTS signatures;
CREATE TABLE signatures (
	  id SERIAL PRIMARY KEY,
		first VARCHAR(255) NOT NULL,
		last VARCHAR(255) NOT NULL,
		signature TEXT NOT NULL
);

-- what we've done so far:
-- created our database for the project
-- created the table we'll need for parts 1 and 2

-- how do we interact with our table in our code? So how do I tell my express server to talk to my table
