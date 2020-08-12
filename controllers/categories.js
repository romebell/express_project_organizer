let express = require('express')
let db = require('../models')
let router = require('./projects')


// router.get('/new', (req, res) => {
//     res.render('categories/new')
//   })
route.get('/', (req, res)=> {
    db.category.findAll()
    .then((category)=> {
        res.render('categories/index', { categories: category })
    })
    .catch(err => {
        console.log(err);
    })
})

router.get('/:id', (req, res) => {
    db.category.findOne({
      where: { id: req.params.id }
    })
    .then((category) => {
      if (!category) throw Error()
      res.render('category/show', { category: category })
    })
    .catch((err) => {
      res.status(400).render('main/404')
    })
  })

module.exports = router
