const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

//PORT 
const PORT = 3000;

//Middleware
app.use(cors());

app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', require('./routes/route'));

app.listen(PORT, () => {
    console.log('Listening at PORT: ' + PORT);
})

