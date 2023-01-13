const router = require('express').Router()
const {Country, Activity} = require('../db')
const {getDbInfo} = require('./controllers')


router.get('/', async (req,res) => {
    const {name} = req.query
    try{
        let infoPais = await getDbInfo()
            if(name) {
                let countryName = infoPais.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
                countryName.length ?
                res.status(200).send(countryName) :
                res.status(400).send("Country not found")
            } else {
                res.status(200).send(infoPais)
            }
    } catch(error) {
        res.status(400).send(error.message)
    }
})


router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const dbCountry = await Country.findByPk(id.toUpperCase(), {
      include: [{ model: Activity, through: { attributes: [] } }],
    });
    res.status(200).send(dbCountry);
  } catch (error) {
    console.log(error);
    res.status(404).send(error);
  }
})


  

module.exports = router;
