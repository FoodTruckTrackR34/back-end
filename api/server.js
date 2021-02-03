const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const server = express()

const authRouter = require('./auth/auth-router')
const trucksRouter = require('./trucks/trucks-router')
const menusRouter = require('./menus/menus-router.js')



server.use(express.json())
server.use(helmet())
server.use(cors())

server.get("/", (req, res) => {
    res.json({api:"up"})
})

server.use('/api/auth', authRouter)
server.use('/api/trucks', trucksRouter)
server.use('/api/menus', menusRouter)


module.exports = server