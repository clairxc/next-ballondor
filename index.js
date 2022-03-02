// import express
const express = require('express')
// create an express instance
const app = express()
// import axios
const axios = require('axios')
// import ejs layouts
const ejsLayouts = require('express-ejs-layouts')
require('dotenv').config() // allows us to access env vars
const cookieParser = require('cookie-parser')
const cryptojs = require('crypto-js')
const db = require('./models')

// MIDDLEWARE
app.set('view engine', 'ejs') // set view engine to ejs
app.use(ejsLayouts) // tell express we want to use layouts
app.use(cookieParser()) // gives us access to req.cookies
app.use(express.urlencoded({extended:false})) // body parser (to make req.body work)

// CUSTOM LOGIN MIDDLEWARE
app.use(async (req, res, next) => {
  // detecs if theres a cookie from signing in, if there is, assign userId
    if(req.cookies.userId) {
        // decrypting the incoming user id from the cookie
        const decryptedId = cryptojs.AES.decrypt(req.cookies.userId, process.env.SECRET)
        // converting the decrypted id into a readable string
        const decryptedIdString = decryptedId.toString(cryptojs.enc.Utf8)
        // querying the db for the user with that id
        const user = await db.user.findByPk(decryptedIdString)
        // assigning the found user to res.locals.user in the routes, and user in the ejs
        res.locals.user = user //res.locals.taco
    } else res.locals.user = null
    next() // move on to next middleware
})


// CONTROLLERS
app.use('/user', require('./controllers/user.js'))
app.use('/user/leagues', require('./controllers/leagues.js'))
app.use('/teams', require('./controllers/teams.js'))
app.use('/players', require('./controllers/players.js'))
app.use('/nominees', require('./controllers/nominees.js'))


// // ROUTES
app.get('/', (req, res) => {
    // res.send('Hello, backend!')
    res.render('home.ejs')
})



// check for an env PORT, otherwise use 8000
const server = app.listen(process.env.PORT || 8000)

// We can export this server to other servers like this
module.exports = server;





// const config = {
//     method: 'get',
//     url: 'https://v3.football.api-sports.io/leagues',
//     headers: {
//       'x-rapidapi-key': `${process.env.FOOTBALL_API_KEY}`,
//       'x-rapidapi-host': 'v3.football.api-sports.io'
//     }
//   };
  
//   axios(config)
//   .then(function (response) {
//     console.log(JSON.stringify(response.data))
//   })
//   .catch(function (error) {
//     console.log(error);
//   })

// // GET request
// app.get('/players', (req, res) => {
//     // let options = {
//     //     method: 'GET',
//     //     url: 'https://v3.football.api-sports.io/players',
//     //     qs: {id: '276', season: '2019'},
//     //     headers: {
//     //       'x-rapidapi-host': 'v3.football.api-sports.io',
//     //       'x-rapidapi-key': '9bd26dba4fe88a433a7b8d1a1f08f687'
//     //     }
//     //   };
      
//     //   axios(options, function (error, response, body) {
//     //       if (error) throw new Error(error);
      
//     //       console.log(body);
//     //   });

//     // let config = {
//     // method: 'get',
//     // url: 'https://v3.football.api-sports.io/{players}',
//     // headers: {
//     //     'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
//     //     'x-rapidapi-host': 'v3.football.api-sports.io'
//     // }
//     // };
//     const authHeader = {
//         headers: {
//             'x-rapidapi-key': process.env.FOOTBALL_API_KEY,
//             'x-rapidapi-host': 'v3.football.api-sports.io'
//         }
//     }
//     let footballUrl = `https://v3.football.api-sports.io/players?season=2019&id=276`
//     // console.log(footballUrl)
//     axios.get(footballUrl, authHeader)
//     .then(function (response) {
//         console.log(response)
//     })
//     // axios(config)
//     // .then(function (response) {
//     // console.log(JSON.stringify(response.data));
//     // })
//     // .catch(function (error) {
//     // console.log(error);
//     // });
// })
