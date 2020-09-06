const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const logger = require('../utils/logger')

usersRouter.get('/', async(request, response) => {
    try {
        const users = await User.find({})
        response.json(users.map(x => x.toJSON()))
    } catch (error) {
        logger.error(error)
    }
})

usersRouter.post('/', async(request, response) => {
    const body = request.body
    try {
        const saltRounds = 10
        const passwordHash = await bcrypt.hash(body.password, saltRounds)

        const user = new User({
            username: body.username,
            name: body.name,
            passwordHash,
          })
        
          const savedUser = await user.save()

          response.json(savedUser)
        
    } catch (error) {
        logger.error(error)
    }
})


module.exports = usersRouter