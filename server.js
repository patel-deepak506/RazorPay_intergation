const express = require('express')
const app = express()
require('dotenv').config()
const Razorpay = require('razorpay')
const cors = require('cors')

app.use(express.json())
app.use(cors())

var instance = new Razorpay({ key_id: process.env.key_id, key_secret: process.env.key_secret })


app.post('/payments', async(req, res)=>{
    try {
        const order = await instance.orders.create({
            amount: req.body.amount,
            currency: "INR",
            receipt: "receipt#1",
            notes: {
              key1: "value3",
              key2: "value2"
            }
          })
          console.log(order)

         return res.send({message: "payments created" , orderId:order.id})
        
        
    } catch (error) {
        console.log(error)
    res.send({message:"getting internal server error" , error:error})
        
    }
})



app.listen(process.env.PORT, ()=>console.log('server is  listening on port '+process.env.PORT))