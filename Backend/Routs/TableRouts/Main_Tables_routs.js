const express=require('express')
const Tableroute=express.Router()
const {Customer_table_fn} =require('../../Controllers/TableController/Customer_Table_Controller.js')

Tableroute
.post('/customer_data',Customer_table_fn)




exports.Tableroute=Tableroute