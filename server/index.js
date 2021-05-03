const express = require('express')
const cors = require('cors')
require('dotenv').config
const cookieParser = require('cookie-parser')
const morgan = require('morgan')

const app = express()

app.use(morgan('dev'))
app.use(cookieParser())
app.use(cors({ credentials: true, origin: "http://localhost:3000" }))
app.use(express.json())

const authRouter = app.use('/api/auth/', require('./Routes/auth.routes'))
const postsRouter = app.use('/api/posts/', require('./Routes/posts.routes'))
const commentsRouter = app.use('/api/comments/', require('./Routes/comments.routes'))
const companyRouter = app.use('/api/companies', require('./Routes/companies.routes'))
const reviewsRouter = app.use('/api/reviews/', require('./Routes/reviews.routes'))



const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log('Listening to port', PORT)
})
