//your JS code here. If required.
const output = document.getElementById("output");
const btn = document.getElementById("download-images-button");
const loadingDiv = document.getElementById("loading");
const errorDiv = document.getElementById("error");

const images = [
  { url: "https://picsum.photos/id/237/200/300" },
  { url: "https://picsum.photos/id/238/200/300" },
  { url: "https://picsum.photos/id/239/200/300" },
];

function downloadImage(url) {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = url;
    img.onload = () => resolve(img);
    img.onerror = () => reject(new Error(`Failed to load image: ${url}`));
  });
}


function downloadImages(images) {
  loadingDiv.style.display = "block"; 
  errorDiv.innerText = ""; 
  output.innerHTML = ""; 

  
  Promise.all(images.map(image => downloadImage(image.url)))
    .then(results => {
      loadingDiv.style.display = "none"; 

      
      results.forEach(img => output.appendChild(img));
    })
    .catch(error => {
      loadingDiv.style.display = "none"; 
      errorDiv.innerText = error.message; 
    });
}


btn.addEventListener("click", () => downloadImages(images));