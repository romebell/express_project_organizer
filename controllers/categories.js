let express = require('express')
let db = require('../models')
let router = express.Router()


// GET /categories - show all the categories that exis
router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
      res.render('categories/category', { categories: categories })
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(400).render('main/404')
    })
  })
  
  //GET /categories/:id- show a specific category and all the projects with that category
router.get('/:id', (req, res) => {
    db.category.findOne({
      where: { id: req.params.id },
      include: [db.project]
    })
    .then((category) => {
      if (!category) throw Error()
      console.log(category.projects);
      res.render('categories/show', { category: category })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })

  module.exports = router
