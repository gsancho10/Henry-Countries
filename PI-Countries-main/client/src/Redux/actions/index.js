import axios from 'axios'
import { FILTER_COUNTRIES, GET_COUNTRIES, GET_COUNTRIES_BY_NAME, ORDER_COUNTRIES_ALF, ORDER_COUNTRIES_POP ,GET_ACTIVITIES, GET_COUNTRY_DETAIL, GET_COUNTRIES_QUERY, FILTER_BY_ACTIVITIES } from '../action-types/action-types'

// LISTO  ---------------------------------------------------------------
export function getCountries () {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/countries')
        return dispatch({
            type: GET_COUNTRIES,
            payload: json.data
        })
    }
}


export function filterByContinents(payload) {
    return {
        type: FILTER_COUNTRIES,
        payload
    }
}

export function orderByName(payload) {
    return{
        type: ORDER_COUNTRIES_ALF,
        payload
    }
}

export function orderByPop(payload) {
    return {
        type: ORDER_COUNTRIES_POP,
        payload
    }
}



export function getCountriesDetail(id) {
    return async function (dispatch) {
        
            const json = await axios.get(`http://localhost:3001/countries/${id}`)
            return dispatch ({
                type:GET_COUNTRY_DETAIL,
                payload: json.data
            })     
    }
}


export default function getCountriesSearch(name){
    return async function (dispatch) {
        var json = await axios.get(`http://localhost:3001/countries?name=${name}`)
        return dispatch({
            type: GET_COUNTRIES_QUERY,
            payload: json.data
        })
    }
}

export function filterByAct(activity) {
    return {
        type: FILTER_BY_ACTIVITIES,
        payload: activity
    }
}

export function getActivities() {
    return async function (dispatch) {
        let json = await axios.get('http://localhost:3001/activities')
        return dispatch({
            type:GET_ACTIVITIES,
            payload: json.data
        })
    }
}

export function postActivity (payload) {
    return async function(dispatch){
      const response = await axios.post('http://localhost:3001/activities', payload)
        return response
    }
}


export function getCountriesByName (name) {
    return {
        type: GET_COUNTRIES_BY_NAME,
        payload: name,
    }
}