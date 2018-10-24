var express=require('express')
var request=require('request');
let dotenv=require('dotenv');
var env=require('./env');dotenv.config({path:require('path').join(__dirname,'config.env')});
let notificationRoutes=require('./module/Routes/notificationRoutes');
let dbconnection=require('./module/Database/Dbconnection')();






var http=request.defaults({proxy:env.proxy})
var app=express();
app.use('/',express.static(require('path').join(__dirname,'../www/')));
app.use('/notify',notificationRoutes);
app.use('/Image',express.static(require('path').join(__dirname,'./module/images')));
app.get('/',(req,res)=>{

    res.sendFile(require('path').join(__dirname,'../www/','index.html'));

})
app.get('/ronaldo',(req,res)=>{
    var url=`https://www.googleapis.com/customsearch/v1?key=${env.apiKey}&cx=${env.cx}&q=mazda&userIp=${env.userIp}`
    var get=http.get(url)
get.on('response',(req,res)=>{
console.log(req,res)
})
get.on('error',(req,res)=>{
    console.log(req)
})
})
app.get('/Image',(req,res)=>{
    
    require('fs').readdir(require('path').join(__dirname,'./module/images'),(err,data)=>{
        if(err)
        throw err;
        var OpJson={};
        for(var i=req.query.start;i<=req.query.end;i++){ 
            var baseUrl=(req.protocol+"://"+req.headers.host+req.path+"/"+data[i]) 
            //console.log(req);
            const myURL = baseUrl  
        OpJson[i]=myURL;
        }
        res.json(OpJson);
        // res.contentType('image/jpeg');
        // res.send(require('path').join(__dirname,'./module/images',data[1]));
        
    })
})
app.listen(process.env.PORT|3001);
