// controllers/brawlers.js
const mongoose = require("mongoose")
const Brawler = mongoose.model("Brawler")
const fs = require('fs')

// function img(req, res) {
//   console.log(req.file)
//   res.send('uploaded')
// }

function crearBrawler(req, res) {
  //console.log(req.file)

  // Validate request
  if(!req.body) {
    return res.status(400).send({
        message: "Revisa que ningún campo esté vacío."
    });
  }

  // Create a Brawler
  const brawler = new Brawler({
    nombre: req.body.nombre,
    clase: req.body.clase,
    tipo: req.body.tipo,
    salud: req.body.salud,
    velocidad: req.body.velocidad,
    ataque: req.body.ataque,
    damage: req.body.damage,
    alcance: req.body.alcance,
    super: req.body.super,
    imagen: {
      data: fs.readFileSync('public/images/' + req.file.originalname),
      contentType: 'image/png'
    }
  });

  // Save Brawler in the database
  brawler.save()
  .then(data => {
    console.log(data)
    res.status(201).send(data);
  }).catch(err => {
    res.status(500).send({
        message: err.message || "Error al crear Brawler."
    });
  });
}

function obtenerBrawlers(req, res, next) { //Obteniendo brawler desde MongoDB.
  // console.log(req.params)
  // // ---------------------------------------------------------------
  // // Aqui se puede agregar codigo para devolver un limite de objetos
  if (!req.params.filtro) {
    //sin :id se enlistan todos los brawlers
    Brawler.find().then(brwlrs => {
      // res.send(brwlrs.id)
      res.send({ brwlrs })
    }).catch(next)
  } else {
    // encontrar brawler con :filtro de nombre, usando "like" para comparar el string completo y devolver mas resultados
    const filtro = req.params.filtro;
    // Brawler.find({tipo: new RegExp(`^${filtro}$`, 'i')}).then(brwlr => {
    Brawler.find({ nombre: {$regex: filtro, $options: 'i'} }).then(brwlr => {
      // console.log(brwlr);
      if (!brwlr) {
        return res.sendStatus(404);
      }
      res.send({brwlr})
    }).catch(next)
  }
}

function modificarBrawler(req, res) {
  // Validate Request
  if(!req.body) {
    return res.status(400).send({
        message: "El contenido no puede ir vacío"
    });
  }

  // Find brawler and update it with the request body
  Brawler.findOneAndUpdate({id: req.params.id}, {
    nombre: req.body.nombre,
    clase: req.body.clase,
    tipo: req.body.tipo,
    salud: req.body.salud,
    velocidad: req.body.velocidad,
    ataque: req.body.ataque,
    damage: req.body.damage,
    alcance: req.body.alcance,
    super: req.body.super,
    imagen: req.body.imagen,
  }, {new: true})
  .then(brawler => {
      if(!brawler) {
        return res.status(404).send({
          message: "Brawler no encontrado con id " + req.params.id
        });
      }
      res.send(brawler);
  }).catch(err => {
    if(err.kind === 'ObjectId') {
      return res.status(404).send({
          message: "Brawler no encontrado con id " + req.params.id
      });                
    }
    return res.status(500).send({
      message: "Error modificando brawler con id " + req.params.id
    });
  });
}

function eliminarBrawler(req, res) {
  Brawler.deleteOne({id: req.params.id})
  .then(() => {
    return res.status(200).send({
      message : "Brawler eliminado"
    })
  })
}

module.exports = {
  // img,
  crearBrawler,
  obtenerBrawlers,
  modificarBrawler,
  eliminarBrawler,
}