const imgContainer = document.getElementById('img-container');
const imgEl = document.createElement('img');

   


//Creating an empty array to push the images in
// intializing image index

let images = [];
let currentIndex = 0;
let isDragging = false;
let startPosX = 0;



// fetching all the images in page one.
// Accessing the data array and mapping over the images then pusshing the images inside the array by the their url
// then displaying the images according to it index insde the renderfeed function

function fetchImages(){
    fetch('https://image-feed-api.vercel.app/api/images')
  .then(res => res.json())
  .then( data => {
    images = data.data.map(img => img.image_url);
    if (images.length > 0) {
      renderImage();
    }
    
  })
  .catch(err => console.error("Failed to fetch images:", err));

  
  
}


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
The unify function (chat-gtp) - This will help the mouse event have the same function -
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

fetchImages();

// Like button functionality
const heartBtn = document.getElementById('heartBtn');
const heartIcon = document.getElementById('heartIcon');
const likeCount = document.getElementById('likeCount');


let likes = parseInt(likeCount.textContent,10) || 0;

 heartBtn.addEventListener('click', () => {
  likes += 1;
  likeCount.textContent = likes;

  heartIcon.textContent = '❤️';
  setTimeout(() => {
    heartIcon.textContent = '♡';
  }, 300);
});

