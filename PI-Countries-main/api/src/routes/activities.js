const router = require('express').Router()
const {Country, Activity} = require('../db')
// const {postActivity} = require('./controllers')
const { Op } = require("sequelize")




router.get('/', async (req, res) => {

  const activities = await Activity.findAll();
  if(activities) {
    return res.status(200).json(activities);
  } else {
    return res.status(404).json(activities.length ? activities :"Activities not found"); 
  }

});




router.post('/', async (req, res,) => {
    try {
      const {name, difficulty, duration, season, countries} = req.body
      if(name && difficulty && duration && season && countries){
          const activity = await Activity.create({
                  name,
                  difficulty,
                  duration,
                  season         
              });
  
          countries.forEach(async (id) => {
              const country = await Country.findOne({
                  where: {id: {[Op.iLike]:`%${id}%`}}
                      })
              await country?.addActivity(activity);
          })
  
          return res.send(activity)
      } else {
          return res.status(404).json('Missing data')
      }
  } catch (error) {
      res.status(400).send(error.message)
  }
  }
)



module.exports = router