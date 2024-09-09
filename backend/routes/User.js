const express = require('express')
const router = express.Router()

const {
    register,
    profile ,
    login,
    logout ,
    mail , 
    searchUser
} = require("../controller/User")

router.route('/register').post(register)
router.route('/profile').post(profile)
router.route('/login').post(login)
router.route('/logout').post(logout)
router.route('/mail').post(mail)
router.route('/searchUser').post(searchUser)

module.exports = router