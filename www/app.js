
  var indexarray=[1,3];
  setTimeout(()=>{document.getElementById('imagecontainer').style.backgroundColor="red"
if(navigator.serviceWorker){
navigator.serviceWorker.register('/serviceWorker.js').then(data=>{
  console.log(data);
}).catch(err=>{
  console.error(err);
})
}
},1000)
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

