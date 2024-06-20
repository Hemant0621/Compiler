const express = require('express')
const cors = require('cors')
const userRouter = require('./Routes/userRoutes')
const compilerRoutes = require('./Routes/compilerRoutes')

const app = express()

app.use(cors())
app.use(express.json())

app.use('/user',userRouter)
app.use('/console',compilerRoutes)

app.listen(3000, () => {
  console.log(`listening on port 3000`)
})