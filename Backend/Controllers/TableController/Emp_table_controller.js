const path = require('path')
const mysql = require('mysql2/promise')

exports.Emp_table_fn = async (req, res) => {

    const db = mysql.createPool({
        host: "localhost",
        user: "root",
        password: "",
        database: "employees"
    })

    const currentTimestamp = new Date().getTime();
    let transactionSuccess = false;
    let conn;
    conn = await db.getConnection();

    try {

        await conn.beginTransaction();

        // extrating data 

        const { Hr_table, Emp_table } = req.body

        const { EMP_First_Name, EMP_Last_Name, EMP_Middle_Name, Title, Gender, Grade, Start_date, Active } = Hr_table;

        const formattedFirstName = EMP_First_Name.trim().charAt(0).toUpperCase() + EMP_First_Name.trim().slice(1).toLowerCase();
        const formattedLastName = EMP_Last_Name.trim().toLowerCase();
        const formattedMiddleName = EMP_Middle_Name.trim().toLowerCase();
        const formattedTitle = Title.trim().charAt(0).toUpperCase() + Title.trim().slice(1).toLowerCase();
        const formattedGender = Gender
        const formattedGrade = Grade.trim().charAt(0).toUpperCase() + Grade.trim().slice(1).toLowerCase();

        const full_name = formattedFirstName + (formattedMiddleName ? ` ${formattedMiddleName}` : '') + (formattedLastName ? ` ${formattedLastName}` : '')

        const sql1 = `INSERT INTO HR_MASTER 
        (EMP_First_Name, EMP_Last_Name, EMP_Middle_Name, Title, Gender, Grade,Start_date,Active,EMP_id,Full_name) 
        VALUES (?,?,?,?,?,?,?,?,?,?)`;

        const values = [formattedFirstName, formattedLastName, formattedMiddleName, formattedTitle, formattedGender, formattedGrade, Start_date, Active, currentTimestamp, full_name];

        //////////////////////

        const sql2 = 'INSERT INTO emp_master (EMP_Assign_id ,Super_Visor,Role,Tech_Assign,Gender,Grade,Active,Start_date,EMP_id) VALUES ?;';
        const transformedData = Emp_table.map(item => [
            (item.id),
            item.Super_Visor.trim().charAt(0).toUpperCase() + item.Super_Visor.trim().slice(1).toLowerCase(),
            item.Role.trim().charAt(0).toUpperCase() + item.Role.trim().slice(1).toLowerCase(),
            item.Tech_Assign.trim().charAt(0).toUpperCase() + item.Tech_Assign.trim().slice(1).toLowerCase(),
            item.Gender,
            item.Grade.trim().charAt(0).toUpperCase() + item.Grade.trim().slice(1).toLowerCase(),
            item.Active,
            item.Start_date,
            currentTimestamp
        ]);


        // sending data 
        const emp_data = await conn.query(sql1, values);

        if (emp_data[0].affectedRows !== undefined && emp_data[0].affectedRows === 1) {
            const cust_site_data = await conn.query(sql2, [transformedData]);

            if (cust_site_data[0].affectedRows !== undefined && cust_site_data[0].affectedRows >= 1) {

                transactionSuccess = true;

            }
        }

        if (transactionSuccess) {
            await conn.commit();
            res.status(200).send('Data inserted successfully.');
        } else {
            await conn.rollback();
            res.status(500).send('Employee Alredy exist.');
        }

    } catch (error) {
        console.log(error)
        await conn.rollback();
        res.status(500).send(error);

    }


}