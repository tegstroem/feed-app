const imgContainer = document.getElementById('img-container');
const imgEl = document.createElement('img');

   


//Creating an empty array to push the images in
//Intializinf currentPages to start with page 1
//Intitalizing totalPages and giving it value of 20 pages
// intializing image index


let images = [];
let currentPage = 1;
let totalPages = 20;
let currentIndex = 0;
let isDragging = false;
let startPosX = 0;



// fetching all the pages.

function fetchPages(){


  for(let page = 1; page <= totalPages; page++){

    fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`)
    .then(res => res.json())
    .then(data => {
      const allImages = data.data.map( img => img.image_url)
      images = images.concat(allImages);


      if(page === 1){
        renderImage()
      }
    }) .catch(err => console.error("Failed to fetch images:", err));

  }
}

fetchPages()

// Rndering the images for each page that we fetched
function renderImage() {
    if (images.length > 0) {
        imgEl.src = images[currentIndex];
        if (!imgContainer.contains(imgEl)) {
            imgContainer.appendChild(imgEl);
        }
    }
}





function unify(e) {
    return e.changedTouches ? e.changedTouches[0] : e;
}

function lock(e) {
    isDragging = true;
    startPosX = unify(e).clientX;
}

function drag(e) {
    if (!isDragging) return;
 
    // but for a simple swipe, we only need the end position.
    e.preventDefault(); // Prevents unwanted browser actions
}

function move(e) {
    if (!isDragging) return;
    isDragging = false;
    imgContainer.style.cursor = 'grab';
    
/* the variable endPosX side to side postion of an event from where the mouse start to end. 
The unify function - This will help the mouse event have the same function -
when the user swips with the finder*/

    const endPosX = unify(e).clientX;
    const deltaX = endPosX - startPosX;

    // Threshold to consider it a swipe
    if (Math.abs(deltaX) > 50) { 
    if (deltaX < 0) {
    // Swipe left - next image
    currentIndex++;
    if (currentIndex >= images.length) {
        currentIndex = 0; // Loop back to the start
    }
    } else {
    // Swipe right - previous image
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = images.length - 1; // Loop to the end
    }
    }
    renderImage();
    }
    }

// Mouse Event
imgContainer.addEventListener('mousedown', lock, false);
imgContainer.addEventListener('mousemove', drag, false);
imgContainer.addEventListener('mouseup', move, false);
imgContainer.addEventListener('mouseleave', move, false); // In case mouse leaves container while pressed

// Touch Event
imgContainer.addEventListener('touchstart', lock, false);
imgContainer.addEventListener('touchmove', drag, false);
imgContainer.addEventListener('touchend', move, false);

fetchPages()





