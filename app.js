const express = require('express');
const cors = require('cors')

require('dotenv').config();

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const membership = require('./routes/membership_routes');
const information = require('./routes/information_routes');
const transaction = require('./routes/transaction_routes');
const responseSender = require('./middleware/responseSender');

// const db = require('./model');
// db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Started Working, Express!');
});

app.use('/', jsonParser, membership);
app.use('/', jsonParser, information);
app.use('/', jsonParser, transaction);
app.use(responseSender)

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});