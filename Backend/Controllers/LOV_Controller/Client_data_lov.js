const path = require('path')
const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "first"
})

exports.Client_data=async (req,res)=>{
    try {
        let conn = await db.getConnection();
    
        
        const sql = 'SELECT Customer_Name FROM client_detail LIMIT 15'
        const [Customer_Name] = await conn.query(sql);
        
        res.send(Customer_Name);
      } catch (error) {
        
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching data.');
      }
}

exports.Client_selected_data=async (req,res)=>{
    const id = req.params.id

    const new_val = id.trim()
    console.log(new_val)
    try {
      let conn = await db.getConnection();
  
      
      const sql = `SELECT Customer_Name FROM client_detail WHERE Customer_name LIKE '%${new_val}%'`;
      const [data] = await conn.query(sql);
      console.log(data)
      
      res.send(data);
    } catch (error) {
      
      console.error('Error:', error);
      res.status(500).send('An error occurred while fetching data.');
    }
}