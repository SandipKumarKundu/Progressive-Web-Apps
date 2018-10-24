const db=require('mongoose');
let dbConnection=function(){
    console.log(process.env.dbString+"DB string ")
db.connect(process.env.dbString).then(client=>{
console.log(`connection successful          ${client}   `);

}).catch(err=>{
    console.log(`Error while connecting to db   ${err}`);
})
}
module.exports=dbConnection;