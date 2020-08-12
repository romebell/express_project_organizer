let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', (req, res) => {
    db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then((project)=>{
    console.log('😀', project);
    console.log(req.body.category)
    db.category.findOrCreate({
      where : {
        name: req.body.category 
      }
    })
    .then((category)=>{
      project.addCategory(category)
      console.log('🥳', category)
      .then(newRelationship =>{
        res.redirect('/')
        console.log('🥺', newRelationship)
      })
      .catch(err =>{
        console.log('😅', err)
      })
    })
    .catch(err =>{
      console.log('😍', err)
    })
  })
  .catch(err =>{
    console.log('😎', err)
  })
  });
 

// GET /projects/new - display form for creating a new project
router.get('/new', (req, res) => {
  
  res.render('projects/new')
})

// GET /projects/:id - display a specific project
router.get('/:id', (req, res) => {
  db.project.findOne({
    where: { id: req.params.id }
  })
  .then((project) => {
    if (!project) throw Error()
    res.render('projects/show', { project: project })
  })
  .catch((error) => {
    res.status(400).render('main/404')
  })
})



module.exports = router
