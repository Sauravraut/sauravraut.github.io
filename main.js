const link = "https://picsum.photos/v2/list?limit=10&page=1"
let photos = []
let current_image_index = 0;
const image =  document.getElementById('current_image')
const aurthor =  document.getElementById('current_image_aurthor')
const origin = document.getElementById('current_image_original')
const carousel = document.getElementById('carousel')



/**
 * fetches the photos and selects a random one to display
 */
fetch(link)
  .then(response => {
    if (!response.ok) {
      throw new Error('Response was not ok');
    }
    return response.json();
  })
  .then(data => {
    photos = data
    current_image_index = getRandomInt(photos.length)
    gen_carousel_items(current_image_index)
    change_Image(current_image_index)
  })
  .catch(error => {
    console.error('Error:', error);
});

/**
 * generates carosel items based on photos
 */
function gen_carousel_items(active_index) {
    for (let i = 0; i < photos.length; i++) {
      const item = document.createElement('div')
      item.setAttribute('id', i);
      item.addEventListener("click", change_active_item)
      if(i === active_index) {
        item.classList.add('active')
      }
      carousel.appendChild(item)
    }
}
/**
 * changes the image to a specific index
 */
function change_Image(index) {
  console.log(index)
    update_active_item(index.toString())
    photo = photos[index]
    image.src = photo.download_url
    aurthor.innerHTML = "Aurthor : " + photo.author
    origin.setAttribute('href', photo.url);
}

/**
 * changes the image to next index
 */
function nextImage() {
  current_image_index++
  if(current_image_index >= photos.length) {
    current_image_index = 0
  }
  change_Image(current_image_index)
}


/**
 * changes the image to previous index
 */
function prevImage() {
  current_image_index--
  if(current_image_index < 0) {
    current_image_index = photos.length - 1
  }
  change_Image(current_image_index)
}


/**
 * changes active carousel item
 */
function update_active_item(id) {
    // remove active
    const ele = document.getElementsByClassName("active")
    for(let element of ele){
      element.classList.remove("active")
    }
    // add active
    document.getElementById(id).classList.add("active")
}


/**
 * changes active carousel item
 */
function change_active_item() {
  console.log(this.id)
  update_active_item(this.id)
  // update photo
  current_image_index = parseInt(this.id)
  change_Image(this.id)
}

/**
 * Return an integer between 0 and not including max
 */
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}