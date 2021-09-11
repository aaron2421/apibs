// importamos las dependencias necesarias
var router = require('express').Router();

// definimos el comportamiento en la raíz del endpoint
router.get('/', (req, res)=>{
  res.send('welcome to brawl stars api! 😎');
});

router.use('/brawlers', require('./brawlers'));

/* con el método use de nuestro router estamos indicando 
* que en la ruta 'v1/brawlers' estarán anidadas las rutas 
* que vamos a crear en nuestro archivo usuarios.js,
* la función require está importando este archivo */

// exportamos nuestro nuevo router
module.exports = router;