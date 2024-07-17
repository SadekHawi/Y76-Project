# Y76-Project

How to Build and Run the Project
Install Dependencies:
npm install

Build the Project:
npm run build

Database Setup:
Ensure PostgreSQL is installed and running.
Create a database and note down the connection URL.
Update your knex.file file with the database connection:

DATABASE_URL=your_postgresql_connection_url
Run Migrations:

Use Knex.js or your preferred migration tool to run database migrations:
npm run migrate:dev

Seed the Database:
If you have seed data to populate the database, run the seeding script:
npm run seed:dev

Start the Server:
npm run start:dev

You can access the deployed application at:
https://y76-project.onrender.com
https://y76-project.onrender.com/api-docs/#/
