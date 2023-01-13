import { FILTER_COUNTRIES, FILTER_BY_ACTIVITIES, GET_COUNTRIES, GET_COUNTRIES_BY_NAME, GET_ACTIVITIES, ORDER_COUNTRIES_ALF, ORDER_COUNTRIES_POP, GET_COUNTRY_DETAIL, ADD_ACTIVITIES, GET_COUNTRIES_QUERY } from "../action-types/action-types";

const initialState = {
    countries: [],
    allCountries: [],
    allActivities: [],
    activities: [],
    detail: {}  
};


function rootReducer (state = initialState, action){
    switch(action.type) {
        case GET_COUNTRIES:
            return{
                ...state,
                countries: action.payload,
                allCountries: action.payload
            }

        case FILTER_COUNTRIES: 
            const allCountries = state.allCountries
            const continentFiltered = action.payload === "All" ? allCountries : allCountries.filter(e => e.continents === action.payload)
            return {
                ...state,
                countries: continentFiltered
            }


        case ORDER_COUNTRIES_ALF:
            let sortArr = action.payload === "asc" ? 
            state.countries.sort(function (a,b) {
                if(a.name > b.name) {
                    return 1
                }
                if(b.name > a.name) {
                    return -1
                }
                return 0
            }) :
            state.countries.sort(function (a,b) {
                if(a.name > b.name) {
                    return -1
                }
                if(b.name > a.name) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                countries: sortArr
            }


        case ORDER_COUNTRIES_POP:
            let sortPop = action.payload === "plus" ?
            state.countries.sort(function (a,b) {
                if(a.population > b.population) {
                    return 1
                }
                if(b.population > a.population) {
                    return -1
                }
                return 0
            }) :
            state.countries.sort(function(a,b) {
                if(a.population > b.population) {
                    return -1
                }
                if(b.population > a.population) {
                    return 1
                }
                return 0
            })
            return {
                ...state,
                countries: sortPop
            }
         

        case GET_COUNTRY_DETAIL:
            return {
                ...state,
                detail: action.payload
            }

        case ADD_ACTIVITIES:
            return {
                ...state,
            }

        case GET_ACTIVITIES:
            return {
                ...state,
                allActivities: action.payload
            }

        case GET_COUNTRIES_QUERY:
            return{
                ...state,
                countries: action.payload
            }
        

        case GET_COUNTRIES_BY_NAME:
            let nombre = action.payload === "" ? state.allCountries :
            state.countries.filter((e) => e.name.toLowerCase().includes(action.payload.toLowerCase()))
            return{
                ...state,
                countries: nombre
            }


        case FILTER_BY_ACTIVITIES:  
            const allCountries2 = state.allCountries;

            const act = allCountries2.filter((p) => {
                return p.Activities.length > 0
            })


            let array = []

            for (let i = 0; i < act.length; i++) {
            for (let j = 0; j < act[i].Activities.length; j++) {
                if(act[i].Activities[j].name === action.payload) {
                    array.push(act[i])
                }
            }
                
            }

            const filtro = action.payload === "Todos" ? allCountries2 : array;

            return {
                ...state,
                countries: filtro
            }

            default:
                return state;

    }
}


export default rootReducer;