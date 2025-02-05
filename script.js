let cl = console.log;
let ct = console.table;

// DOM Elements
let userInputForm = document.getElementById("text-input-form");
let translationContainer = document.getElementById("translation-text");

// Create slangWords array

let slangWords = [];

fetch("slang.json")
  .then((response) => response.json())
  .then((data) => {
    slangWords = data.slang;
  })
  .catch((error) => console.error("Error fetching the JSON file:", error));

// Form event listeners

userInputForm.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkInput(e);
  }
});

userInputForm.addEventListener("submit", (e) => {
  checkInput(e);
});

// Check input for slang function

function checkInput(e) {
  e.preventDefault();
  let userInput = document.getElementById("user-input").value;
  let userInputArr = userInput.split(/\s+/).filter(Boolean);
  cl("User input array:", userInputArr);

  userInputArr.forEach((word, index) => {
    slangWords.forEach((slang) => {
      let slangWordsArr = slang.abbr.split(" ");
      let match = true;
      for (let i = 0; i < slangWordsArr.length; i++) {
        if (
          userInputArr[index + i] &&
          userInputArr[index + i].toLowerCase() !== slangWordsArr[i]
        ) {
          match = false;
          break;
        }
      }
      if (match) {
        cl(
          `Matched slang phrase: "${slang.abbr}" with meaning: "${slang.meaning}"`
        );
        userInputArr.splice(index, slangWordsArr.length, slang.meaning);
      }
    });
  });

  cl("Translated input array:", userInputArr);
  updateTranslationContainer(userInputArr.join(" "));
}

// Typewriter variables
const speed = 25;
let index = 0;

function updateTranslationContainer(translation) {
  translationContainer.innerHTML = "";
  index = 0;
  typeWriter(translation);
  translationContainer.classList.add("glow");
}

function typeWriter(text) {
  if (index < text.length) {
    translationContainer.innerHTML += text.charAt(index);
    index++;
    setTimeout(() => typeWriter(text), speed);
  }
}
