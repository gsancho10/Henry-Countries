import React from "react";

import s from './Paginate.module.css'


export default function Paginado ({countriesPerPage, allCountries, paginado}){
    const pageNumbers = []

    for (let i = 1; i <= Math.ceil(allCountries/countriesPerPage); i++) {
        pageNumbers.push(i)
    }

    return(
        <nav className={s.contenido}>
            <ul>
                {
                    pageNumbers &&
                    pageNumbers.map(number => (
                        
                        <button className={s.botonpgn} key={number} onClick={() => paginado(number)}>{number}</button>
                        
                    ))
                }
            </ul>
        </nav>
    )
}