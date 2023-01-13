import { React } from "react"
import { Link } from "react-router-dom"
import { useDispatch } from "react-redux"
import { useState, useEffect } from "react"
import { getActivities, getCountries, getCountriesByName } from "../../Redux/actions"

import s from './NavBar.module.css'

export default function NavBar({setCurrentPage}) {
    const dispatch = useDispatch()
    const [name, setName] = useState("")


    useEffect(() => {
        dispatch(getCountries())
        dispatch(getActivities())
    }, [dispatch])


    

    function handleChange(e) {
        dispatch(getCountriesByName(e))
        setCurrentPage(1)
    }


    return (
        <div className={s.navbar}>
        
        <div className={s.countrysrc}>
        <div className={s.srch}>
            <div className={s.srctitle}>Find your next destiny</div>    
               <input className={s.input} value={name} type = "text" placeholder = "Country do you wish to meet..."
                onChange = {(e) => {setName(e.target.value); handleChange(e.target.value)}} />
               </div>
        </div>
            <div className={s.act}>    
            <Link to= "/activities"><button className={s.boton}>Create Activity</button></Link>       
            </div>
        </div>
        
    )
    
    }















