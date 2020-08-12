// var db = require('./models')
// var async = require('async')
// // Create a category: Category model must exist and be migrated

// // db.category.create({
// //   name: 'node'
// // }).then(function(category) {
// //   console.log(category.get())
// // })

// // Create a project and use the helper function create<ModelName> to create a category
// // Requires categoriesProjects to exist, be migrated, and properly associated

// var cats = ['node', 'javascript', 'react', 'css', 'html']

// db.project.create({
//   name: 'PROJECT TWO',
//   deployLink: 'http://github.com/brandiw',
//   githubLink: 'http://github.com/brandiw',
//   description: 'This was a game'
// }).then(function(project) {
//   // IMPROVED VERSION WITH ASYNC
//   // async.forEach(arrayToIterate, iteratorFunctionToRunOnEachItem(item, callback), functionToRunWhenAllComplete)
//   async.forEach(cats, (cat, done) => {
//     db.category.findOrCreate({
//       where: { name: cat }
//     })
//     .spread((category, wasCreated) => {
//       project.addCategory(category)
//       .then(() => {
//         // res.redirect, or whatevs
//         console.log('done adding', cat)
//         done()
//       })
//     })
//   }, () => {
//     console.log('EVERYTHING is done. Now redirect or something')
//   })





//   // TIMING DOESNOT WORK
//   // cats.forEach((cat) => {
//   //   db.category.findOrCreate({
//   //     where: { name: cat }
//   //   })
//   //   .spread((category, wasCreated) => {
//   //     project.addCategory(category)
//   //     .then(() => {
//   //       // res.redirect, or whatevs
//   //       console.log('done adding', cat)
//   //     })
//   //   })
//   // })
//   // console.log('redirect or something')
// })

const db = require('./models')

// db.category.create({
//   name: 'express'
// }).then(function(category) {
//   console.log(category.id)
// })

// db.project.create({
//   name: 'Pokedex'
// }).then(function(category) {
//   console.log(category.id)
// })

// db.project.findOne({
//   where: { id: 1 },
//   include: [db.category]
// })
//   .then((project) => {
//     // by using eager loading, the project model should have a categories key
//     console.log(project.categories)

//     // addCategory function should be available to this model
//     project.addCategory({ name: 'node' })
//       .then((category) => {
//         console.log(category.id)
//       })
//   })

db.project.findOrCreate({
  where: { name: 'Project Organizer' },
  default: { 
  githubLink: 'https://github.com/romebell/express_project_organizer',
  deployLink: 'https://github.com/romebell/express_project_organizer',
  description: 'This is a project where we use express to organize'
}
})
.then(([project, created])=>{
  console.log(created);
  db.category.findOrCreate({
    where: { name: 'node'}
  })
  .then(([category, created])=>{
    console.log(created);
    project.addCategory(category)
    .then(newRelationship => {
      console.log('New Relationship');
      console.log(newRelationship);
    })
    .catch(err => {
      console.log(err);
    })
  })
  .catch(err => {
    console.log(err);
  })
})
.catch(err => {
  console.log(err)
})