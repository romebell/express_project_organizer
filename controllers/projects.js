let express = require('express')
let db = require('../models')
let router = express.Router()

// POST /projects - create a new project
router.post('/', async (req, res) => {
  await db.project.create({
    name: req.body.name,
    githubLink: req.body.githubLink,
    deployLink: req.body.deployedLink,
    description: req.body.description
  })
  .then(([project, created])=>{
    console.log('line 32', created);
    db.category.findOrCreate({
      where : {
        name: req.body.category 
      }
    })
    .then(([category, created])=>{
      project.addCategory(category)
      console.log('line 39', created)
      .then(newRelationship =>{
        console.log('line 41', newRelationship)
      })
      .catch(err =>{
        console.log('line 44', err)
      })
    })
    .catch(err =>{
      console.log('line 48', err)
    })
  })
  .catch(err =>{
    console.log('line 52', err)
  })
    res.redirect('/')
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
