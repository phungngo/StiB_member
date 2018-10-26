const express = require('express');
const router = express.Router();

const request = require('superagent');
const async = require('async');

const mysql = require('mysql');

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "my_database"
});


router.get('/users', (req, res) => {
    db.query('SELECT * FROM info', (err, response) => {
        if(err) throw err
        res.json(response)
    })
});

router.post('/users', (req, res) => {
    let data = req.body;
    db.query('INSERT INTO info SET ?', [data], (err, response) => {
        if (err) throw err
        res.json({ message: 'Insert success!' })
    });
})

router.delete('/users/:id', (req, res) => {
    db.query('DELETE FROM info WHERE id = ?', [req.params.id], (err, response) => {
        if(err) throw err
        res.json({message: 'Deleted'})
    })
})

router.put('/users/:id', (req, res) => {
    let data = req.body;
    db.query('UPDATE info SET ? WHERE id = ?', [data, req.params.id], (err, response) => {
        if(err) throw err
        res.json({message: 'Updated'})
    })
})


module.exports = router;