import express from 'express'
import cors from 'cors'
import router from '../server/Router/router.js'

const app = express()
app.use(cors({
    origin: 'http://localhost:5173', // Allow requests from this origin
  }));
  
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use('/trackWallet',router)

app.listen(5000,() =>{
    console.log("PORT 5000 is Running")
})