import React, { useEffect } from "react"
import { Link, useHistory } from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCountriesDetail } from "../../Redux/actions/index"

import s from './CountryDetail.module.css'

export default function CountryDetail(props) {
    const dispatch = useDispatch()
    const id = props.match.params.id
    const country = useSelector((state) => state.detail)
    const history = useHistory()


    useEffect(() => {
        dispatch(getCountriesDetail(id))
    }, [dispatch, id])

    function handleClick(e) {
        e.preventDefault();
        history.push("/home")
    }


    return (
       
       
       <div className={s.prindiv}>

        <div className={s.bar}>
        <Link to= "/home"><button className={s.bothome} onClick={(e) => handleClick(e)}>Return Home</button></Link>
        </div>

        <div className={s.cardd}>

            <div className={s.contpais} >
            <h2 className={s.titulo}>Country Detail</h2>
        
            
            <div >
                <img className={s.banderad} src={country.flag} alt="Imagen no disponible" />
                <h4 className={s.codigo}>{country.id}</h4>
                <h2 className={s.nombred}> {country.name}</h2>
                <h4 className={s.continents}>{country.continents}</h4>
                <h4 className={s.detalle}>Capital: {country.capital}</h4>
                <h4 className={s.detalle}>Region: {country.subregion}</h4>
                <h4 className={s.detalle}>Área: {country.area} km²</h4>
                <h4 className={s.detalle}>Population: {country.population} Hab.</h4>
            </div> 
        
            </div>

        <div className={s.conact}>
        <h3 className={s.titulo}>Activities</h3>
        {
            country.Activities&&country.Activities.length ? 
        country.Activities.map(e => {
            return (
                    <div>
                        <h4 className={s.nombreact}>{e.name}</h4>
                        <p className={s.detalle}>Difficulty: {e.difficulty}</p>
                        <p className={s.detalle}>Duration: {e.duration} horas</p>
                        <p className={s.detalle}>Season: {e.season}</p>
                    </div>
                    
                ) 
             }) 
             : <p>Activities not created</p> 
        }
         <Link to="/activities"><button className={s.botact}>Create Activity</button></Link>               
        </div>
        </div>
    </div>
)
};






