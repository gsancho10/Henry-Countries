const router = require('express').Router();
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const countryRouter = require('./countries.js')
const activityRouter = require('./activities.js')

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/countries', countryRouter)
router.use('/activities', activityRouter)


module.exports = router;
