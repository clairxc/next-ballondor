const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
require('dotenv').config() // this is so that our .process.env.SECRET works

// router.get('/', (req, res) => {
//   const url = `https://www.thesportsdb.com/api/v1/json/2/search_all_leagues.php?s=Soccer`
//   axios.get(url)
//       .then(response => {
//           console.log(response.data)
//           return axios.get(`https://www.thesportsdb.com/api/v1/json/2/search_all_teams.php?l=${response.data.leagues[0].strLeague}`)
//       })
//       .then(response => {
//           console.log(response.data)
//       })
// })

// premier league
router.get('/', (req, res) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/all_leagues.php`
  axios.get(url)
    .then(response => {
      console.log(response.data)
    })
    res.render('leagues/leagues.ejs')
})


// router.get('/', (req, res) => {
//     const options = {
//       method: 'get',
//       url: 'https://v3.football.api-sports.io/leagues',
//       headers: {
//         'x-rapidapi-key': `${process.env.FOOTBALL_API_KEY}`,
//         'x-rapidapi-host': 'v3.football.api-sports.io'
//       }
//     };
    
//     axios(options)
//     .then(function (response) {
//       console.log(response.data.response)
//       // console.log(JSON.stringify(response.data.team))
//       const topLeagues = response.data.response.slice(0,5)
//       res.send(topLeagues)
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
// })

// export all these routes to the entry point file
module.exports = router