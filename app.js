// Variables de entorno
require('dotenv').config();

// Importamos las bibliotecas necesarias
const express = require('express'),
      cors = require('cors'),
      path = require('path'),
      multer = require('multer');

// Objeto global de la app
const app = express();
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUI = require('swagger-ui-express');

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      title: 'Brawl Stars API',
      description: 'Una API local de Brawl Stars porque la oficial no me dejo usarla',
      contact: {
        name: 'Aarón Arias'
      },
      servers: [{
        "url": "http://localhost:3000/v1",
        "description": "Development server"
      },
      {
        "url": "https://brawlstars-a24.herokuapp.com/v1",
        "description": "Production server"
      }]
    }
  },
  basepath: "/",
  apis: ["./routes/*"]
}

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/v1/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocs));

// configuración de middlewares
const storage = multer.diskStorage({
  destination: 'public/images',
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  }
});

app.use(multer({
  storage,
  dest: 'public/images',
  fileFilter: (req, file, cb) => {
    const filetypes = /png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    if(mimetype && extname) {
      return cb(null, true);
    }
    cb('Error: el archivo debe ser una imagen formato png');
  }
}).single('image'));
app.use(express.static('public'));
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/*********************** Mongoose Configuration *******************************/
const mongoose = require("mongoose");

var isProduction = process.env.NODE_ENV === 'production';

mongoose.connect(
   process.env.MONGODB_URI, // obtiene la url de conexión desde las variables de entorno
   { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true, useFindAndModify: false }
);

require("./models/Brawler");
// Aquí se importarán los otros modelos cuando estén listos

/*********************** Mongoose Configuration *******************************/

// Agregamos el código de nuestro router (routes/index.js)
app.use('/v1', require('./routes'));

// Manejando los errores 404
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Iniciando el servidor...
var server = app.listen(process.env.PORT || 3000, function(){
  console.log('Escuchando en el puerto ' + server.address().port);
});