const path = require('path')
const mysql = require('mysql2/promise')
const { send_mail_fn } = require('./Helper_functions/Customre_mail_send_fn.js')

exports.Customer_table_fn = async (req, res) => {

    const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "first"
    })

    const currentTimestamp = new Date().getTime();
    let transactionSuccess = false;
    let conn;
    conn = await db.getConnection();
    
    try {
       
        await conn.beginTransaction();

        const { Customer_data, site_data, contact } = req.body

        const { Customer_Name, Tax_Registration, Start_date, NDA_Signed, Organisation } = Customer_data;
        const sql1 = 'INSERT INTO client_detail (Customer_Name,Tax_Registration,Start_date,NDA_Signed,Customer_ID,Organisation_Type) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [Customer_Name, Tax_Registration, Start_date, NDA_Signed, currentTimestamp, Organisation];

        const sql2 = 'INSERT INTO client_site_detail (Customer_site_id,Customer_site_name,Address1,Address2,Address3,Address4,Country,Site_state,City,Pin_code,Start_date,Customer_ID) VALUES ?;';
        const transformedData = site_data.map(item => [(item.id), item.Site_Name, item.Address1, item.Address2, item.Address3, item.Address4, item.Country, item.State, item.City, item.PIN_Code, item.Start_date, currentTimestamp]);

        const sql3 = 'INSERT INTO site_contact (Person_Contact_id,Customer_site_id,Customer_ID,Person_Name,Phone,Email,Designation) VALUES ?;';
        const contact_Data = contact.map(item => [(item.id), item.Site_id, currentTimestamp, item.name, item.phone, item.email, item.designation]);

        const cust_data = await conn.query(sql1, values);

        if (cust_data[0].affectedRows !== undefined && cust_data[0].affectedRows === 1) {
            const cust_site_data = await conn.query(sql2, [transformedData]);

            if (cust_site_data[0].affectedRows !== undefined && cust_site_data[0].affectedRows >= 1) {
                const contact_data = await conn.query(sql3, [contact_Data]);


                if (contact_data[0].affectedRows !== undefined && contact_data[0].affectedRows >= 1) {

                    transactionSuccess = true;

                }
            }
        }

        if (transactionSuccess) {
            await conn.commit();
            const to_mail = contact.map(item => item.email);
            send_mail_fn(to_mail)
            res.status(200).send('Data inserted successfully.');
        } else {
            await conn.rollback();
            res.status(500).send('Customer Alredy exist.');
        }

    } catch (error) {
        console.log(error)
        await conn.rollback();
        res.status(500).send(error);
    }

}



