var express = require('express')
//var cors = require('cors')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var app = express()

//app.use(cors)
app.use(bodyparser.json())
//app.use(bodyparser.text()) to send text data in the body

var UserRouter = require('./routes/userRoutes')
var CustomerRouter = require('./routes/customerRoutes')
var CustomerTranRouter = require('./routes/custTranRoutes')

app.use('/user',UserRouter)
app.use('/customer',CustomerRouter)
app.use('/custtran',CustomerTranRouter)

app.get('/',(req,res) => {
    res.send('bismillah')
})

mongoose.connect('mongodb://samadu:hajira@ds261247.mlab.com:61247/samadu',(err)=>{
    if(!err)
    {
        console.log('connected suucessfully')
    }
})
app.listen(process.env.PORT || 3000)