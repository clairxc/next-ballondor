const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
const { response } = require('express')
require('dotenv').config() // this is so that our .process.env.SECRET works


// router.get('/teams', (req, res) => {
//     res.send('Hello teams!')
// })

router.get('/', (req, res) => {
    const url = `https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=English%20Premier%20League`
    axios.get(url)
      .then(response => {
        // console.log(response.data)
        const searchResults = response.data
        res.render('teams/teams.ejs', {
            results: searchResults
        })
      })
  })


//   
module.exports = router