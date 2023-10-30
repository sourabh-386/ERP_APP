const path = require('path')
const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lookups"
})


exports.Org_data=async(req,res)=>{
    try {
        let conn = await db.getConnection();
    
        
        const sql = "SELECT Name FROM organisation_type LIMIT 15"
    
        const [Name] = await conn.query(sql);
        
        res.send(Name);
      } catch (error) {
        
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching data.');
      }
}

exports.Org_selected_data=async(req,res)=>{
    const id = req.params.id

    const new_val = id.trim()
    try {
      let conn = await db.getConnection();
  
      
      const sql = `SELECT Name FROM organisation_type WHERE Name LIKE '%${new_val}%'`;
  
      const [Name] = await conn.query(sql);
      
      res.send(Name);
    } catch (error) {
      
      console.error('Error:', error);
      res.status(500).send('An error occurred while fetching data.');
    }
}