var express=require('express');
let notification=require('../Database/Operations/NotificationOperation');
let router=express.Router();
let parser=require('body-parser');
router.use(parser.json());
router.get('/',(req,res)=>{
notification.get((err,data)=>{
    if (err){
        console.error(`Error happened while fetching data from Database ${err}`);
        throw err;
    }
    console.log(`Data received from notification db ${data}`);
    res.json(data);
})
})
router.post('/',(req,res)=>{
    var data=req.body
    notification.post(data,(err,data)=>{
        if(err){
            console.error(`Error happened while posting notification in notification db ${err}`);
            throw err;
        }
        console.log(`Data from notification db ${data}`);
    })
    res.send('okey')
})
module.exports=router;