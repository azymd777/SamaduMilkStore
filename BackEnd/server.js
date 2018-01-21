var express = require('express')
//var cors = require('cors')
var mongoose = require('mongoose')
var bodyparser = require('body-parser')
var jwt = require('jwt-simple')
var app = express()

//app.use(cors)
app.use(bodyparser.json())
//app.use(bodyparser.text()) to send text data in the body
var User = require('./models/user.js')
var Customer = require('./models/customer.js')
var Custtran = require('./models/custTransaction.js')
app.get('/',(req,res) => {
    res.send('bismillah')
})

app.get('/user', async (req,res) => {
 
    var user = await User.find({},{__v:0})
    res.send(user);   
})

app.get('/customer', async (req,res) => {
 
    var customer = await Customer.find({},{__v:0}).sort({name:1})
    res.send(customer);   
})
app.post('/login', async (req,res) => {
    var logindata = req.body;
    var user = await User.findOne({uid:logindata.uid},{__v:0,createddt:0})
    if(user!=null)
    {
        if(user.pwd == logindata.pwd )
        {
            var payload = {
                _id:user._id,
                name:user.name
            }
            var token = jwt.encode(payload,'321')
            res.send(token);
        }
    }
    res.sendStatus(401)  
   
})
app.get('/customer/:id', async (req,res) => {
    
    var customer = await Customer.findById(req.params.id,{__v:0})
    res.send(customer);   
   
})
app.get('/custtran/:id', async (req,res) => {
    
    var customertran = await Custtran.findById(req.params.id,{__v:0})
    res.send(customertran);   
   
})

app.get('/custtran', async (req,res) => {
 
    var customertran = await Custtran.find({},{__v:0})
    res.send(customertran);   
})
app.post('/user',(req,res) => {
    var userdata = req.body
    var user = new User(userdata)

    user.save((err,result)=>
    {
        if(err)
            console.log(err)
            res.sendStatus(200);
    }
    )
})

app.post('/customer',(req,res) => {
    var customerdata = req.body
    var customer = new Customer(customerdata)

    customer.save((err,result)=>
    {
        if(err)
            console.log(err)
            res.sendStatus(200);
    }
    )
})

app.post('/custtran',(req,res) => {
    var custtrandata = req.body
    var custtran = new Custtran(custtrandata)

    custtran.save((err,result)=>
    {
        if(err)
            console.log(err)
            res.sendStatus(200);
    }
    )
})

app.put('/customer/:id', function(req, res) {
    const cust = {
      contactno: req.body.contactno,
      name: req.body.name
    }
    Customer.update({_id: req.params.id}, cust, function(err, raw) {
      if (err) {
        res.send(err);
      }
      res.send(raw);
    });
  });

  app.put('/custtran/:id', function(req, res) {
    const custtran = {
      when: req.body.when,
      ltr: req.body.ltr
    }
    Custtran.update({_id: req.params.id}, custtran, function(err, raw) {
      if (err) {
        res.send(err);
      }
      res.send(raw);
    });
  });


mongoose.connect('mongodb://samadu:hajira@ds261247.mlab.com:61247/samadu',(err)=>{
    if(!err)
    {
        console.log('connected suucessfully')
    }
})
app.listen(3000)