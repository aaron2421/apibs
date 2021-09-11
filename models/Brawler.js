// Brawler.js
const mongoose = require('mongoose'); //Importando mongoose.
//Definiendo el objeto BrawlerSchema con el constructor Schema.
//Definiendo cada campo con su respectivo tipo de dato.
const BrawlerSchema = new mongoose.Schema({
 _id: { type: mongoose.SchemaTypes.ObjectId,
  auto: true 
 },
 id: Number,                              
 nombre: String,
 clase: { type: String, 
   enum: ['Luchador', 'Peso pesado', 'Francotirador', 'Lanzador', 'Apoyo', 'Asesino', 'Escupefuego', 'Bateador'] 
 },
 tipo: { type: String, 
   enum: ['Recompensa de trofeos', 'Especial', 'Superespecial', 'Épico', 'Mítico', 'Legendario', 'Cromático'] 
 },
 salud: Number,
 velocidad: String,
 ataque: String,
 damage: Number,
 alcance: String,
 super: String,
 //  Proximamente agregar como foraneas para hacer modelos de habilidades y gadgets
//  habilidades: [{
//     id: Number,
//     nombre: String
//  }],
//  gadgets: [{
//     id: Number,
//     nombre: String
//  }],
//  skins: [{
//     id: Number,
//     nombre: String,
//     imagen: String
//  }],
 imagen: String
}, {
  versionKey: false
});  

//Define el modelo Usuario, utilizando el esquema UsuarioSchema.
mongoose.model("Brawler", BrawlerSchema);