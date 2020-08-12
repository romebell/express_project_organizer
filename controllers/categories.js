const router = require("./projects");
// const router = require("./categories")
let express = require('express')
let db = require('../models')
// let router = express.Router()



router.get('/', (req, res) =>{
    db.category.findAll()
    .then((category) => {
        if (!category) throw Error()
        res.render('categories/index', { categories: category })
    })
})

router.get('/:id', (req, res) => {
    db.category.findOne({
      where: { id: req.params.id },
      include: [db.project]
      
    })
    .then((category) => {
      if (!category) throw Error()
      res.render('categories/show', { category })
    })
    .catch((error) => {
      res.status(400).render('main/404')
    })
  })





module.exports = router