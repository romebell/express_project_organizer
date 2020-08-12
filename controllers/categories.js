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
      // res.status(400).render('main/404')
    })
  })
  

  module.exports = router
