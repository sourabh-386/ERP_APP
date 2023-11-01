const express=require('express')
const Tableroute=express.Router()
const path=require('path')
const {Emp_table_fn}=require('../../Controllers/TableController/Emp_table_controller')
const {Customer_table_fn}=require('../../Controllers/TableController/Customer_Table_Controller')
const {Tech_table_fn}=require('../../Controllers/TableController/Tech_Table_Controller')
const multer = require('multer')
const destinationPath = path.join(__dirname, '../../', 'Files')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      return cb(null, destinationPath)
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
      cb(null, uniqueSuffix + '_' + file.originalname);
    }
  })
  
const upload = multer({ storage });

Tableroute
.post('/customer_data',upload.array('file', 5),Customer_table_fn)
.post('/Item_data',Tech_table_fn)
.post('/emp_data',Emp_table_fn)



exports.Tableroute=Tableroute