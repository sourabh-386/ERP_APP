const path = require('path')
const mysql = require('mysql2/promise')

exports.Tech_table_fn = async (req, res) => {

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

        // extrating data 

        const { item_main_table_data, segment, sub_segment } = req.body

        const { Tech_Name, Rating, Start_date, Description } = item_main_table_data;

        const formattedTech_Name = Tech_Name.trim().charAt(0).toUpperCase() + Tech_Name.trim().slice(1).toLowerCase();

        const sql1 = `INSERT INTO tech_item 
        (Tech_Name, Tech_Rating, Start_date, Tech_Description,Tech_id) 
        VALUES (?,?,?,?,?)`;

        const values = [formattedTech_Name, Rating, Start_date, Description, currentTimestamp];

        //////////////////////

        const sql2 = 'INSERT INTO tech_segment (Tech_segment_name, Tech_segment_Rating, Start_date, Tech_segment_Description,Tech_id,Tech_segment_id) VALUES ?;';
        const transformedData = segment.map(item => [
            item.Tech_segment_Name.trim().charAt(0).toUpperCase() + item.Tech_segment_Name.trim().slice(1).toLowerCase(),
            item.Rating,
            item.Start_date,
            item.Description,
            currentTimestamp,
            item.id

        ]);


        // sending data 
        const item_data = await conn.query(sql1, values);

        // console.log('1')

        if (item_data[0].affectedRows !== undefined && item_data[0].affectedRows === 1) {
            const Segment_data = await conn.query(sql2, [transformedData]);
            // console.log('2')


            if (sub_segment.length !== 0 && Segment_data[0].affectedRows !== undefined && Segment_data[0].affectedRows >= 1) {

                const sql3 = 'INSERT INTO Tech_Sub_Segment (Tech_sub_segment_name, Rating, Start_date, Description,Tech_id,Tech_segment_id,Tech_sub_segmeny_id) VALUES ?;';
                const transformedData2 = sub_segment.map(item => [
                    item.Tech_sub_segment_Name.trim().charAt(0).toUpperCase() + item.Tech_sub_segment_Name.trim().slice(1).toLowerCase(),
                    item.Rating,
                    item.Start_date,
                    item.Description,
                    currentTimestamp,
                    item.segment_id,
                    item.id

                ]);

                const sub_seg = await conn.query(sql3, [transformedData2]);

                console.log('3')


                if (sub_seg[0].affectedRows !== undefined && sub_seg[0].affectedRows >= 1) {

                    transactionSuccess = true;

                }

            }
            else {

                if (Segment_data[0].affectedRows !== undefined && Segment_data[0].affectedRows >= 1) {

                    transactionSuccess = true;

                }

            }

        }

        if (transactionSuccess) {
            await conn.commit();
            res.status(200).send({message:"Data Saved Successfully"});
        } else {
            await conn.rollback();
            res.status(409).send({message:"Dublicate Entry"});
        }

    } catch (error) {
        console.log("catch",error)
        await conn.rollback();
        res.status(500).send({message:error});

    }


}