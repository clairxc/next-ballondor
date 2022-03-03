const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
require('dotenv').config() // this is so that our .process.env.SECRET works

// router.get('/', (req, res) => {
//   res.send('Hello nominees!')
// })

// GET /nominees - read/return a page with nominees 
router.get('/', async (req, res) => {
    // TODO: Get all records from the DB and render to view
    try {
      const allNominees = await db.nominee.findAll()
      // res.json(allNominees) -- would use this if we were only trying to get the data back
      res.render('nominees/nominees.ejs', { 
        // res.render would "display" the data vs res.json which just gives the raw data
        nominee: allNominees
      })
    } catch (error) {
      console.log(error)
    }
    // res.send('Render a page of nominees here');
  });

// // try this if the above doesn't work
// router.get('/', async (req, res) => {
//   try {
//     const allNominees = await db.nominee.findAll()
//     res.render(allNominees)
//   } catch (err) {
//     console.log(err)
//   }
// })

// not sure if this works yet, need to test
// post route that will receive the name of player and add it to nominee db and redirect to /nominees
router.post('/', async (req, res) => {
  try{
    await db.nominee.create({
      name: req.body.name
    })
    res.redirect('/nominees') // this should redirect back to nominees route
  } catch (error) {
    console.log(error)
  }
  // res.send(req.body)
})

// DELETE a nominee
router.delete('/:name', (req, res) => {
  db.nominee.destroy({
    where: { name: req.params.name }
  }) .then( deletedNominee => {
    console.log(deletedNominee)
    res.redirect('/nominees')
  }).catch(err => {
    console.log(err)
  })
})



module.exports = router;