import React from 'react'
import style from './Loader.module.css'
const Loader = () => {
    return (
        <div className={style.outer_loader}>
            <div className={style.loader}></div>
        </div>
    )
}

export default Loader