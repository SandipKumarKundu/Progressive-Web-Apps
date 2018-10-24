
  var indexarray=[1,3];
  setTimeout(()=>{document.getElementById('imagecontainer').style.backgroundColor="red"
if(navigator.serviceWorker){
navigator.serviceWorker.register('/serviceWorker.js').then(data=>{
  console.log(data);
}).catch(err=>{
  console.error(err);
})
}
if('Notification' in window){
  console.log("Notification available");
   if (Notification.permission === "granted") {
    // If it's okay let's create a notification
    getNotification();
    // var notification = new Notification("Hi there!");
  }
else if(Notification.permission === "denied") {
  // If it's okay let's create a notification
  console.log("User has denied for notification");
}
else{
Notification.requestPermission().then(data=>{
  if(data=="granted"){
     console.log("User has granted notifications");
     getNotification();
  }
}).catch(err=>{console.error("error Happened while asking for notification permission")})
} 
}
},1000)
function getNotification(){
  fetch('notify').then(req=>{
    console.log("data is received from fetching notifications");
    req.json().then((JsonData)=>{
      
    }).catch(err=>{console.error(err)});
}).catch(err=>{console.error(err)});
}
var getImage=function (){
fetch(`Image?start=${indexarray[0]}&end=${indexarray[1]}`).then((req)=>{
  req.json().then(data=>{
    console.log(data)
    for (const key in data) {
      var img=document.createElement('img')
      img.src=data[key];
      document.getElementById('imagecontainer').appendChild(img)
    }
    indexarray[0]+=3;
    indexarray[1]+=3;
 // document.createElement('img').src=data
  
  
  })
  .catch(err=>{
    console.error(err);
  })
})
.catch(err=>{
  console.error(err);
})
}

