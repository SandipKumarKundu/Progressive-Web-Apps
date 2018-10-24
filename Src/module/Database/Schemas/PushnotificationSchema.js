let db=require('mongoose');
let schema=new db.Schema({
    actions:{type:String,default:''},
    badge:String,
    body :String,
    tag:{type:String,default:'MyPwa'},
    icon :{type:String,default:'/images/fog.png'},
    image :{type:String,default:'/images/clear.png'},
    requireInteraction :{type:Boolean,default:true},
    timestamp:{type:Date,default:Date.now()},
    title :String,
    view:Boolean,
    actionType:String,
    

});
var model=db.model("Notification",schema);
module.exports=model;