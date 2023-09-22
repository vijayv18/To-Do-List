# Todolist-nodejs-mongo-cyclic
To-do-list made using Nodejs-MongoDB and deployed using Cyclic

## Clone the project

```bash
  git clone https://github.com/vijayv18/Todolist-nodejs-mongo-cyclic
```

Go to the project directory

```bash
  cd Todolist-nodejs-mongo-cyclic
```

## Installation of dependencies

Install "Todolist-nodejs-mongo-cyclic" with npm

```bash
  cd Todolist-nodejs-mongo-cyclic
  npm install 
```
This will install all the required dependencies for the project to run,    
## Environment Variables

To run this project, you will need to add the following environment variables to your `.env` file
 

`MONGO-URI`- can be obtained by visiting mongodb atlas and creating your own database connection link. Check this out - https://www.mongodb.com/atlas/database

`PORT`- 3000

### Create a `.env` file on the root directory and add 

`MONGO-URI`= Paste the created database link and make sure to check if username and password is added

`PORT`=3000

## Run the project

To run tests, run the following command

```bash
  node app.js
```

And go to `localhost:3000` on your browser to check if the project is working.

You can also have lists for specific part of your lives.

For eg, type `localhost:3000/work` or `localhost:3000/home`

And now you can organize your tasks according to your own lists.
