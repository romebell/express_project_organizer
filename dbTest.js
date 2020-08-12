var db = require('./models')
var async = require('async')
// Create a category: Category model must exist and be migrated

// db.category.create({
//   name: 'node'
// }).then(function(category) {
//   console.log(category.get())
// })

// Create a project and use the helper function create<ModelName> to create a category
// Requires categoriesProjects to exist, be migrated, and properly associated

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


// db.category.findOrCreate({
//   where: { name: 'node' }
// })
// .then(([category, created]) => {
//   console.log(`this was created: ${created}`);
//   console.log(category.get());
// })
// .catch(err => {
//   console.log(`error: ${err}`)
// })

// db.category.findOrCreate({
//   where: {}
// })

// db.project.findOrCreate({
//   where: { name: 'Project Organizer' },
//   defaults: { 
//     githubLink: 'https://github.com/blangwell/express_project_organizer',
//     deployLink: 'https://github.com/blangwell/express_project_organizer',
//     description: 'This is a project where we use express to organize'
//   }
// })
// // take the project that was found or created
// .then(([project, created]) => {
//   console.log(created)
//   //once we've accessed the project table
//   // access the category table
//   db.category.findOrCreate({
//     where: { name: 'node' }
//   })
//   .then(([category, created]) => {
//     console.log(created);
//     // now we make a new category
//     // with sequelize generated addCategory method
//     project.addCategory(category)
//     // have a new relationship between project and category
//     .then(newRelationship => {
//       console.log('new relationship: ')
//       // separated logs because newRelationship is an object
//       console.log(newRelationship)
//     })
//     .catch(err => {
//       console.log(err);
//     })
//   })
//   .catch(err => {
//     console.log(err);
//   })
// })
// .catch(err => {
//   console.log(err);
// })

// each .then needs a .catch
