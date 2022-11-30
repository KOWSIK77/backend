const express = require('express')
const app = express()
const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

//Routes
const UserRoutes = require('./routes/users')
const register = require('./routes/auth')

const dbConnect = async (req,res)=>{
    try {
        const data= await mongoose.connect(process.env.MONGODB_URL)
console.log('connection success');
    } catch (error) {
        console.log('something went wrong: '+ error)
    }
}
dbConnect()

app.use(express.json())


app.use('/api',UserRoutes)
app.use('/api',register)



app.listen(process.env.PORT || 5000,()=>{
    console.log('server listening');
})
