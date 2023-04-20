# AngularStore

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 14.2.1.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Node Server to Generate Stripe Session

CD into /server by running `cd server`
Run `npm install` to install server packages
In a .env file add a SECRET_KEY and a DATABASE_URL parameter corresponding to the Stripe secret key, and MySQL URL respectively
Run `npm run seed` command to generate a table called "Products" containing fakestoreapi.com product data
Run the server with `node server.js` command or `npm run dev` command to run it using Nodemon if installed globally

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.
