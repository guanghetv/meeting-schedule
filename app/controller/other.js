'use strict';
const MongoClient = require('mongodb').MongoClient;
const config = require('../../config/config.default')
class OtherController {
  static async unbindPhone(ctx) {
    const phone = ctx.params.phone
    const phoneArray = phone.split('')    
    phoneArray.shift()
    phoneArray.push(String.fromCharCode(Math.floor(Math.random() * 26) + 65))
    const newPhone = phoneArray.join('')
    console.log(newPhone)
    // Connection url
    const url = 'mongodb://10.8.8.8:27017/onions4';
    // Connect using MongoClient
    MongoClient.connect(url, function(err, db) {
        // Create a collection we want to drop later
        const col = db.collection('users');
        col.updateOne({ phone: phone }, { $set: { phone: newPhone , verifiedByPhone: false } })
        // Insert a bunch of documents
        db.close()
        
    });
    ctx.status = 204
  }  
}

module.exports = OtherController;
