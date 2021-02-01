const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()

const authRouter = require('./auth/auth-router')
const dinersRouter = require('./diners/diners-router')
const operatorsRouter = require('./operators/operators-router')
const trucksRouter = require('./trucks/trucks-router')



server.use(express.json())
server.use(helmet())
server.use(cors())

server.get("/", (req, res) => {
    res.json({api:"up"})
})

server.use('/api/auth', authRouter)
server.use('/api/diners', dinersRouter)
server.use('/api/operators', operatorsRouter)
server.use('/api/trucks', trucksRouter)


module.exports = server