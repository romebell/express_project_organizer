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
    db.category.findByPk(req.params.id)
    .then(cat => {
        cat.getProjects()
        .then(hamburgers => {
            res.render('categories/show', { proj: hamburgers, cat: cat })
        })
    })
})


// router.get('/:id', (req, res) => {
//     db.category.findByPk(req.params.id)
//         // include: {
//         //     model: db.project       
//         // }
//         .then(cat => {
//             cat.getProjects()
//             .then(proj => {

//                 res.render('categories/details', {cat: cat, proj: proj})
//             })
//             .catch(err => {
//                 console.log('Error: ', err)
//             })
//         })
//         .catch(err => {
//             console.log('Error: ', err)
//         })

        
//     })
    




module.exports = router