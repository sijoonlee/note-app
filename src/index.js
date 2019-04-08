
const path = require('path')
const express = require('express')
const bcrypt = require('bcryptjs')

// /home/sijoonlee/mongodb4.0.6/bin/mongod --dbpath=/home/sijoonlee/Documents/mongodb_data
const publicDirectoryPath = path.join(__dirname, '../public')
// const viewsPath = path.join(__dirname, '../templates/views')
// const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location


require('./db/mongoose')
const memoRouter = require('./router/memo')

const app = express()
app.use(express.static(publicDirectoryPath))
const port = process.env.PORT
//https://www.npmjs.com/package/env-cmd

app.use(express.json())
//app.use(userRouter)
app.use(memoRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


