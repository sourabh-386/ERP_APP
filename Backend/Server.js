const express = require('express')
const mysql = require('mysql2/promise')
const cors = require('cors')
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const {Tableroute}=require('./Routs/TableRouts/Main_Tables_routs')

// const db = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "first"
// })

// module.exports=db;

const app = express()

app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));





app.get('/', (req, res) => {
  res.send('sdsdsdsds')
})


app.use('/data', Tableroute) 

// main function customer data 
// app.post('/create', async (req, res) => {

//   const currentTimestamp = new Date().getTime();
//   let transactionSuccess = false;
//   let conn;
//   try {

//     conn = await db.getConnection();
//     await conn.beginTransaction();

//     const { Customer_data, site_data, contact } = req.body

//     const { Customer_Name, Tax_Registration, Start_date, NDA_Signed, Organisation } = Customer_data;
//     const sql1 = 'INSERT INTO client_detail (Customer_Name,Tax_Registration,Start_date,NDA_Signed,Customer_ID,Organisation_Type) VALUES (?, ?, ?, ?, ?, ?)';
//     const values = [Customer_Name, Tax_Registration, Start_date, NDA_Signed, currentTimestamp, Organisation];

//     const sql2 = 'INSERT INTO client_site_detail (Customer_site_id,Customer_site_name,Address1,Address2,Address3,Address4,Country,Site_state,City,Pin_code,Start_date,Customer_ID) VALUES ?;';
//     const transformedData = site_data.map(item => [(item.id), item.Site_Name, item.Address1, item.Address2, item.Address3, item.Address4, item.Country, item.State, item.City, item.PIN_Code, item.Start_date, currentTimestamp]);

//     const sql3 = 'INSERT INTO site_contact (Person_Contact_id,Customer_site_id,Customer_ID,Person_Name,Phone,Email,Designation) VALUES ?;';
//     const contact_Data = contact.map(item => [(item.id), item.Site_id, currentTimestamp, item.name, item.phone, item.email, item.designation]);

//     const cust_data = await conn.query(sql1, values);

//     if (cust_data[0].affectedRows !== undefined && cust_data[0].affectedRows === 1) {
//       const cust_site_data = await conn.query(sql2, [transformedData]);

//       if (cust_site_data[0].affectedRows !== undefined && cust_site_data[0].affectedRows >= 1) {
//         const contact_data = await conn.query(sql3, [contact_Data]);


//         if (contact_data[0].affectedRows !== undefined && contact_data[0].affectedRows >= 1) {

//           transactionSuccess = true;

//           const to_mail = contact.map(item => item.email);
//           send_mail_fn(to_mail)

//         }
//       }
//     }

//     if (transactionSuccess) {
//       await conn.commit();
//       console.log('transactionSuccess', transactionSuccess)
//       res.status(200).send('Data inserted successfully.');
//     } else {
//       console.log('transactionSuccess', transactionSuccess)
//       await conn.rollback();
//       res.status(500).send('Failed to insert data.');
//     }

//   } catch (error) {

//     await conn.rollback();
//     res.status(500).send('An error occurred.');
//   }

// })

//sending mail fn
// const send_mail_fn = (to_mail) => {
//     console.log(to_mail)
//   var transporter = nodemailer.createTransport({
//     service: 'gmail',
//     auth: {
//       user: 'sourabh386kumar@gmail.com',
//       pass: 'fbob dbwx wnpv ppmx'
//     }
//   });

//   var mailOptions = {
//     from: 'sourabh386kumar@gmail.com',
//     to: to_mail,
//     subject: 'Sending Email using Node.js',
//     text: 'That was easy!'
//   };

//   transporter.sendMail(mailOptions, function (error, info) {
//     if (error) {
//       console.log(error)
//       return (res.send(error));

//     } else {
//       console.log('Email sent: ' + info.response)
//       return (res.send('info.response'))
//     }
//   });
// }


//for getting geo location address
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