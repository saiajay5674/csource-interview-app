const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();

mongoose.connect('mongodb://localhost:27017/csource', {useNewUrlParser: true});

mongoose.connection.on('connected', () => {
    console.log('Connected to database');
})

mongoose.connection.on('error', (error) => {
    if(error){
        console.log('Error connecting to database: ' + error);
    }
});

//PORT 
const PORT = 3000;

//Middleware
app.use(cors());

app.use(bodyparser.urlencoded({
    extended: true
}));
app.use(bodyparser.json());

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/careerfair', require('./routes/careerfair.router'));

app.listen(PORT, () => {
    console.log('Listening at PORT: ' + PORT);
})

