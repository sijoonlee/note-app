
const path = require('path')
const express = require('express')

const publicDirectoryPath = path.join(__dirname, '../public')

require('./db/mongoose')
const memoRouter = require('./router/memo')

const app = express()
app.use(express.static(publicDirectoryPath))
const port = process.env.PORT

app.use(express.json())
//app.use(userRouter)
app.use(memoRouter)

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})


