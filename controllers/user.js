const express = require('express')
const router = express.Router()
const db = require('../models')
const bcrypt = require('bcrypt')
const cryptojs = require('crypto-js')
require('dotenv').config() // this is so that our .process.env.SECRET works


// // GET profile page
// router.get('/profile', (req, res) => {
//     res.render('user/profile.ejs')
// })


router.get('/new', (req, res) => {
    res.render('user/new.ejs')
})

// sign up route
router.post('/', async (req, res) => {
    // we make a [] instead of just doing db.user.findOrCreate bc we need somewhere for the data to be returned so that we can see it. if we didnt need to SEE the data, we would just be able to do db.user.findOrCreate
    const [newUser, created] = await db.user.findOrCreate({
        where: {email: req.body.email}
    }) 
    if(!created){ // this is saying if the user already exists/already created
        console.log('User already exists')
        // render the login page and send an appropriate message
    } else {
        // hash the password
        const hashedPassword = bcrypt.hashSync(req.body.password, 10) //10 denotes the salt rounds
        newUser.password = hashedPassword //change from req.body.password to hashedPassword
        await newUser.save() // if its a databse transaction, good to put await

        // encrypt the user id via AES
        const encryptedUserId = cryptojs.AES.encrypt(newUser.id.toString(), process.env.SECRET) // process.env.SECRET is our 2nd arg
        const encryptedUserIdString = encryptedUserId.toString()
        console.log(encryptedUserIdString)
        // store the encrypted id in the cookie of the res obj
        res.cookie('userId', encryptedUserIdString) // key, value
        // redirect back to home page
        res.redirect('/')
    }
})

// login route
router.get('/login', (req, res) => {
    res.render('user/login.ejs', {error: null})
})

// login POST route
router.post('/login', async (req, res) => {
    const user = await db.user.findOne({
        where: {email: req.body.email}
    })
    if(!user) {
        console.log('user not found!')
        res.render('user/login.ejs', {error: 'Invalid email/password'}) //passing through an error message
    } else if(!bcrypt.compareSync(req.body.password, user.password)) {
        console.log('Incorrect Password')
        res.render('user/login.ejs', {error: 'Invalid email/password'})
    } else {
        console.log('logging in the user!')
        // copy and paste from above
        // encrypt the user id via AES
        // we need to change newUser to user.id.toString bc its NOT a new user
        const encryptedUserId = cryptojs.AES.encrypt(user.id.toString(), process.env.SECRET) //process.env.SECRET is our 2nd argument
        const encryptedUserIdString = encryptedUserId.toString()
        console.log(encryptedUserIdString)
        // store the encrypted id in the cookie of the res obj
        res.cookie('userId', encryptedUserIdString) // key, value
        // redirect back to home page
        res.redirect('/')
    }
})

// logout route
router.get('/logout', (req, res) => {
    // log out
    console.log('logging out')
    // clear the cookie after logging out
    res.clearCookie('userId')
    // after logging out, we redirect back to the home page
    res.redirect('/')
})

// export all these routes to the entry point file
module.exports = router