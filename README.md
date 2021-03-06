#Chat Application

## front end

### Requisite

- nodejs

- angular (`npm i -g @angular/cli`)

### Running the project

- `npm install`

- `ng serve`
 
Goto `http://localhost:4200/` on your browser

## Backend Server port `4000`

### Requisite

- nodejs

- mongodb(`mongod`)


### Running the project

- start a mongodb instance

- `npm install`

- `node index.js`

### API Endpoints 

#### vendor

 - *GET* /vendor
    lists all the vendors on the platform

 - *POST* /vendor
    creates a new vendor in the database

    *body* 
    ```js
    {
        fullname : String, required,
        password : String, required,
        email : String, email, required        
    }
    ```

- *POST* /vendor/login
    logs in a vendor to the app
    *body* 
    ```js
    {
        password : String, required,
        email : String, email, required        
    }
    ```

#### customer

 - *GET* /customer
    lists all the customer on the platform

 - *POST* /customer
    creates a new customer in the database

    *body* 
    ```js
    {
        fullname : String, required,
        password : String, required,
        email : String, email, required        
    }
    ```

- *POST* /customer/login
    logs in a customer to the app
    *body* 
    ```js
    {
        password : String, required,
        email : String, email, required        
    }
    ```

#### message

uses JWT to differentiate between visitor and user. if no JWT is present, a visitor is initialized

 - *GET* /message/:session
    gets all message for a given message session

 - *POST* /message
    creates a new message session

 - *POST* /message/:session
    append message to messages under a message session
    *body* 
    ```js
    {
        sender : String, required,
        sender_id : String, required,
        recipient : String, required,
        recipient_id : String, required,
        info : String, required
    }
    ```

## Test

`mocha`