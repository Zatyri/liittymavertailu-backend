const config = require('./utils/config')
const express = require('express')
const app = express()
const cors = require('cors')
const liittymatRouter = require('./controllers/liittymat')
const usersRouter = require('./controllers/users')
const loginRouter = require('./controllers/login')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const mongoose = require('mongoose')
const morgan = require('morgan')

app.use(morgan('tiny'))

logger.info('connecting to', config.MONGODB_URI)

mongoose.connect(config.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true})
.then(() => {
    logger.info('connected to MongoDB')
})
.catch((error) => {
    logger.error('error connecting to MongoDb:', error.message)
})


app.use(cors())
app.use(express.static('build'))
app.use(express.json())

app.use('/api/liittymat', liittymatRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

module.exports = app



