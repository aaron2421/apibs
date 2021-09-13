// Estructura del CRUD
const router = require('express').Router();
const {
  crearBrawler,
  obtenerBrawlers,
  modificarBrawler,
  eliminarBrawler
} = require('../controllers/brawlers')

/**
 * @swagger
 * /v1/brawlers:
 *  get:
 *    tags:
 *    - Brawlers
 *    summary: Get all brawlers
 *    description: Use to request all brawlers
 *    produces: 
 *      - application/json
 *    responses:
 *      200:
 *        description: Obtains all the brawlers
 */
router.get('/', obtenerBrawlers)

/**
 * @swagger
 * /v1/brawlers/{id}:
 *  get:
 *    tags:
 *    - Brawlers
 *    summary: Get brawler by ID
 *    description: Use to request a brawler by ID 
 *    produces: 
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID of the brawler
 *        required: true
 *    responses:
 *      200:
 *        description: Obtains one brawler
 */
 router.get('/:id', obtenerBrawlers)

 /**
 * @swagger
 * /v1/brawlers/{nombre}:
 *  get:
 *    tags:
 *    - Brawlers
 *    summary: Get brawler by "nombre"
 *    description: Use to request a brawler by name 
 *    produces: 
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: nombre
 *        description: name of the brawler
 *        required: true
 *    responses:
 *      200:
 *        description: Obtains one brawler
 */
  router.get('/:nombre', obtenerBrawlers)

/**
 * @swagger
 * /v1/brawlers:
 *  post:
 *    tags:
 *    - Brawlers
 *    summary: Post a new brawler
 *    description: Use this request to create a new brawler
 *    produces: 
 *      - application/json
 *    parameters:
 *      - in: body
 *        name: Brawler information
 *        description: This is the body of a brawler
 *        required: true
 *        schema: 
 *          type: object
 *          required:
 *            - id
 *            - nombre
 *            - clase
 *            - tipo
 *            - salud
 *            - velocidad
 *            - ataque
 *            - damage
 *            - alcance
 *            - super
 *            - habilidades
 *            - gadgets
 *            - imagen
 *          properties:
 *            id:
 *              type: integer
 *            nombre:
 *              type: string
 *            clase:
 *              type: string
 *            tipo:
 *              type: string
 *            salud:
 *              type: integer
 *            velocidad:
 *              type: string
 *            ataque:
 *              type: string
 *            damage:
 *              type: integer
 *            alcance:
 *              type: string
 *            super:
 *              type: string
 *            imagen:
 *              type: string  
 *    responses:
 *      201:
 *        description: Brawler creado
 */
router.post('/', crearBrawler)

/**
 * @swagger
 * /v1/brawlers/{id}:
 *  put:
 *    tags:
 *    - Brawlers
 *    summary: Update a brawler by ID
 *    description: Use this request to update a brawler searched by ID
 *    produces: 
 *      - application/json
 *    parameters:
 *      - in: path
 *        name: id
 *        description: ID of the brawler
 *        required: true
 *      - in: body
 *        name: Brawler information
 *        description: This is the body of a brawler
 *        required: true
 *        schema: 
 *          type: object
 *          required:
 *            - nombre
 *            - clase
 *            - tipo
 *            - salud
 *            - velocidad
 *            - ataque
 *            - damage
 *            - alcance
 *            - super
 *            - habilidades
 *            - gadgets
 *            - imagen
 *          properties:
 *            nombre:
 *              type: string
 *            clase:
 *              type: string
 *            tipo:
 *              type: string
 *            salud:
 *              type: integer
 *            velocidad:
 *              type: string
 *            ataque:
 *              type: string
 *            damage:
 *              type: integer
 *            alcance:
 *              type: string
 *            super:
 *              type: string
 *            habilidades:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  nombre:
 *                    type: string
 *            gadgets:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  nombre:
 *                    type: string 
 *            skins:
 *              type: array
 *              items:
 *                type: object
 *                properties:
 *                  id:
 *                    type: integer
 *                  nombre:
 *                    type: string  
 *                  imagen:
 *                    type: string
 *            imagen:
 *              type: string   
 *    responses:
 *      200:
 *        description: Brawler editado
 */
router.put('/:id', modificarBrawler)

/**
 * @swagger
 * /v1/brawlers/{id}:
 *  delete:
 *     tags:
 *     - Brawlers
 *     summary: Delete brawler
 *     description: Use this request to delete a brawler
 *     produces:
 *     - application/json
 *     parameters:
 *     - in: path
 *       name: id
 *       description: ID of the brawler
 *       required: true
 *     responses:
 *       200:
 *         description: Brawler borrado
 *       400:
 *         description: "Información invalida"
 *       404:
 *         description: "Brawler no encontrado"
 */
router.delete('/:id', eliminarBrawler)

module.exports = router;