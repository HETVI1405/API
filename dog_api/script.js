const img = document.getElementById("img");
const button = document.getElementById("refresh");


function apiCall() {

  fetch("https://dog.ceo/api/breeds/image/random")
    .then((response) => response.json()) 
    .then((data) => {
      img.src = data.message; 
    });
}   
button.addEventListener("click", apiCall);