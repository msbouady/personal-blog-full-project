# PERSONNAL BLOG

This is a personal blog built with Node.js. It includes all the features of a complete blog, such as user registration, post creation, commenting, and more.

## Features

- **Create, Edit, and Delete Posts**
- **Comment on Posts**
- **Like and Dislike Comment**
- **Like and Dislike Posts**
- **Responsive Design**

## Tech Stack

- **Backend: Node.js, Express**
- **Frontend: HTML, CSS, JavaScript, EJS (Embedded JavaScript Templates)**
- **Database: PostgreSQL**
- **Authentication: Passport.js**
- **Other: Bcrypt for password hashing, Nodemailer for email notifications, session for session save**

## Prerequisites

Before you begin, ensure you have met the following requirements:
- You have installed Node.js and npm.
- You have a running PostgreSQL database.

## Installation

To install the project dependencies, follow these steps:

1. Clone the repository:
    ```sh
    git clone https://github.com/msbouady/personal-blog-full-project.git
    cd personal-blog-full-project
    ```

2. Install the dependencies:
    ```sh
    npm i
    ```

3. Create a `.env` file in the root directory of your project and add your PostgreSQL credentials and desired port:
    ```env
GOOGLE_CLIENT_ID= your_key_id
GOOGLE_CLIENT_SECRET=your_client_secret
SESSION_SECRET=your_session_secret
PG_USER=pg_name
PG_HOST=pg_localhost
PG_DATABASE=_pgname_
PG_PASSWORD="_pgpassword_
PG_PORT=_pgport_
EMAIL_HOST=your-email-host
EMAIL_PORT=your-email-port
EMAIL_USER=your-email-user
EMAIL_PASS=your-email-password
    ```

4. Set up the database:
    ```sh
    npx sequelize-cli db:migrate
    npx sequelize-cli db:seed:all
    ```
## Usage

Start the application, run:
```sh
node app.js
```
## Licence

This project is free
