const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); //file read
const data = fs.readFileSync('./database.json'); //read .database.json
const conf = JSON.parse(data);

const path = require('path');
// Create the server
const app = express();
// Serve static files from the React frontend app
app.use(express.static(path.join(__dirname, 'client/build')));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

// Anything that doesn't match the above, send back index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

const mysql = require('mysql');
const connection = mysql.createConnection({
    host: conf.HOST,
    user: conf.USER,
    password: conf.PASSWORD,
    port: conf.PORT,
    database: conf.DATABASE_NAME
});
connection.connect();
// for uplaod image
const multer = require('multer');
const storage = multer.diskStorage({
    destination: './upload'
});
const upload = multer({storage});
// for uplaod image

app.get('/api/customers', (req, res) => {
    connection.query(
        "SELECT * FROM CUSTOMER",
        (err, rows, fields) => {
            res.send(rows);
        }
    );
});

app.use('/image', express.static('./upload')); //image라는 경로로 접근하면, upload라는 경로를 보여줌

app.post('/api/customers', upload.single('image'), (req, res) => {
    console.log(req.file);
    let sql = "INSERT INTO CUSTOMER VALUES (null, ?, ?, ?, ?, ?)"; //sql insert
    let image = '/image/' + req.file.filename; // image. 이미지 경로에 있는 해당 파일 이름으로 접근할 것임. 문자열 형태로. multer가 알아서해줌.
    let name = req.body.name;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    let params = [image, name, birthday, gender, job]; //sql parameter
    console.log(image);
    connection.query(sql, params,
        (err, rows, fields) => {
            res.send(rows);
         }
        );

});


// Choose the port and start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Mixing it up on port ${PORT}`)
});
