var express=require('express')
var request=require('request');
var env=require('./env');
// const { URL } = require('url');
var http=request.defaults({proxy:env.proxy})

var app=express();
app.use('/',express.static(require('path').join(__dirname,'../www/')));
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
    app.use('/Image',express.static(require('path').join(__dirname,'./module/images')));
    require('fs').readdir(require('path').join(__dirname,'./module/images'),(err,data)=>{
        if(err)
        throw err;
        var OpJson={};
        for(var i=req.query.start;i<=req.query.end;i++){ 
            var baseUrl=(req.headers.referer+req.path.split('/')[1]+"/"+data[i]) 
            const myURL = baseUrl  
        OpJson[i]=myURL;
        }
        res.json(OpJson);
        // res.contentType('image/jpeg');
        // res.send(require('path').join(__dirname,'./module/images',data[1]));
        
    })
})
app.listen(process.env.PORT ||3000);