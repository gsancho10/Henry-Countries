
const axios = require('axios')
const { Country, Activity } = require('../db')



const getApiInfo = async () => {
    const URL = await axios.get('https://restcountries.com/v3/all')
    const apiInfo = URL.data.map(e => {
        return {
            id: e.cca3,
            name: e.name.common,
            flag: e.flags[1],
            continents: e.continents[0],
            capital: e.capital != null ? e.capital[0] : 'No data',
            subregion: e.subregion,
            area: e.area,
            population: e.population
        }
        
    })

    const save = () => {
        apiInfo.map(e => {
            Country.findOrCreate({
                where: {
                    name: e.name,
                    id: e.id
                },
                defaults: {
                    continents: e.continents,
                    flag: e.flag,
                    capital: e.capital,
                    subregion: e.subregion,
                    area: e.area,
                    population: e.population
                },
            })
        })
    }
    save()
    return apiInfo
}


const getDbInfo = async () => {
    await getApiInfo()
    const aux = await Country.findAll({
        include: {
            model: Activity,
            attributes: ['name', 'difficulty', 'duration', 'season'],
            through: {
                attributes: [],
            }
        }
    })
    return aux
}







module.exports = {
    getDbInfo,
    // postActivity
}


