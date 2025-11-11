const imgContainer = document.getElementById('img-container');
const imgEl = document.createElement('img');
const userEl = document.createElement('h2');
const captionEl = document.createElement('p');
const cameraspecsEl = document.createElement('p');


// Like button elements
const heartBtn = document.getElementById('heartBtn');
const heartIcon = document.getElementById('heartIcon');
const likeCount = document.getElementById('likeCount');



//Creating an empty array to push the images in
//Intializing currentPages to start with page 1
//Intializing totalPages and giving it value of 20 pages
// intializing image index

let images = [];
let totalPages = 20;
let currentIndex = 0;
let isDragging = false;
let startPosX = 0;
let likes = [];




async function fetchPages(){
  
  try{
    for( let page = 1; page <= totalPages; page++){
      const res = await fetch(`https://image-feed-api.vercel.app/api/images?page=${page}`);
      const data = await res.json();
    const  allImages = data.data.map(img => img.image_url)
    images = images.concat(allImages);

    likes = likes.concat(allImages.map(() => 0));

     // Initialize each image’s like count
      images.forEach((_, index) => likes[index] = 0);
    
    
    if(page ===1){
      renderImage()
    }
    }
  }catch(error){
    
    console.log("Error while fetching API", error)
  }finally{
console.log("Fetching images is completed")
  }
}

fetchPages()


// Rendering the images for each page that we fetched
function renderImage() {
  
   
    if (images.length > 0) {
        imgEl.src = images[currentIndex];
        imgEl.classList.add('pic')
        userEl.textContent = getUser(currentIndex);
        captionEl.textContent = getCaption(currentIndex);
        cameraspecsEl.textContent = getCameraSpecs(currentIndex);
        
// Clear container first
        imgContainer.innerHTML = '';

// Create a wrapper for the like button and count
        const likeWrapper = document.createElement('div');
        likeWrapper.classList.add('like-wrapper');
        likeWrapper.appendChild(heartBtn);
        likeWrapper.appendChild(likeCount);
        
// Append elements in desired order
        imgContainer.appendChild(imgEl);       // image first
        imgContainer.appendChild(likeWrapper); // then heart + like count     
        imgContainer.appendChild(userEl);      // then user
        imgContainer.appendChild(captionEl);   // then caption
        imgContainer.appendChild(cameraspecsEl);// then camera specs

// Update like count and heart color
       
       if (likes[currentIndex] > 0) {
          likeCount.textContent = likes[currentIndex];
          likeCount.style.display = 'inline';
          heartIcon.textContent = '🖤';
         } 
       else {
           likeCount.style.display = 'none';
           heartIcon.textContent = '♡';
}
    }
           swipeRightLeftAnimation()
       
      }


  

 //data.js content starts here

/*export function renderPost(post) {
    return {
    name: getUser(post.index),
    caption: getCaption(post.index),
    camera: getCameraSpecs(post.index)
    };
}*/

function getUser(index) {
    const photographers = [
        "Alejandro Torres",
        "Mina Kobayashi",
        "Luca Moretti",
        "Amara Singh",
        "Jonas Müller",
        "Camila Duarte",
        "Noah Andersen",
        "Layla Haddad",
        "Tomasz Kowalski",
        "Elena Petrova"
        ];

    return photographers[index] || "Unknown Photographer";
}

function getCaption(index) {
    const captions = [
        "Gorgeous waterfall in the Sergovna mountains, thanks @charlienelson for the guide",
        "My grandfathers old boat, still going strong after all these years. We use to go fishing every summer. Beautiful memories.",
        "Back to school vibes.",
        "Vintage books.",
        "Jardin de l’Avenue Dorée, Paris.",
        "Skyline view from the rooftop.",
        "The Fangea river seen from the Seneat mountains -March 3, 2024.",
        "Brutalist architecture in Kranj, Slovenia",
        "Thai waters, before the storm....",
        "Details from an architects desk."
    ];
    return captions[index] || "Back to work!";
}

function getCameraSpecs(index) {
    const specs = [
        "Sony A7III | 24-70mm f/2.8",
        "Canon R5 | 16-35mm f/2.8",
        "Nikon Z6 | 70-200mm f/4",
        "Fujifilm X-T4 | 56mm f/1.2",
        "Sony A7R V | 100-400mm GM",
        "Canon EOS R6 Mark II | 35mm f/1.4",
        "Sony A7C II | 85mm f/1.8",
        "Nikon Z8 | 24-120mm f/4",
        "Fujifilm X-H2S | 18-55mm f/2.8-4",
        "Panasonic Lumix S5II | 50mm f/1.4",
        "Leica Q3 | 28mm f/1.7",
        "OM System OM-1 | 12-40mm f/2.8 PRO",
        "Canon EOS R3 | 100-500mm f/4.5-7.1L",
        "Sony FX3 | 24mm f/1.4 GM",
        "Nikon Zf | 40mm f/2"
        ];

    return specs[index] || "Camera info unavailable";
}

// Like button elements
const heartBtn = document.getElementById('heartBtn');
const heartIcon = document.getElementById('heartIcon');
const likeCount = document.getElementById('likeCount');



//Creating an empty array to push the images in
//Intializing currentPages to start with page 1
//Intializing totalPages and giving it value of 20 pages
// intializing image index

let images = [];
let totalPages = 20;
let currentIndex = 0;
let isDragging = false;
let startPosX = 0;
let likes = [];



// fetching all the images in page one.
// Accessing the data array and mapping over the images then pusshing the images inside the array by the their url
// then displaying the images according to it index insde the renderfeed function

function fetchImages(){
    fetch('https://image-feed-api.vercel.app/api/images')
  .then(res => res.json())
  .then( data => {
    images = data.data.map(img => img.image_url);
     
    // Initialize each image’s like count
      images.forEach((_, index) => likes[index] = 0);
    
      if (images.length > 0) {
      renderImage();
    }
  })
  .catch(error => {
    console.log("Error while fetching API", error)
  });
}                           

/*  }catch(error){
    
    console.log("Error while fetching API", error)
  }finally{
console.log("Fetching images is completed")
  }*/

// Rendering the images for each page that we fetched
function renderImage() {
   
    if (images.length > 0) {
        imgEl.src = images[currentIndex];
        userEl.textContent = getUser(currentIndex);
        captionEl.textContent = getCaption(currentIndex);
        cameraspecsEl.textContent = getCameraSpecs(currentIndex);
        
        // Clear container first
        imgContainer.innerHTML = '';
        
        // Append elements in desired order
        imgContainer.appendChild(imgEl);      
        imgContainer.appendChild(userEl);     
        imgContainer.appendChild(captionEl);  
        imgContainer.appendChild(cameraspecsEl); 

        // Update like count and heart color
        likeCount.textContent = likes[currentIndex];
        heartIcon.textContent = likes[currentIndex] > 0 ? '❤️' : '♡';
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


// Like button 

heartBtn.addEventListener('click', () => {

  if (typeof likes[currentIndex] !== 'number') likes[currentIndex] = 0;

  likes[currentIndex] += 1;
  likeCount.textContent = likes[currentIndex];
  likeCount.style.display = 'inline';
  
  heartIcon.textContent = '🖤';
  heartIcon.classList.add('active');
  

  setTimeout(() => {
    heartIcon.classList.remove('active');
  }, 300);
});

fetchImages();