const imgContainer = document.getElementById('img-container')
const nextBtn = document.getElementById('btn-next');
const prevBtn = document.getElementById('btn-prev');
const imgEl = document.createElement('img')


//Creating an empty array to push the images in
// intializing image index

let images = [];
let imageIndex = 1;



// fetching all the images in page one.
// Accessing the data array and mapping over the images then pusshing the images inside the array by the their url
// then displaying the images according to it index insde the renderfeed function

function fetchImages(){
    fetch('https://image-feed-api.vercel.app/api/images')
  .then(res => res.json())
  .then( data => {
    data.data.forEach(img => {
    images.push(img.image_url)
      
    });
    renderfeed(imageIndex)
  })

}

renderfeed();


//This function will render the Dom elements.
function renderfeed(index){

  imgEl.src = images[index];
  imgContainer.appendChild(imgEl);

fetchImages()
}


// display the next image according to it index when the next button is clicked
nextBtn.addEventListener('click', function(){
  if(imageIndex < images.length -1){
    imageIndex++;
    renderfeed(imageIndex)
  }
})



// display the previous image according to the next slide index
prevBtn.addEventListener('click', function(){
  if(imageIndex > 0){
    imageIndex--;
    renderfeed(imageIndex)
  }
})