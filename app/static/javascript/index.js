const darkModeClassName = "dark";
let isDarkMode = true;
const body = document.body;
const toggleDarkModeButton = document.getElementById("toggleDarkMode");
const searchContainer = document.getElementById("search-container");
const searchHeading = document.getElementById("change-search-icon-color");
const searchIcon = document.getElementById("searchIcon");
const urlInput = document.getElementById("urlInput");
const resultParagraph = document.getElementById("result-paragraph");
const resultContainer = document.getElementById("result-container");
const loader = document.getElementById("loader");
document.body.style.backgroundImage = "url(static/assets/moonlight.jpg)";
const hexCodes = {
  white: "#ffffff",
  dark: "#1a202c",
};
let isLoading = false;
const wikiURL = "https://en.wikipedia.org/wiki/";
const domainURL = "https://wikipedia-scraper-vmuk.onrender.com"; // "http://127.0.0.1:5000";

const handleSearch = (event) => {
  event.preventDefault();
  const url = urlInput.value;
  if (!url.includes(wikiURL)) {
    alert(
      `Please enter valid Wikipedia URL (example : ${wikiURL}{seach_word})`
    );
    return;
  }
  if (url && !isLoading) {
    fetchData(url);
    loader.style.display = "block";
    isLoading = true;
  }
};

const handleToggle = () => {
  if (isDarkMode) {
    document.body.style.backgroundImage = "url(static/assets/sunraise.jpg)";
  } else {
    document.body.style.backgroundImage = "url(static/assets/moonlight.jpg)";
  }
  if (isDarkMode) handleDarkMode();
  else handleLightMode();
  isDarkMode = !isDarkMode;
};

const fetchData = (url) => {
  fetch("/execute_url", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: `urlInput=${encodeURIComponent(url)}`,
  })
    .then((response) => response.json())
    .then((data) => {
      resultParagraph.innerHTML = data.data;
      resultContainer.classList.remove("invisible");
      resultContainer.classList.add("visible");
      isLoading = false;
      loader.style.display = "none";
    })
    .catch((error) => {
      isLoading = false;
      loader.style.display = "none";
      console.error(error);
    });
};

const handleDarkMode = () => {
  body.style.backgroundColor = hexCodes.white;
  body.style.color = hexCodes.dark;
  searchHeading.style.color = hexCodes.white;
  searchContainer.style.backgroundColor = hexCodes.dark;
  searchContainer.style.color = hexCodes.white;
  resultParagraph.style.backgroundColor = hexCodes.dark;
  resultParagraph.style.color = hexCodes.white;
  toggleDarkModeButton.innerHTML = '<i class="fas fa-sun"></i>';
};

const handleLightMode = () => {
  body.style.backgroundColor = hexCodes.dark;
  body.style.color = hexCodes.white;
  searchHeading.style.color = hexCodes.dark;
  searchContainer.style.backgroundColor = hexCodes.white;
  searchContainer.style.color = hexCodes.dark;
  resultParagraph.style.backgroundColor = hexCodes.white;
  resultParagraph.style.color = hexCodes.dark;
  toggleDarkModeButton.innerHTML = '<i class="fas fa-moon"></i>';
};

resultParagraph.addEventListener("click", (event) => {
  if (event.target.tagName === "A") {
    event.preventDefault();
    const linkUrl = event.target.href;
    const url = linkUrl.replace(`${domainURL}/wiki/`, wikiURL);
    if (url && !isLoading) {
      fetchData(url);
      loader.style.display = "block";
      isLoading = true;
    }
  }
});
