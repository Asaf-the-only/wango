-- Create tables
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  full_name VARCHAR(255) NOT NULL,
  address VARCHAR(255) NOT NULL,
  car_plate_number VARCHAR(50) NOT NULL
);

CREATE TABLE cities (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL
);

CREATE TABLE parking_areas (
  id SERIAL PRIMARY KEY,
  city_id INT REFERENCES cities(id),
  name VARCHAR(255) NOT NULL
);

CREATE TABLE parkings (
  id SERIAL PRIMARY KEY,
  user_id INT REFERENCES users(id),
  city_id INT REFERENCES cities(id),
  parking_area_id INT REFERENCES parking_areas(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP,
  price NUMERIC
);

-- Insert data
INSERT INTO cities (id, name) VALUES (1, 'New York City');
INSERT INTO cities (id, name) VALUES (2, 'Washington');
INSERT INTO cities (id, name) VALUES (3, 'Los Angeles');

INSERT INTO parking_areas (city_id, name) VALUES (1, 'Brooklyn');
INSERT INTO parking_areas (city_id, name) VALUES (1, 'Manhattan');
INSERT INTO parking_areas (city_id, name) VALUES (2, 'Capitol Hill');
INSERT INTO parking_areas (city_id, name) VALUES (3, 'Hollywood');

