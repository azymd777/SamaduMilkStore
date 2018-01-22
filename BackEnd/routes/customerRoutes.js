var express = require('express')
var CustomerRouter = express.Router()
var Customer = require('../models/customer.js')
CustomerRouter.route('/')
    .get(async (req,res) => { 
    await Customer.find({},{__v:0},(err,result)=>
    {
        if(err)
        {
            console.log(err);
            res.status(500).send("Error While fetching Customer data")
        }
        else
        {
            res.status(200).send(result)
        }
    }
    ) 
    })    
    .post((req,res) => {
        var customerdata = req.body
        var customer = new Customer(customerdata)    
        customer.save((err,result)=>
        {
            if(err)
            {
                console.log(err)
                res.status(500).send("Error While fetching Customer data")
            }
            res.sendStatus(200)
        }
        )
    })

    CustomerRouter.route('/:id')
    .get(async (req,res) => {    
        var customer = await Customer.findById(req.params.id,{__v:0},(err,result)=>
        {
            if(err)
            {
                console.log(err);
                res.status(500).send("Error While fetching Customer data")
            }
            else
            {
                res.status(200).send(result)
            }
        }
        )   
       
    })
    .put(function(req, res) {
        const cust = {
          contactno: req.body.contactno,
          name: req.body.name,
          address:
          {
            add1: req.body.address.add1,
            add2: req.body.address.add2,
            pincode: req.body.address.pincode 
          },
          active: req.body.active
        }
        Customer.update({_id: req.params.id}, cust, function(err, raw) {
            if(err)
            {
                console.log(err);
                res.status(500).send("Error While Updating data")
            }
            else
            {
                res.sendStatus(200)
            }
        });
      });
module.exports = CustomerRouter