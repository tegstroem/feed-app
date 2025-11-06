const imgContainer = document.getElementById('img-container');
const imgEl = document.createElement('img');

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
        if (!imgContainer.contains(imgEl)) {
            imgContainer.appendChild(imgEl);
          
        }
     
        // ensure likes[currentIndex] is defined
    const currentLikes = (typeof likes[currentIndex] === 'number') ? likes[currentIndex] : 0;
    
    likeCount.textContent = likes[currentIndex];
    heartIcon.textContent = likes[currentIndex] > 0 ? '🖤' : '♡';

    if (currentIndex === 0 && !localStorage.getItem('SwipeDemoShown')) {
      swipeRightAnimation();
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



// Like button 


heartBtn.addEventListener('click', () => {

  if (typeof likes[currentIndex] !== 'number') likes[currentIndex] = 0;

  likes[currentIndex] += 1;
  likeCount.textContent = likes[currentIndex];

  heartIcon.textContent = '🖤';
  heartIcon.classList.add('active');

  setTimeout(() => {
    heartIcon.classList.remove('active');
  }, 300);
});

fetchPages()
 




// The swipeRightAnimation() is to display a demo of the "swipe by touch function". It's stored in the localStorage so it only render for users who visited the app first time.
// The setTimeout is an inbuilt method to set the time that how long each animation will last, 

function swipeRightAnimation(){
  const swipeRightDemo = document.getElementById('right-side');
  const swipeLeftDemo = document.getElementById('left-side');
  SwipeDemoShow = document.querySelectorAll('.animation')


  swipeRightDemo.style.visibility = 'hidden';
  swipeLeftDemo.style.visibility = 'hidden';


if(!localStorage.getItem('SwipeDemoShow')) {

  localStorage.setItem('SwipeDemoShow', 'true');

  setTimeout(()=>{
 imgContainer.classList.add('green-overlay', 'shake-right', );
 swipeRightDemo.style.visibility = 'visible'  ;
},100);


setTimeout(()=>{
   imgContainer.classList.remove('green-overlay', 'shake-right', );
    swipeRightDemo.style.visibility = 'hidden';
},4000);

setTimeout(()=>{
  imgContainer.classList.add('red-overlay', 'shake-left', );
 swipeLeftDemo.style.animation = 'none';
    swipeLeftDemo.offsetHeight;
    swipeLeftDemo.style.animation = null;


    swipeLeftDemo.style.visibility = 'visible';
},4000);


setTimeout(()=>{
  imgContainer.classList.remove('red-overlay', 'shake-left', );
  swipeLeftDemo.style.visibility = 'hidden';
},8000);
}
}
swipeRightAnimation();


