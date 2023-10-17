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

        const { Cust_main_table_data, site_data, site_contact } = req.body


        // extracting data 

        const { Customer_Name, Tax_Registration, Start_date, NDA_Signed, Organisation } = Cust_main_table_data;

        const formated_cust_name = Customer_Name.trim().charAt(0).toUpperCase() + Customer_Name.trim().slice(1).toLowerCase();

        const sql1 = 'INSERT INTO client_detail (Customer_Name,Tax_Registration,Start_date,NDA_Signed,Customer_ID,Organisation_Type) VALUES (?, ?, ?, ?, ?, ?)';
        const values = [formated_cust_name, Tax_Registration, Start_date, NDA_Signed, currentTimestamp, Organisation];


        /////////////////////
        const sql2 = 'INSERT INTO client_site_detail (Customer_site_id,Customer_site_name,Address1,Address2,Address3,Address4,Country,Site_state,City,Pin_code,Start_date,Customer_ID) VALUES ?;';
        const transformedData = site_data.map(item => [
            (item.id),
            item.Site_Name.trim().charAt(0).toUpperCase() + item.Site_Name.trim().slice(1).toLowerCase(),
            item.Address1.trim().charAt(0).toUpperCase() + item.Address1.trim().slice(1).toLowerCase(),
            item.Address2.trim().charAt(0).toUpperCase() + item.Address2.trim().slice(1).toLowerCase(),
            item.Address3.trim().charAt(0).toUpperCase() + item.Address3.trim().slice(1).toLowerCase(),
            item.Address4.trim().charAt(0).toUpperCase() + item.Address4.trim().slice(1).toLowerCase(),
            item.Country.trim().charAt(0).toUpperCase() + item.Country.trim().slice(1).toLowerCase(),
            item.State.trim().charAt(0).toUpperCase() + item.State.trim().slice(1).toLowerCase(),
            item.City.trim().charAt(0).toUpperCase() + item.City.trim().slice(1).toLowerCase(),
            item.PIN_Code.trim().charAt(0).toUpperCase() + item.PIN_Code.trim().slice(1).toLowerCase(),
            item.Start_date,
            currentTimestamp]);

        //////////////////////////////




        // sending data 

        const cust_data = await conn.query(sql1, values);
        console.log('1')

        if (cust_data[0].affectedRows !== undefined && cust_data[0].affectedRows === 1) {
            const cust_site_data = await conn.query(sql2, [transformedData]);

            console.log('2')

            if (site_contact.length !== 0 && cust_site_data[0].affectedRows !== undefined && cust_site_data[0].affectedRows >= 1) {

                const sql3 = 'INSERT INTO site_contact (Person_Contact_id,Customer_site_id,Customer_ID,Person_Name,Phone,Email,Designation) VALUES ?;';
                console.log('3')

                const contact_Data = site_contact.map(item => [
                    (item.id),
                    item.Site_id,
                    currentTimestamp,
                    item.name.trim().charAt(0).toUpperCase() + item.name.trim().slice(1).toLowerCase(),
                    item.phone,
                    item.email,
                    item.designation.trim().charAt(0).toUpperCase() + item.designation.trim().slice(1).toLowerCase()
                ]);

                console.log('4')

                const site_contact_data = await conn.query(sql3, [contact_Data]);
                console.log('5')


                if (site_contact_data[0].affectedRows !== undefined && site_contact_data[0].affectedRows >= 1) {

                    transactionSuccess = true;

                }
            }
            else {
                if (cust_site_data[0].affectedRows !== undefined && cust_site_data[0].affectedRows >= 1) {

                    transactionSuccess = true;

                }
            }
        }

        if (transactionSuccess) {
            await conn.commit();
            // const to_mail = contact.map(item => item.email);
            // send_mail_fn(to_mail)
            res.status(200).send({ message: "Data Saved Successfully" });
        } else {
            await conn.rollback();
            res.status(500).send({ message: "Dublicate Entry" });
        }

    } catch (error) {
        console.log(error)
        await conn.rollback();
        res.status(500).send({ message: error });
    }

}



