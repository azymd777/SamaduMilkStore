var mongoose = require('mongoose')

module.exports = mongoose.model('user',{
    name: { type: String, require:true },
    uid: { type: String, require:true, index: {unique: true, dropDups: true} },
    pwd: { type: String, require:true },    
    createddt: { type: Date, default: Date.now },
    role: { type: String }

})