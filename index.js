
require('mongoose').connect('mongodb://localhost/chatApp')
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const port = 4000;
const message = require('./routes/message');
const vendor = require('./routes/vendor')
const customer = require('./routes/customer')
const cors = require('cors');

app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}));
app.get('/sw.js', (req, res) =>{
    res.header('content-type', 'text/javascript');
    res.sendFile('./sw.js');
})

app.use('/vendor', vendor);
app.use('/message', message);
app.use('/customer', customer);

app.use('/**', (err, req, res, next) => {
    //last defender of errors
    res.json(err.toString());
})
   
app.listen(port, () => {
    console.log(`chat app is running on port ${port}`);
})

module.exports = app;