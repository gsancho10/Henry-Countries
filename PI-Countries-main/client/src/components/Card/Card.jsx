import React from "react";
import { Link } from "react-router-dom"
import s from "./Card.module.css"
// LISTO -------------------------------------------------------

export default function Card({flag, name, continents, id}) {
    return (
        <div className={s.card}>
            <div><img className={s.flag}src={flag} alt="Imagen not found" /></div>
            <h3 className={s.name}>{name}</h3>
            <h5 className={s.continents}>{continents}</h5>

            <Link to={`/countries/${id}`}><button className={s.boton}>Info</button></Link>
        </div>
    )
}