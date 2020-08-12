let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /categories
router.get('/', (req, res) => {
    db.category.findAll()
    .then((categories) => {
      res.render('main/index', { categories: categories })
    })
    .catch((error) => {
      console.log('Error in GET /', error)
      res.status(400).render('main/404')
    })
  })

// GET /categories/:id
router.get('/:id', (req, res) => {
    db.category.findOne({
      where: { id: req.params.id }
    })
      .then((category) => {
        if (!category) throw Error()
        res.render('categories/show', { category: category })
      })
      .catch((error) => {
        res.status(400).render('main/404')
      })
  })

module.exports = router