const express =require('express')
const LovRouts=express.Router()
const {Client_data,Client_selected_data}=require('../../Controllers/LOV_Controller/Client_data_lov')
const {Org_data,Org_selected_data}=require('../../Controllers/LOV_Controller/Org_data_lov')
const {location,location_selected_data}=require('../../Controllers/LOV_Controller/Location_data_lov')
const {Emp_title,Emp_selected_title}=require('../../Controllers/LOV_Controller/Emp_title_lov')
LovRouts
.get('/client',Client_data)
.get('/client/:id',Client_selected_data)
.get('/organisation',Org_data)
.get('/organisation/:id',Org_selected_data)
.get('/location',location)
.get('/location/:id',location_selected_data)
.get('/empTitle',Emp_title)
.get('/empTitle/:id',Emp_selected_title)



exports.LovRouts=LovRouts