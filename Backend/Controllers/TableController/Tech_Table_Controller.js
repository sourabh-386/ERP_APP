const path = require('path')
const mysql = require('mysql2/promise')
// const { send_mail_fn } = require('./Helper_functions/Customre_mail_send_fn.js')


exports.Item_table_fn = async (req, res) => {

    const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "item_table"
    })

    const currentTimestamp = new Date().getTime();
    let transactionSuccess = false;
    let conn;
    conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        // const { Customer_data, site_data, contact } = req.body

        res.send("working")



    } catch (error) {
        console.log(error)
        await conn.rollback();
        res.status(500).send(error);
    }


}