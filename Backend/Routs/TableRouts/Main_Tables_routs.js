const express=require('express')
const Tableroute=express.Router()
const {Emp_table_fn}=require('../../Controllers/TableController/Emp_table_controller')
const {Customer_table_fn}=require('../../Controllers/TableController/Customer_Table_Controller')
const {Tech_table_fn}=require('../../Controllers/TableController/Tech_Table_Controller')


Tableroute
.post('/customer_data',Customer_table_fn)
.post('/Item_data',Tech_table_fn)
.post('/emp_data',Emp_table_fn)



exports.Tableroute=Tableroute