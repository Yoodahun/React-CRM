const express = require('express')
const bodyParser = require('body-parser');
const fs = require('fs'); //file read
const data = fs.readFileSync('./database.json'); //read .database.json
const conf = JSON.parse(data);

const path = require('path')
// Create the server
const app = express()
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Anything that doesn't match the above, send back index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'))
})

const mysql = require('mysql');
const connection = mysql.createConnection({
  host: conf.HOST,
  user: conf.USER,
  password: conf.PASSWORD,
  port: conf.PORT,
  database: conf.DATABASE_NAME
});
connection.connect();



app.get('/api/customers', (req, res) => {
  connection.query(
    "SELECT * FROM CUSTOMER",
    (err, rows, fields) => {
      res.send(rows);
    }
  );
});

// Choose the port and start the server
const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`Mixing it up on port ${PORT}`)
})
