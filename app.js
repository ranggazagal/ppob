const express = require('express');
const cors = require('cors')


const app = express();
app.use(cors())
const port = 3000;

const vehcType = require('./routes/vehctype_routes');
const vehicle = require('./routes/vehicle_routes');
const transaction = require('./routes/transaction_routes');

const db = require('./model');
db.sequelize.sync();


app.get('/', (req, res) => {
    res.send('Started Working, Express!');
});

app.use('/api/vehctype', vehcType);
app.use('/api/vehicle', vehicle);
app.use('/api/transaction', transaction);

app.use(function (req, res, next) {
    // Pass to next layer of middleware
    next();
});
app.listen(port, () => {
    console.log(`Server listening at port: ${port}`);
});