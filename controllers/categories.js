let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then(categories => {
        res.render('categories/categories', {categories: categories})
    })
    .catch((err) => {
        res.status(400).render('main/404')
    })
})

router.get('/:id', (req, res) => {
    db.category.findByPk(req.params.id, {
        include: {
            model: db.project
        }
    })
    .then( () => {
        res.render('categories/details')

    })
    
})



module.exports = router