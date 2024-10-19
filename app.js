const express = require('express');
const cors = require('cors')

require('dotenv').config();

const app = express();
app.use(cors())
const port = process.env.PORT || 3000;
const bodyParser = require('body-parser')
const jsonParser = bodyParser.json()

const registration = require('./routes/registration_routes');
const responseSender = require('./middleware/responseSender');

// const db = require('./model');
// db.sequelize.sync();

app.get('/', (req, res) => {
    res.send('Started Working, Express!');
});

app.use('/registration', jsonParser, registration);
app.use(responseSender)

app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});