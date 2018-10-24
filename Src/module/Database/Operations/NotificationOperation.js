// let db=require('mongoose');
let notificationModel=require('../Schemas/PushnotificationSchema') ;
let NotificationOperations={
    get:function(cb){
        let query=notificationModel.findOne({view:"false"}).sort({timestamp:-1})
        query.exec((err,data)=>{
            if(err)
            cb(err,null)
            console.log("data received from notification db");
            cb(null,data);   
        })},
    post:function(received,cb){
        let obj=new notificationModel(received)
        obj.save((err,data)=>{
            if(err)
            cb(err,null)
            console.log("data Saved into notification db successfully");
            cb(null,data); 
        })
    }
}
module.exports=NotificationOperations;