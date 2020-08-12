let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then(response => {
        res.render('categories/index', {categories: response})
    })
})


router.get('/:id', (req, res) => {
    db.category.findByPk(req.params.id)
    .then(category => {
        category.getProjects()
        .then(projects => {
            res.render('categories/show', { projects: projects, category: category})
        })
    })
})
module.exports = router