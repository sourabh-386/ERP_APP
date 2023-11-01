const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const { Tableroute } = require('./Routs/TableRouts/Main_Tables_routs')
const { LovRouts } = require('./Routs/LOV_Routs/Lov_routs')

const app = express()

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.post()
app.use('/data', Tableroute)

// /fetch data in lovs 
app.use('/LOV', LovRouts)

app.listen(3008, () => {
  console.log("Server is working")
})