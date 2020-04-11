# Persistent-To-Do-App-2

:pencil::star2: A web application that keep's track of a specific user's to-do list even after refreshing the page or making changes to the list. 

---

## Hosted on Heroku
This project is hosted on Heroku at [Persistent-To-Do-App](https://crud-persistent-todo2.herokuapp.com)

---

## Want to run the code instead?
#### Install Instructions

1. Clone this Repository:
    `git clone` this repo into a local directory using your *Terminal*.
    - For ssh key: `git@github.com:sdhani/Persistent-To-Do-App-2.git` 
    - For https: `https://github.com/sdhani/Persistent-To-Do-App-2.git`

1. Install project dependencies
    ```
    cd Persistent-To-Do-App-2
    npm install
    ```
1. Run program (in root directory)
    - Run start script `npm start`
    - Run with nodemon `nodemon app.js` or `npm run dev`

1. Go to `localhost:3000` in your browser to interact with the program!

---

## Entity Relationship Diagrams

### users
|    Key    |    Column     |    Type    |
|    :---:    |    :---:     |    :---:     |
| PK  | id | serial | 
|   | username | text not null |



### todo
|    Key    |    Column     |    Type    |
|    :---:    |    :---:     |    :---:     |
| PK  | id | serial | 
|   | content | text not null | 
|   | completed | boolean not null default false | 
|   | deleted | boolean not null default false | 
|  FK | user_id | integer references id in users | 


---

# Interacting with Existing Data:
1. Hit this endpoint to see existing users in the PostgreSQL database.
`https://crud-persistent-todo2.herokuapp.com/users`
1. Login as BUBBLES for a test spin, or create a new user :sparkles:.
