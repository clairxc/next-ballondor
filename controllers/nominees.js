const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
require('dotenv').config() // this is so that our .process.env.SECRET works



// GET /nominees - return a page with nominees 
router.get('/', async (req, res) => {
    // TODO: Get all records from the DB and render to view
    try {
      const allNominees = await db.nominee.findAll()
      // res.json(allFaves) -- would use this if we were only trying to get the data back
      res.render('nominees/nominees.ejs', { // i originally had it as ./pokemon, but this is not necessary, can just put pokemon/index.ejs
        // res.render would "display" the data vs res.json which just gives the raw data
        nominee: allNominees
      })
    } catch (error) {
      console.log(error)
    }
    // res.send('Render a page of favorites here');
  });
  
  // POST /nominees - receive the name of nominee and add it to the database
  router.post('/', async (req, res) => {
    // TODO: Get form data and add a new record to DB
    try {
      await db.nominee.create({
        name: req.body.name
      })
      res.redirect('/nominees') //this redirects back to the nominees page
    } catch (error) {
      console.log(error)
    }
    // res.send(req.body);
  });


  // DELETE A nominee 
router.delete("/:name", (req,res) => {
  db.nominee.destroy({
      where: {name: req.params.name}
  }).then( deletedNominee => {
      console.log(deletedNominee);
      res.redirect("/nominees");
  }).catch(err => {
      console.log(err);
  })
});


module.exports = router;