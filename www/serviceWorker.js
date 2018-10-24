var CACHE_VERSION = 1;
let notificationObj={
    body: '',
    icon: '',
    tag: '',
    image:'',
    requireInteraction:'',
    badge:'',
    
};
// Shorthand identifier mapped to specific versioned cache.
var CURRENT_CACHES = {
  font: 'font-cache-v' + CACHE_VERSION
};

self.addEventListener('install',function(event){

    console.log(event);
})
self.addEventListener('activate',function(event){
    console.log(event);
    Old_CacheKeys=Object.keys(CURRENT_CACHES);
    event.waitUntil(
        caches.keys().then(CacheKeys=>{
            return Promise.all(CacheKeys.map((key)=>{
                if(!Old_CacheKeys.includes(key)){
                    console.log("Deleting old Cache",key);
                    return caches.delete(key);
                }
            }))
        }).catch(err=>{
            console.error("Error While Deleting Old cache",err);
        })
    )
})
self.addEventListener('fetch', event => {
    console.log('Fetching:', event.request.url);
    if(event.request.url.includes("notify"))
    {
     
         fetch(event.request).then(networkResponse=>{
            networkResponse.json().then(options=>{
                console.log("data received from notifications");
                for(keys in notificationObj){
                    notificationObj[keys]=options[keys ]
                }
                self.registration.showNotification(options.title,notificationObj)
            }).catch(err=>{
                throw err;
            })
    }).catch(err=>{
        console.error("Error Happened While fetching data from cache",err);
        throw err;
    })

    }
    else{
    event.respondWith(
    caches.open(CURRENT_CACHES['font']).then(matchedCache=>{
        return matchedCache.match(event.request).then(response=>{
            if(response){
                console.log("Response from cache")
                return response
            }
            console.log("Response from Network")
            return fetch(event.request).then(networkResponse=>{
                matchedCache.put(event.request,networkResponse.clone())
                return networkResponse
            })
        }).catch(err=>{
            console.error("Error Happened While fetching data from cache",err);
            throw err;
        })
    })
    )
}
  });