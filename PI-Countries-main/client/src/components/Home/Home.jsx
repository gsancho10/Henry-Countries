import React from "react";
import { useState, useEffect } from "react";
import { useDispatch, useSelector} from "react-redux"
import { getCountries, filterByContinents, orderByName, orderByPop ,filterByAct, getActivities} from "../../Redux/actions";
import Card from "../Card/Card"
import Paginate from "../Paginate/Paginate"
import NavBar from "../NavBar/NavBar"

import s from "./Home.module.css"


export default function Home () {
    const dispatch = useDispatch()
    const allCountries = useSelector((state) => state.countries)
    const activities = useSelector((state) => state.allActivities)


    const [order, setOrder] = useState("")

    const [currentPage, setCurrentPage] = useState(1)
    let [countriesPerPage, setCountriesPerPage] = useState(12)

    const indexOfLastCountry = currentPage * countriesPerPage
    const indexOfFirstCountry = indexOfLastCountry - countriesPerPage
    const currentCountries = allCountries.slice(indexOfFirstCountry, indexOfLastCountry)


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    
    
useEffect (() => {
    dispatch(getCountries()); // lo mismo que hacer MapDispatchToProps
    dispatch(getActivities())
}, [dispatch])

function handleFilteredCountrie(e) {
    dispatch(filterByContinents(e.target.value))
}

// ordenamos por nombre
function handleSort(e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
    
}
// orden por cantidad de poblacion
function handleSortPop(e) {
    e.preventDefault()
    dispatch(orderByPop(e.target.value))
    setCurrentPage(1)
    setOrder(`Ordenado ${e.target.value}`)
}

//Filtro para las actividades
function handleFilterByAct(e) {
    e.preventDefault()
    e.target.value === "none" ? dispatch(getCountries()) : //Si no hay actividad, que muestre los paises
    dispatch(filterByAct(e.target.value))
    setCurrentPage(1)
}


return (
        <div className={s.main}>
            <div><NavBar setCurrentPage={setCurrentPage} /></div>

            <div className={s.filters}>
                <div>
                    Alphabetic Order
                    <select className={s.select} onChange={e => handleSort(e)}>
                        <option></option>
                        <option value="asc">Ascendent</option>
                        <option value="desc">Descendent</option>
                    </select>
                </div>

                <div>
                    Number of Population
                <select className={s.select} onChange={e => handleSortPop(e)}>
                <option value="All"></option>
                <option value="plus">Min-Max</option>
                <option value="minus">Max-Min</option>
                </select>
                </div>


                <div>
                    Search by Continents
                <select className={s.select} onChange={e => handleFilteredCountrie(e)}>
                    <option value={"All"}></option>
                    <option value={"South America"}>South America</option>
                    <option value={"North America"}>North America</option>
                    <option value={"Africa"}>Africa</option>
                    <option value={"Oceania"}>Oceania</option>
                    <option value={"Asia"}>Asia</option>
                    <option value={"Europe"}>Europe</option>
                    <option value={"Antartica"}>Antartica</option>
                </select>
                </div>


                <div>
                    Search by Activity 
                {(activities.length === 0) ? <p>No se crearon actividades</p> :
                <select className={s.select} onChange={e => handleFilterByAct(e)}>
                <option value="none"></option>
                {activities.map(e => (
                    <option value={e.name} key={e.id}>{e.name}</option>
                ))}
                </select>
                }
                </div>
            </div>



            <div className={s.contenedor}>
                {currentCountries.length? currentCountries.map((e) => {
                    return (
                        <div className="card">
                            <Card flag={e.flag} name={e.name} continents={e.continents} key={e.id} id={e.id} />
                            </div>
                    )
                }): <h1>Loading Countries...</h1>}
            </div>



            <div className={s.paginate}>
                <Paginate
                countriesPerPage={countriesPerPage}
                allCountries = {allCountries.length}
                paginado = {paginado} />
            </div>
        </div>
    )
}