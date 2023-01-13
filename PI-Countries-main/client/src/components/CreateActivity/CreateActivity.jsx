import {React, useEffect, useState} from "react"
import {Link, useHistory} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux"
import { getCountries, postActivity } from "../../Redux/actions"

import s from './CreateActivity.module.css'

function validate(input){
    let errors = {}
    let dif = Number(input.difficulty)
    let dur = Number(input.duration)

    if(!input.name) errors.name = "Invalid field"
    else if(/[^A-Za-z0-9 ]+/g.test(input.name)) errors.name = 'Cannot have special characters!'

    if(!input.difficulty) errors.difficulty = "Invalid field"
    else if(dif <=0 || dif > 5) errors.difficulty = "Value must been between 1 and 5"

    if(!input.duration) errors.duration = "Invalid field"
    else if(dur <=0 || dur > 24) errors.duration = "Value must been between 1 and 24 "

    if(!input.season || input.season === "vacio") errors.season = "Invalid field"
    
    if(!input.countries || input.countries.length === 0) errors.countries = "Invalid field"

    return errors
}
export default function CreateActivity () {
    const dispatch = useDispatch()
    const history = useHistory()
    const countries = useSelector((state) => state.countries)
     const [errors, setErrors] = useState({})


    const [input, setInput] = useState({
        name: "",
        difficulty: "",
        duration: "",
        season:"",
        countries: []
    })

    useEffect (() => {
        dispatch(getCountries())
    }, [dispatch])

    function handleChange(e) {
        setInput({
            ...input,
            [e.target.name] : e.target.value
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
        }))
    }

    const handleSelect = (e) => {
        setInput((std) => {
            if(e.target.name === "countries") {
                return {
                    ...std,
                    countries: [...std.countries, e.target.value]
                }
            } else {
                return {
                    ...std,
                    [e.target.name]: e.target.value
                }
            }
        })
    }


    function handleSubmit(e) {
        e.preventDefault()
        if(!input.name || !input.countries) {
            return alert ('Complete all the fields to create')
        }

        dispatch(postActivity(input))
        alert('Activity created successfully')
        setInput({
            name:"",
            difficulty:"",
            duration:"",
            season:"",
            countries: []
        })
        history.push("/home") 
    }

    function handleDelete(e) {
        setInput({
            ...input,
            countries: input.countries.filter(c => c !== e)
        })
    }

    function handleClick(e) {
        e.preventDefault()
        history.push("/home") // --------------------------
    }

    // useEffect(() => {
    //     dispatch(getCountries())
    // }, [])





    return(
        <div className={s.principal}>
            <div className={s.bar}>
            <Link to="/home"><button className={s.bothome} onClick={(e) => handleClick(e)}>Return home</button></Link>
            </div>
            <div className={s.contform}>
                <h2 className={s.titulo}>Create your activity</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    <label className={s.campo}>Name: </label>
                    <input className={s.inputs} type="text" value= {input.name} name= "name" onChange={(e) => handleChange(e)} />
                    {errors.name && (<p className={s.error}>{errors.name}</p>)}
                </div>
                <div>
                    <label className={s.campo}>Select country for your new activity: </label>
                    <select className={s.inputs} name="countries" id="countries" onChange={(e) => handleSelect(e)}>
                        <option> </option>
                        {countries.map((con) => (
                            <option value={con.id}>{con.name}</option>  
                        ))}
                    </select>
                    {errors.countries && (<p className={s.error}>{errors.countries}</p>)}        
                </div>
                <div>
                    <label className={s.campo}>Season: </label>
                    <select className={s.inputs} name="season" id="season" onChange={(e) => handleSelect(e)}>
                        <option value="vacio"> </option>
                        <option value={"Summer"}>Summer </option>
                        <option value={"Winter"}>Winter </option>
                        <option value={"Spring"}>Spring </option>
                        <option value={"Autum"}>Autum </option>
                    </select>
                    {errors.season && (<p className={s.error}>{errors.season}</p>)}
                </div>
                <div>
                    <label className={s.campo}>Difficulty (1-5): </label>
                    <input className={s.inputs} type="number" value={input.difficulty} name="difficulty" onChange={(e) => handleChange(e)} />
                    {errors.difficulty && (<p className={s.error}>{errors.difficulty}</p>)}
                </div>
                <div>
                    <label className={s.campo}>Duration (1-24): </label>
                    <input className={s.inputs} type="number" value ={input.duration} name="duration" onChange={(e) => handleChange(e)} />
                    {errors.duration && (<p className={s.error}>{errors.duration}</p>)}
                    
                </div>
                <div>
                    <button className={s.botsub} type="submit" disabled={Object.keys(errors).length === 0 ? false : true}>Create</button>
                </div>
            </form>


                    {input.countries.map(e =>
                        <div className={s.conpais}>
                            <p className={s.mpais}> {e} </p>
                            <button className={s.delete} onClick={() => handleDelete(e)}>X</button>
                            </div>
                    )}
            </div>
        </div>
    )
}




