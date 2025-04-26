const factBtn = document.getElementById("factBtn");
const result = document.getElementById("result");
const catImg = document.getElementById("catImg");
const saveBtn = document.getElementById("saveBtn");
const viewFavBtn = document.getElementById("viewFavBtn");
const favoritesSection = document.getElementById("favoritesSection");
const favoritesList = document.getElementById("favoritesList");
const closeFavBtn = document.getElementById("closeFavBtn");
const meowSound = document.getElementById("meowSound");
const toggleTheme = document.getElementById("toggleTheme");
const shareTwitter = document.getElementById("shareTwitter");
const shareWhatsApp = document.getElementById("shareWhatsApp");

let currentFact = "";

// Fetch random cat fact
async function getCatFact() {
  const res = await axios.get("https://catfact.ninja/fact");
  return res.data.fact;
}

// Fetch random cat image
async function getCatImage() {
  const res = await axios.get("https://api.thecatapi.com/v1/images/search");
  return res.data[0].url;
}

// Update image with animation
function updateImage(url) {
  catImg.classList.remove("loaded");
  catImg.src = url;
  catImg.onload = () => {
    catImg.classList.add("loaded");
    meowSound.play();
  };
}

// Show new cat fact and image
async function showCatContent() {
  try {
    const [fact, imgUrl] = await Promise.all([getCatFact(), getCatImage()]);
    currentFact = fact;
    result.textContent = fact;
    updateImage(imgUrl);
  } catch (err) {
    result.textContent = "Oops! Couldn't load a cat fact. 🐾";
  }
}

// Save to localStorage
function saveFavorite() {
  let favorites = JSON.parse(localStorage.getItem("catFacts")) || [];
  if (!favorites.includes(currentFact)) {
    favorites.push(currentFact);
    localStorage.setItem("catFacts", JSON.stringify(favorites));
    alert("Saved to favorites! 💾");
  } else {
    alert("Already in favorites! 🧡");
  }
}

// Show saved facts
function showFavorites() {
  favoritesSection.classList.remove("hidden");
  favoritesList.innerHTML = "";

  let favorites = JSON.parse(localStorage.getItem("catFacts")) || [];
  if (favorites.length === 0) {
    favoritesList.innerHTML = "<li>No favorites yet!</li>";
    return;
  }

  favorites.forEach(fav => {
    const li = document.createElement("li");
    li.textContent = fav;
    favoritesList.appendChild(li);
  });
}

// Close favorites
function closeFavorites() {
  favoritesSection.classList.add("hidden");
}

// Toggle light/dark theme
function toggleThemeFn() {
  document.body.classList.toggle("dark");
}

// Share on Twitter and WhatsApp
function shareOnTwitter() {
  const url = `https://twitter.com/intent/tweet?text=Random%20Cat%20Fact%20-%20${encodeURIComponent(currentFact)}`;
  window.open(url, "_blank");
}

function shareOnWhatsApp() {
  const url = `https://wa.me/?text=Random%20Cat%20Fact%20-%20${encodeURIComponent(currentFact)}`;
  window.open(url, "_blank");
}

const uploadInput = document.getElementById('upload-cat');
uploadInput.addEventListener("change", () => {
  const file = uploadInput.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      updateImage(e.target.result); // Use same function that animates
    };
    reader.readAsDataURL(file);
  }
});


// Event Listeners
factBtn.addEventListener("click", showCatContent);
saveBtn.addEventListener("click", saveFavorite);
viewFavBtn.addEventListener("click", showFavorites);
closeFavBtn.addEventListener("click", closeFavorites);
toggleTheme.addEventListener("click", toggleThemeFn);
shareTwitter.addEventListener("click", shareOnTwitter);
shareWhatsApp.addEventListener("click", shareOnWhatsApp);

// Initialize
showCatContent();
