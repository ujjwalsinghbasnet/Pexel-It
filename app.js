import {key} from './apiKey.js'

  let currentUrl;
  let url = 'https://api.pexels.com/v1/curated?per_page=15&page=1';
  let gallery = document.querySelector('.gallery');
  let loadMore = document.getElementById('loadmore');
  let form = document.getElementById('form');
  let page = 1; //initializing page - later for more photos page is incremented

  form.onsubmit = (e) => {
    e.preventDefault();
    let searchString = document.forms['form']['input'].value;
    url = `https://api.pexels.com/v1/search?query=${searchString}&per_page=10`
    currentUrl = searchString;
    fetchImage(url);
  }

  //function for building images - displaying images in the page as gallery
  let insertPhoto = function(photo){
      photo.photos.forEach(function(img){
        let galDiv = document.createElement('div');
        galDiv.classList.add('col-3');
        galDiv.innerHTML = `<img src = "${img.src.medium}">`
        if(img.height - img.width > 1000){
          galDiv.classList.add('portrait')
        } else if(img.width - img.height > 1000){
          galDiv.classList.add('landscape');
        } else{
          galDiv.classList.add('normal')
        }
        gallery.appendChild(galDiv);
        // console.log(img)
      })  
  }

  //loads more images ypon clicking "more" button
  //currentUrl holds the url that has query we passed in the form
  //if we have query, then related photos is loaded more otherwise default curated iamges will be loaded
  let loadExtra = function(){
    page++;
    console.log(page)
    if(currentUrl){
      url = `https://api.pexels.com/v1/search?query=${currentUrl}&per_page=10&page=${page}`;
    } else {
      url = `https://api.pexels.com/v1/curated?per_page=15&page=${page}`
    }
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: key,
      },
    })
    .then(res => res.json())
    
    .then(photos => insertPhoto(photos))
  }
  

  //fetching the images form the api
  let fetchImage = function(url){
    fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: key,
      },
    })
    .then(res=>res.json())
    .then(photo => {
      gallery.innerHTML = "";
      insertPhoto(photo)
    })
    .catch(err=>console.log(err));  
  }


  fetchImage(url); //fetching curated images as soon as the page is loaded
  loadMore.addEventListener('click',loadExtra);




