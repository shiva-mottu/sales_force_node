const express = require('express')
const app = express()
const cors = require('cors')
const bodyParser = require('body-parser')
const PORT = process.env.PORT || 5000;
let path = require('path');
app.use(express.json());
app.use(bodyParser.urlencoded({limit: '50mb', extended: true }));
app.use(bodyParser.json({limit: '50mb', extended: true})); 

app.use(cors());
require("dotenv").config()

//Import routes 
const authRoute = require('./routes/auth')

//Route middlewares 
app.use('/api/user', authRoute)

app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log("The server is started on port :" + PORT);
});

app.get('/', (req, res) => {
    res.send("Server is Running, You can call the API's..")
});
