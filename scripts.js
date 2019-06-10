//NEED TO ADD PROMISE ALL TO TIDY UP THIS CODE


var imageList = [];

async function fetchAsync() {
  let response = await fetch("https://marketingflyers.blob.core.windows.net/flyers/?restype=container&comp=list")
  let image = await response.text().then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  var blobList = Array.from(image.querySelectorAll('Blob'))
    blobList.forEach((blob) => {
      let name = blob.childNodes[0].textContent
      let url = blob.childNodes[1].textContent
      imageList.push({"name": name, "url": url}) //push images to array imageList
    })
  return image
}

function addDropdown() { //Image filename dropdown
   fetchAsync()
  .then((data => {
    let imageListContainer = document.getElementById('imageList') //Get ID to add select dropdown
    imageListContainer.innerHTML = "<option value='0' class='default'>Pick an image:</option>"
    let options = '' //Options variable created to add in dropdown
    for(let i = 0; i < imageList.length; i++) { //loop through items in imageList array and create dropdown
      imageListContainer.innerHTML += `<option value="${i}" class="option${i}">${imageList[i].name}</option>`
  }
    // imageListContainer + options; //Add looped through itmes to dropdown
  }))
}
addDropdown()

function loadImages() {
  fetchAsync()
  .then(data => {
      let carousel = document.getElementById('carousel')
      //add images to carousel
      imageList.map(images => {
        let carouselImage = document.createElement('img')
        carouselImage.setAttribute('src', images.url)
        carouselImage.setAttribute('class', `carouselImage ${images.name}`)
        carousel.append(carouselImage)
      })
    return imageList  
    })
}
loadImages()

//change the image in the dropdown 
function changeImage(val) {
  fetchAsync()
  .then((response => {
    console.log(response)
    console.log(imageList)
    let value = val.options[val.selectedIndex + 1].value;
    // let imageSrc = images[value-1].image;
    let imageSrc = imageList[value].url;
    let imageContainer = document.getElementById('image-container');
    let image = document.createElement('img')
    image.src = `${imageSrc}`
    image.setAttribute('height', '100%')
    image.setAttribute('width', '100%')
    imageContainer.appendChild(image);
  }))
} 
  
    //Generate the PDF on click
    async function generatePDF() {
      fetchAsync()
      const imageContainer = document.getElementById('image-container');
      html2canvas(imageContainer, {
        onrendered: function(canvas) {  
          var img = canvas.toDataURL("image/jpeg", 1.0);
          var doc = new jsPDF()
          doc.addImage(img, 'JPEG',0 ,0, 210, 297); // Height and width of area when tabopens as PDF
          doc.save('1.pdf');
        }  
      });
    };
        //Add Loan Officer and realtor information to image by finding selected number in dropdown and add
        //div to image-container

    let e = document.getElementById('LOList')
    e.addEventListener('change', createMessageOnImg)
    function createMessageOnImg() {
      let elemText = e.options[e.selectedIndex].text;
      let container = document.getElementById('image-container')
      let message = document.createElement('div')
      message.innerHTML = elemText;
      container.append(message);
      message.style = 'position:absolute; top: 1500px; left: 25px; font-size: 60px';
      
    }
    
      //------------------------------
//     //NEED TO ADD PROMISE ALL TO TIDY UP THIS CODE


// var imageList = [];

// async function fetchAsync() {
//   let response = await fetch("https://marketingflyers.blob.core.windows.net/flyers/?restype=container&comp=list")
//   let image = await response.text().then(str => new window.DOMParser().parseFromString(str, "text/xml"))
//   .then((response) => {
//     var blobList = Array.from(response.querySelectorAll('Blob'))
//     blobList.forEach((blob) => {
//       let name = blob.childNodes[0].textContent
//       let url = blob.childNodes[1].textContent
//       imageList.push({"name": name, "url": url}) //push images to array imageList
//     })
//   })
// }

// console.log(imageList)

// function addDropdown() {
//     let options = ''
//     for(let i = 0; i < imageList.length; i++) {
//       options += `<option value="${i}" class="option${i}">${blobList[i].childNodes[0].textContent}</option>`
//     }
//     imageListContainer.innerHTML = options;
// }
// addDropdown()

// function loadImages() {
//   fetchAsync()
//   .then(data => {
//     // var blobList = Array.from(data.querySelectorAll('Blob'))
//     // blobList.forEach((blob) => {
//     //   let name = blob.childNodes[0].textContent
//     //   let url = blob.childNodes[1].textContent
//       // imageList.push({"name": name, "url": url}) //push images to array imageList
//       let carousel = document.getElementById('carousel')
//       //add images to carousel
//       imageList.map(images => {
//         let carouselImage = document.createElement('img')
//         carouselImage.setAttribute('src', images.url)
//         carouselImage.setAttribute('class', `carouselImage ${images.name}`)
//         carousel.append(carouselImage)
//       })
//     return imageList  
//     })
//   }


// loadImages()

// //change the image in the dropdown 
// function changeImage(val) {
//   fetchAsync()
//   .then((response => {
//     var blobs = Array.from(response.querySelectorAll('Blob'))
//     console.log(imageList)
//     console.log(response)
//     let value = val.options[val.selectedIndex].value;
//     // let imageSrc = images[value-1].image;
//     let imageSrc = blobs[value].childNodes[1].innerHTML;
//     let imageContainer = document.getElementById('image-container');
//     let image = document.createElement('img')
//     image.src = `${imageSrc}`
//     image.setAttribute('height', '100%')
//     image.setAttribute('width', '100%')
//     imageContainer.appendChild(image);
//     return;
//   }))
// }



// // Need to map through images stored on DB and show them here
// // Also, map through Loan Officers and their addresses
//     // let images = [
//     //   {'name': 'benefits', image: './images/Benefits_of_Homeownership.jpg'},
//     //   {'name': 'difference', image: './images/The_Difference_Your_Rate_Makes.jpg'},
//     //   {'name': 'difference', image: './images/The_Difference_Your_Rate_Makes.jpg'}

//     // ]
//     // console.log(images)
  
  
//     //Generate the PDF on click
//     async function generatePDF() {
//       fetchAsync()
