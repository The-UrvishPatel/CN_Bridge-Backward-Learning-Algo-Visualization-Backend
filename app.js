//imports
require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express()

const cors = require('cors')


//routes
const routes = require('./routes/index')


//middlewares
const middlewares  = require('./middlewares/index')


//variables
const PORT = process.env.PORT || 5000






//middlewares

// app.use(express.static('./public'))
app.use(cors())
app.use(express.json())




//routes
app.use('/', routes.bridge)


    //temp
      app.get('/', (req,res)=>{

          res.send("<h1>CN Innovative Assignment!!!</h1>")

      })




//errors

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)





const start = async () => {

  try {
    
    app.listen(PORT, () => console.log(`Server is running at http://127.0.0.1:${PORT}`) )

  } catch (error) {

    console.log(error)
  
  }
}
  
start()