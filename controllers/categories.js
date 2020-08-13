let express = require('express')
let db = require('../models')
let router = express.Router()

//get all projects under a category

router.get('/', (req, res) =>{
    db.category.findAll()
    .then(categories =>{
        res.render('categories/index', {categories: categories})
    }).catch(err =>{console.log("error", err)})
})
//get id
router.get('/:id', (req, res) =>{
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    }).then(category =>{
        console.log(category.projects)
        res.render('categories/show', {category})
    }).catch(err=>console.log("Error", err))
})
module.exports = router