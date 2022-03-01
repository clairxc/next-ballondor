const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config() // this is so that our .process.env.SECRET works

app.get('/leagues', (req, res) => {
    const options = {
      method: 'get',
      url: 'https://v3.football.api-sports.io/leagues',
      headers: {
        'x-rapidapi-key': `${process.env.FOOTBALL_API_KEY}`,
        'x-rapidapi-host': 'v3.football.api-sports.io'
      }
    };
    
    axios(options)
    .then(function (response) {
      console.log(response.data.response)
      // console.log(JSON.stringify(response.data.team))
    })
    .catch(function (error) {
      console.log(error);
    })
})