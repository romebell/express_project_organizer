let router = require("./projects");
let express = require('express')
let db = require('../models')
// let router = express.Router()

// GET /categories - display all categories
router.get('/', (req, res) => {
    db.category.findAll()
    .then((category) => {
      res.render('categories/index', { categories: category })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })
  
  // GET /categories/:id - display a specific post and its category
  router.get('/:id', (req, res) => {
    db.catogory.findOne({
      where: { id: req.params.id },
      include: [db.category]
    })
    .then((category) => {
      if (!category) throw Error()
      console.log(category.get())
      res.render('categories/show', { category: category })
    })
    .catch((error) => {
      console.log(error)
      res.status(400).render('main/404')
    })
  })

module.exports = router