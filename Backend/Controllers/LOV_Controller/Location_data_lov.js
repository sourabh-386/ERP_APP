const path = require('path')
const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lookups"
})

exports.location=async(req,res)=>{
    try {
        let conn = await db.getConnection();
    
        
        const sql = "SELECT Country,State_name,City FROM geo_lookup LIMIT 15"
    
        const [Country,State_name,City] = await conn.query(sql);
        
        res.send(Country,State_name,City);
      } catch (error) {
        
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching data.');
      }
}

exports.location_selected_data=async(req,res)=>{
    const id = req.params.id

    const new_val = id.trim()
    try {
      let conn = await db.getConnection();
  
      
      const sql = `SELECT Country,State_name,City FROM geo_lookup WHERE Country LIKE '%${new_val}%'`;
  
      const [Country,State_name,City] = await conn.query(sql);
      
      res.send(Country,State_name,City);

    } catch (error) {
      
      console.error('Error:', error);
      res.status(500).send('An error occurred while fetching data.');
    }
}