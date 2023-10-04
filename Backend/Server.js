const express = require('express')
const mysql = require('mysql')
const cors = require('cors')
const bodyParser = require('body-parser');

const app = express()

app.use(cors())


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "first"
})


app.get('/', (req, res) => {
  res.send('sdsdsdsds')
})


app.post('/create', async(req, res) => {

  const currentTimestamp = new Date().getTime();


  try {


  const { Customer_data, site_data, contact } = req.body
    
  const { Customer_Name, Tax_Registration, Start_date, NDA_Signed, Organisation } = Customer_data;
  const sql1 = 'INSERT INTO client_detail (Customer_Name,Tax_Registration,Start_date,NDA_Signed,Customer_ID,Organisation_Type) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [Customer_Name, Tax_Registration, Start_date, NDA_Signed, currentTimestamp, Organisation];

  const sql2 = 'INSERT INTO client_site_detail (Customer_site_id,Customer_site_name,Address1,Address2,Address3,Address4,Country,Site_state,City,Pin_code,Start_date,Customer_ID) VALUES ?;';
  const transformedData = site_data.map(item => [(item.id), item.Site_Name, item.Address1, item.Address2, item.Address3, item.Address4, item.Country, item.State, item.City, item.PIN_Code, item.Start_date, currentTimestamp]);

  const sql3 = 'INSERT INTO site_contact (Person_Contact_id,Customer_site_id,Customer_ID,Person_Name,Phone,Email,Designation) VALUES ?;';
  const contact_Data = contact.map(item => [(item.id), item.Site_id, currentTimestamp, item.name, item.phone, item.email, item.designation]);

  const cust_data = await db.query(sql1, values);

  const cust_site_data = await db.query(sql2, [transformedData]);

  const contact_data = await db.query(sql3, [contact_Data]);

} catch (error) {
    res.send(error)
}


  // db.query(sql1, values, (err, results) => {
  //   if (err) {
  //     return res.send(err);
  //   } else {
  //     db.query(sql2, [transformedData], (err, data) => {
  //       if (err) {
  //         return res.send(err);
  //       } else {

  //         db.query(sql3, [contact_Data], (err, data) => {
  //           if (err) {
  //             return res.send(err);
  //           }
  //         });

  //       }    
  //     });

  //   }    
  // });

})



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