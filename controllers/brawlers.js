// controllers/brawlers.js
const mongoose = require("mongoose")
const Brawler = mongoose.model("Brawler")

function crearBrawler(req, res) {
  // Validate request
  if(!req.body) {
    return res.status(400).send({
        message: "Revisa que ningún campo esté vacío."
    });
  }

  // Create a Brawler
  const brawler = new Brawler({
    id: req.body.id,
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
  });

  // Save Brawler in the database
  brawler.save()
  .then(data => {
    res.status(201).send(data);
  }).catch(err => {
    res.status(500).send({
        message: err.message || "Error al crear Brawler."
    });
  });
}

function obtenerBrawlers(req, res, next) { //Obteniendo brawler desde MongoDB.
  // console.log(req.params.id)
  // ---------------------------------------------------------------
  // Aqui se puede agregar codigo para devolver un limite de objetos
  if (!req.params.id) {
    // sin :id, se enlistan todos los brawlers
    Brawler.find().then(brwlrs => {
      // res.send(brwlrs.id)
      res.send({ brwlrs })
    }).catch(next)
  } else {
    // encontrar brawler con :id 
    Brawler.findOne({id: req.params.id}).then(brwlr => {
      // console.log(brwlr);
      if (!brwlr) {
        return res.sendStatus(404);
      }
      res.send(brwlr)
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
  Brawler.findByIdAndUpdate(req.params.id, {
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
  // Brawler.findById(req.params.id).then(brwlr => {
    
  //   if (!brwlr) { return res.sendStatus(401); }

  //   let nuevaInfo = req.body
  //   if (typeof nuevaInfo.nombre !== 'undefined')
  //     brwlr.nombre = nuevaInfo.nombre
  //   if (typeof nuevaInfo.clase !== 'undefined')
  //     brwlr.clase = nuevaInfo.clase
  //   if (typeof nuevaInfo.tipo !== 'undefined')
  //     brwlr.tipo = nuevaInfo.tipo
  //   if (typeof nuevaInfo.salud !== 'undefined')
  //     brwlr.salud = nuevaInfo.salud
  //   if (typeof nuevaInfo.velocidad !== 'undefined')
  //     brwlr.velocidad = nuevaInfo.velocidad
  //   if (typeof nuevaInfo.ataque !== 'undefined')
  //     brwlr.ataque = nuevaInfo.ataque
  //   if (typeof nuevaInfo.damage !== 'undefined')
  //     brwlr.damage = nuevaInfo.damage
  //   if (typeof nuevaInfo.alcance !== 'undefined')
  //     brwlr.alcance = nuevaInfo.alcance
  //   if (typeof nuevaInfo.super !== 'undefined')
  //     brwlr.super = nuevaInfo.super
  //   if (typeof nuevaInfo.habilidades !== 'undefined')
  //     brwlr.habilidades = nuevaInfo.habilidades
  //   if (typeof nuevaInfo.gadgets !== 'undefined')
  //     brwlr.gadgets = nuevaInfo.gadgets
  //   brwlr.save().then(updateBrwlr => { //Guardando brawler modificado en MongoDB.
  //     res.status(201).json(updateBrwlr)
  //   }).catch(next)
  // }).catch(next)
//}

function eliminarBrawler(req, res) {
  Brawler.findByIdAndRemove(req.params.id)
    .then(brawler => {
        if(!brawler) {
            return res.status(404).send({
                message: "Brawler no encontrado con id " + req.params.id
            });
        }
        res.send({message: "Brawler eliminado: " + brawler.nombre});
    }).catch(err => {
        if(err.kind === 'ObjectId' || err.name === 'NotFound') {
            return res.status(404).send({
                message: "Brawler no encontrado con id " + req.params.id
            });                
        }
        return res.status(500).send({
            message: "No se pudo borrar el brawler con id " + req.params.id
        });
    });
}

module.exports = {
  crearBrawler,
  obtenerBrawlers,
  modificarBrawler,
  eliminarBrawler,
}