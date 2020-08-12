let express = require('express')
let db = require('../models')
let router = express.Router()

router.get('/', (req, res) => {
    db.category.findAll()
    .then(response => {
        res.render('categories/index', { categories: response })
    }).catch(err => {console.log('Error ', err)})
})


// router.get('/:id', (req, res) => {
//     db.category.findByPk(req.params.id)
//     .then(category => {
//         category.getProjects()
//         .then(projects => {
//             res.render('categories/show', { projects: projects, category: category })
//         }).catch(err => {console.log('Error ', err)})
//     }).catch(err => {console.log('Error ', err)})
// })


// petes findOne variation
// only one .then()
router.get('/:id', (req, res) => {
    db.category.findOne({
        where: { id: req.params.id },
        include: [db.project]
    })
    .then(category => {
        console.log(category.projects)
        res.render('categories/show', {category})
    })
    .catch(err => {console.log('Error ', err)})
})

module.exports = router