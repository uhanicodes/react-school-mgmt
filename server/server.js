const express = require('express');
const bodyParser = require('body-parser') 
const mysql = require('mysql2');
const cors = require('cors');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'school2',
    password: 'root'
})
const app = express();
const port = 5000;

app.use(bodyParser.json())
app.use(cors());
// app.use(bodyParser.urlencoded({ extended: false }))

const students = require('./students.js');

app.get('/', (req, res) => {
    res.send("Hello World!");
})

app.get('/students', (req, res) => {
    const sql = `SELECT * FROM students`;

    console.log(sql);

    connection.query(sql, (err, result, fields) => {

        if (err instanceof Error) {
            console.log(err);
            return
        }

        console.log('result:', result);
        console.log('fields:', fields);

        res.send(result);
    })
})

app.post('/students', (req, res) => {
    const sql = `INSERT INTO students (ID, RollNumber, LastName, FirstName) 
    VALUES (${req.body.id}, ${req.body.rollNumber}, "${req.body.lastName}", "${req.body.firstName}")`;

    console.log(sql);

    connection.query(sql, (err, result, fields) => {

        if(err instanceof Error) {
            console.log(err);
            return;
        }

        console.log(result);
        console.log(fields);
    })

    res.end();
})

app.get('/students/:id', (req, res) => {
    let sql = `SELECT * FROM students WHERE RollNumber = ${req.params.id}`;

    console.log('sql:', sql);

    connection.query(sql, (err, row, fields) => {
        if (err instanceof Error) {
            console.log(err);
            res.end();
        }

        console.log(row);
        console.log(fields);

        if (row.length == 0) {
            res.status(404).send("This student is not found!");
            return;
        }

        res.send({
            id: row[0].ID,
            rollNumber: row[0].RollNumber,
            firstName: row[0].FirstName,
            lastName: row[0].LastName
        });
    })
})

app.put('/students/:id', (req, res) => {
    let sql = `UPDATE students
            SET FirstName = "${req.body.firstName}", LastName = "${req.body.lastName}", RollNumber = ${req.body.rollNumber}
            WHERE ID = ${req.params.id}`;

    connection.query(sql, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            res.end();
        }

        console.log('result:', result);
        console.log('fields:', fields);

        res.end();
    })
})

app.delete('/students/:id', (req, res) => {
    let sql = `DELETE FROM students WHERE ID = ${req.params.id}`;

    connection.query(sql, (err, result, fields) => {
        if (err instanceof Error) {
            console.log(err);
            res.end();
        }

        console.log('result:', result);
        console.log('fields:', fields);

        res.end();
    })
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})