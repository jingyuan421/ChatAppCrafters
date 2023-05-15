var express = require('express');
var app = express();
var port = 3000;

app.set('port', port);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const chatHistory = [];
const usernames = [];

// Add headers
app.use(function (req, res, next) {
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader(
        'Access-Control-Allow-Methods',
        'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.header(
        'Access-Control-Allow-Headers',
        'Origin, X-Requested-With, Content-Type, Accept'
    );

    // Pass to next layer of middleware
    next();
});

// test
app.get('/', function (req, res, next) {
    res.json({ message: 'hsg chat-app api works...' });
});

// history
app.get('/history', function (req, res, next) {
    res.send(chatHistory);
});

app.post('/history', function (req, res, next) {
    const chatMessage = req.body?.message?.toString();
    const username = req.body?.username?.toString();

    if (!chatMessage) {
        res.status(400).send('Message is missing.');
        return;
    }

    if (!username) {
        res.status(400).send('Username is missing.');
        return;
    }

    const date = new Date();
    const message = {
        id: chatHistory.length + 1,
        message: chatMessage,
        username: username,
        createdAt: date,
    };

    chatHistory.push(message);

    res.json(chatHistory);
});

// usernames
app.get('/usernames', function (req, res, next) {
    res.send(usernames);
});

app.get('/usernames/:id', function (req, res, next) {
    const id = +req.params.id;
    const username = usernames.find((e) => e.id === id);

    if (!username) {
        res.status(404).send('Username not found.');
        return;
    }

    res.send(username);
});

app.post('/usernames', function (req, res, next) {
    const userName = req.body?.username?.toString();

    if (!userName) {
        res.status(400).send('Username is missing.');
        return;
    }

    if (!isUsernameUnique(userName)) {
        res.status(409).send(`Username ${userName} already exists.`);
        return;
    }

    const date = new Date();
    const username = {
        id: usernames.length + 1,
        username: userName,
        createdAt: date,
    };

    usernames.push(username);

    res.json(usernames);
});

app.delete('/usernames/:id', function (req, res, next) {
    const id = +req.params.id;
    const username = usernames.find((e) => e.id === id);

    if (!username) {
        res.status(404).send('Username not found.');
        return;
    }

    const index = usernames.findIndex((e) => e.id === id);

    if (index < 0) {
        res.status(404).send('Username id not found.');
        return;
    }

    usernames.splice(index, 1);

    res.send('Username deleted.');
});

function isUsernameUnique(username) {
    return !usernames?.some((e) => e.username === username);
}


app.listen(app.get('port'), function () {
  console.log('Node app is running on port', app.get('port'));
});