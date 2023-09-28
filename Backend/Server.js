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



app.post('/create', (req, res) => {


  const currentTimestamp = new Date().getTime();

  const { Customer_data, site_data } = req.body

  console.log(Customer_data)

  const { Customer_Name, Tax_Registration, Start_date, NDA_Signed,Organisation } = Customer_data;
  const sql1 = 'INSERT INTO client_detail (Customer_Name,Tax_Registration,Start_date,NDA_Signed,Customer_ID,Organisation_Type) VALUES (?, ?, ?, ?, ?, ?)';
  const values = [Customer_Name, Tax_Registration, Start_date, NDA_Signed, currentTimestamp,Organisation];

  const sql2 = 'INSERT INTO client_site_detail (Customer_site_id,Customer_site_name,Address1,Address2,Address3,Address4,Country,Site_state,City,Pin_code,Start_date,Customer_ID) VALUES ?;';
  const transformedData = site_data.map(item => [(currentTimestamp + item.id), item.Site_Name,item.Address1,item.Address2,item.Address3,item.Address4, item.Country, item.State, item.City, item.PIN_Code, item.Start_date, currentTimestamp]);


  db.query(sql1,values, (error, results) => {
    if (error) {
      return res.send(error);  
    } else {
    
      db.query(sql2, [transformedData], (err, data) => {
        if (err) {
          return res.send(err);  
        }
        res.json(data);  
      });
    }
  });
  

});



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