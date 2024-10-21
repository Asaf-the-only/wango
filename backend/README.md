# Parking Management System Database Setup

This README provides the SQL commands required to set up the database for a parking management system. The system allows users to register, log in, and manage their parking activities across multiple cities and parking areas. The setup includes creating necessary tables and inserting some sample data.

## 1. Database Schema

### Users Table

This table stores user information such as email, full name, address, and car plate number.

```sql
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    car_plate_number VARCHAR(50) NOT NULL
);
```

### Cities Table

This table holds city information where parking areas are available.

```sql
CREATE TABLE cities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```

### Parking Areas Table

This table contains different parking areas associated with cities.

```sql
CREATE TABLE parking_areas (
    id SERIAL PRIMARY KEY,
    city_id INT REFERENCES cities(id),
    name VARCHAR(255) NOT NULL
);
```

### Parkings Table

This table records the parking sessions for each user, including start and end times, location, and the calculated price.

```sql
CREATE TABLE parkings (
    id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(id),
    city_id INT REFERENCES cities(id),
    parking_area_id INT REFERENCES parking_areas(id),
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP,
    price NUMERIC
);
```

---

## 2. Sample Data

### Inserting Cities

This section inserts some sample cities into the `cities` table.

```sql
INSERT INTO cities (id, name) VALUES 
(1, 'New York City'),
(2, 'Washington'),
(3, 'Los Angeles');
```

### Inserting Parking Areas

Next, we'll insert parking areas associated with the cities.

```sql
INSERT INTO parking_areas (city_id, name) VALUES 
(1, 'Brooklyn'),
(1, 'Manhattan'),
(2, 'Capitol Hill'),
(3, 'Hollywood');
```

---

## 3. Usage

1. **Create Tables**: Run the provided SQL `CREATE TABLE` commands to set up the database structure.
2. **Insert Data**: Execute the `INSERT INTO` commands to populate the `cities` and `parking_areas` tables with sample data.
3. **Extend the Data**: You can extend the sample data by adding more cities, users, parking areas, and parking sessions as needed.

This database schema is flexible and can be adapted to support additional features such as parking price calculations, different parking zones, and more.

---

This concludes the setup for the parking management system database.
