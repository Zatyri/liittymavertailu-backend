const jwr = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const loginRouter = require('express').Router()
const User = require('../models/user')

loginRouter.post('/', async (request, response) => {
    
    try {
        const body = request.body
        const user = await User.findOne({username: body.username})
        
        const correctPassword = user === null ? false : await bcrypt.compare(body.password, user.passwordHash)
        
        if(!(user && correctPassword)){
            return response.status(401).json({
                error: 'Väärä salasana tai käyttäjänimi'
            })
        }
        
        const userToken = {
            username: user.username,
            id: user._id
        }

        const token = jwr.sign(userToken, process.env.SECRET)

        response.status(200).send({token, username: user.username, name: user.name})
    } catch (error) {
        console.log(error.message)
    }
    
})

module.exports = loginRouter