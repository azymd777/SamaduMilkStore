var express = require('express')
var jwt = require('jwt-simple')
var UserRouter = express.Router()
var User = require('../models/user.js')
UserRouter.route('/')
.get(async (req,res) => { 
    await User.find({},{__v:0},(err,result)=>
    {
        if(err)
        {
            console.log(err);
            res.status(500).send("Error While fetching User data")
        }
        else
        {
            res.status(200).send(result)
        }
    }) 
})
.post((req,res) => {
    var userdata = req.body
    var user = new User(userdata)
    user.save((err,result)=>
    {
        if(err)
        {
            console.log(err)
            res.status(500).send("Error While fetching User data")
        }
        res.sendStatus(200)

    }
    )
})

UserRouter.route('/login')
.post(async (req,res) => {
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
module.exports = UserRouter