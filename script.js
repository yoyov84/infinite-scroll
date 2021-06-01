const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');


let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];
let initialLoad = true;  //** */ pour la performance


//Unsplash API
let count = 5;
const apiKey = 'MtHNe0hP-WQtVeJCs7msqsGNEokU33jPNSoABfH_0kc';
let apiUrl=`https://api.unsplash.com/photos/random?client_id=${apiKey}&count=${count}`;

// Check if all image were loaded
function imageLoaded(){
    imagesLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        // initialLoad = false;
        // count = 30;
    }
}

// Helper Function to Set Attributes on DoM  Elements
function setAttributes(element, attributes){
    for(const key in attributes){
        element.setAttribute(key, attributes[key]);
    }
}


// Create Elements for Links & Photos, Add to Dom 
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo) => {
        // Create <a> to link to Unsplash
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html, 
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });

        // Event Listener, check when each is finished loading
        img.addEventListener('load', imageLoaded);


        // Put <img> inside <a>, then put both inside image container Element.
        item.appendChild(img);
        imageContainer.appendChild(item);
    })

}

// Get photos from Unsplash API
async function getPhotos(){
    try{
        const response = await fetch(apiUrl);
        photosArray = await response.json();
        displayPhotos();
        if(isInitialLoad){  //** */ pour la performance
            updateAPIURLWithNewCount(30)  //** */ pour la performance
            isInitialLoad = false; //** */ pour la performance
        } //** */ pour la performance
    } catch (error) {
        //Catch Error Here
    }
}

// Check to see if scrolling near bottom of page, Load More Photos from
window .addEventListener('scroll', () =>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

//ON load
getPhotos();








// // Create Elements for Links & Photos, Add to Dom (avant key methode)
// function displayPhotos(){
//     //Run function for each object in photosArray
//     photosArray.forEach((photo) => {
//         // Create <a> to link to Unsplash
//         const item = document.createElement('a');
//         item.setAttribute('href', photo.links.html);
//         item.setAttribute('target', '_blank');
//         // Create <img> for photo
//         const img = document.createElement('img');
//         img.setAttribute('src', photo.urls.regular);
//         img.setAttribute('alt', photo.alt_description);
//         img.setAttribute('title', photo.alt_description);
//         // Put <img> inside <a>, then put both inside image container Element.
//         item.appendChild(img);
//         imageContainer.appendChild(item);
//     })

// }




// // Get photos from Unsplash API
// async function getPhotos(){
//     try{
//         const response = await fetch(apiUrl);
//         photosArray = await response.json();
//         displayPhotos();
//     } catch (error) {
//         //Catch Error Here
//     }
// }

// //ON load
// getPhotos();
