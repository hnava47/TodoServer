const express = require('express');

const {todos, uuid} = require('./db/todos');

// Node environment variables - sensitive information you never push to production
// References .env file within same folder structure. Add .env to .gitignore
const PORT = process.env.PORT || 3001;
const app = express();

// Sends all files within public folder
// Looks for index.html and renders
app.use(express.static('public'));

// Body parser
// It takes information that the client is sending from a "form" or "post" request
// and attach the data into req.body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// create a middleware to make "req.hector" exist in every route
// 1st parameter to app.use is what routes do I want the middleware to be active for. '/' is default
// a middleware is a function that intercepts the incoming request,
// form there, we can validate data, check if a user is logged in, validate data being sent
// modify the request, respond early in case users do something stupid
// app.use((req, res, next) => {
//     req.hector = 'Hector';

//     // Needs to be called or response won't be sent
//     next();
// });

// Require post body
const checkBodyForText = (req, res, next) => {
    // Optional chaining javascript. Don't run if req.body doesn't exist
    if (req.body?.text.length === 0) {
        return res.status(401).json({error: 'You must pass text to create a todo'});
    } else {
        next();
    }
};


app.get('/api/todos', (req, res) => {
    // req is an object that contains information about the incoming request
    console.log(req.method);

    res.json(todos);
});

// When someone makes a POST request to /api/todos, call this function
app.post('/api/todos', checkBodyForText, (req, res) => {
    // Does not exist without lines 11 and 12
    console.log(req.body);
    const newTodo = {
        text: req.body.text,
        id: uuid()
    };

    todos.push(newTodo);

    res.json(newTodo);
});

// Displays console log once server has started
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

// Run server with:
// node server.js
// node server
// npm start

// Exit server with control + C

// sudo npm i -g nodemon
