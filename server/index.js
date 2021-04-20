const express = require('express')
const cors = require('cors')
require('dotenv').config
const cookieParser = require('cookie-parser')


const app = express()

app.use(cookieParser())
app.use(cors())
app.use(express.json())

const authRouter = app.use('/api/auth/', require('./Routes/auth.routes'))
const postsRouter = app.use('/api/posts/', require('./Routes/posts.routes'))


const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Listening to port', PORT)
})
