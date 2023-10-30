const path = require('path')
const mysql = require('mysql2/promise')

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "",
    database: "lookups"
})

exports.Emp_title=async(req,res)=>{
    try {
        let conn = await db.getConnection();
    
        
        const sql = "SELECT Title,Gender,Grade FROM Emp_title LIMIT 15"
    
        const [Title,Gender,Grade] = await conn.query(sql);
        
        res.send(Title,Gender,Grade);
      } catch (error) {
        
        console.error('Error:', error);
        res.status(500).send('An error occurred while fetching data.');
      }
}

exports.Emp_selected_title=async(req,res)=>{
    const id = req.params.id

    const new_val = id.trim()
    try {
      let conn = await db.getConnection();
  
      
      const sql = `SELECT Title,Gender,Grade FROM Emp_title WHERE Title LIKE '%${new_val}%'`;
  
      const [Title,Gender,Grade] = await conn.query(sql);
      
      res.send(Title,Gender,Grade);

    } catch (error) {
      
      console.error('Error:', error);
      res.status(500).send('An error occurred while fetching data.');
    }
}