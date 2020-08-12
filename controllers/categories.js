let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then(categories => {
        res.render('categories/show', {categories})
    })
    .catch(err => {
        res.status(400).render('main/404')
    })
})

router.get('/:id', (req, res) => {
    db.category.findByPk(req.params.id, {
        include: {model: db.project}
    })
    .then(category => {
        res.render('categories/detail', {category: category})
    })
})

module.exports = router