let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
  db.category.findAll()
    .then(categories => {
      console.log(categories)
      res.render('categories/index', { categories: categories })
    }).catch(error => {
      console.log(error)
      res.render('main/404')
    })
})

router.get('/:id', (req, res) => {
  db.category.findOne({
    where: { id: req.params.id },
    include: { model: db.project }
  }).then(category => {
      res.render('categories/show', { category: category })
    }).catch(error => {
      console.log(error)
      res.render('main/404')
    })
})

module.exports = router
