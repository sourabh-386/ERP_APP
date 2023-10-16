import { useState } from "react"

const Date_fn =() => {
    
   
    ////const date fn
    let defaultDate = new Date()
    defaultDate.setDate(defaultDate.getDate())
    let date=defaultDate
    return (date.toLocaleDateString('en-CA'))
}

export default Date_fn
