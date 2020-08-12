let express = require('express')
let db = require('../models')
let router = express.Router()

// GET /projects/new - display form for creating new categories
router.get('/new', (req, res) => {
    db.category.findAll()
    .then((categories)=>{
      res.render('categories/index', {categories: categories})
    })
    .catch((err)=>{
      console.log('error', err)
    })
  })

router.get('/:id', (req, res)=>{
    db.category.findOne({
        where: {id: req.params.id},
        include: { model: db.project }
    })
    .then((category)=>{
        if(!category)throw Error()
        res.render('categories/show', {category: category})
    })
    .catch(err=>{
        console.log('Error', err)
    })
})

module.exports = router