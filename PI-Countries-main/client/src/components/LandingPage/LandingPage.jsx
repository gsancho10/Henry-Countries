import React from "react";
import {Link} from 'react-router-dom';

import s from './LandingPage.module.css'

export default function LandingPage(){
    return(
        <div className={s.all}>
            <div className={s.titulol}>
            <h1>Welcome to Henry Countries</h1>
            <div className={s.getin}>

            <Link to = '/home'>
                <button className={s.boton}>Get in</button>
            </Link>
           
            </div>
            </div>
        </div>
    )
}