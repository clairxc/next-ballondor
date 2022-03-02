const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
const axios = require('axios')
require('dotenv').config() // this is so that our .process.env.SECRET works






module.exports = router

// export all these routes to the entry point file
// router.get('/', (req, res) => {
//     console.log(process.env.FOOTBALL_API_KEY)
//     const options = {
//       method: 'get',
//       url: 'https://v3.football.api-sports.io/players?league=39',
//     //   qs: {league: '39'},
//       headers: {
//         'x-rapidapi-key': `${process.env.FOOTBALL_API_KEY}`,
//         'x-rapidapi-host': 'v3.football.api-sports.io'
//       }
//     }
    
//     axios(options)
//     .then(function (response) {
//       console.log(response.data)
//       // console.log(JSON.stringify(response.data.team))
//     //   const allPlayers = response.data.response
//       res.send(response.data)
//     })
//     .catch(function (error) {
//       console.log(error);
//     })
// })