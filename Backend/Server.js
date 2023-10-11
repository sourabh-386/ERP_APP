const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const {Tableroute}=require('./Routs/TableRouts/Main_Tables_routs')


const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/data', Tableroute) 


//for checking
app.get('/', (req, res) => {
  res.send('sdsdsdsds')
})




app.get('/location', (req, res) => {
  const sql = "SELECT * FROM geo_lookup"
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  })
})



//for getting organisation type address
app.get('/Orgtype', (req, res) => {
  const sql = "SELECT Name FROM organisation_type "
  db.query(sql, (err, data) => {
    if (err) {
      return res.json(err);
    } else {
      return res.json(data);
    }
  })
})


app.listen(3008, () => {
  console.log("Server is working")
})