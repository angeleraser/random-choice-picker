import { timer, getRandomIndex, getSeparatedWords } from "./utils.js";

const formEl = document.getElementById("form");
const textareaEl = document.getElementById("textarea");
const wordsContainer = document.getElementById("words-container");

let choosing = false;
let indx = 0;

function renderWordsHTML() {
  wordsContainer.innerHTML = getSeparatedWords(textareaEl.value.trim())
    .map((word) => `<span class="word">${word}</span>`)
    .join("");
  return [...wordsContainer.children];
}

textareaEl.focus();
textareaEl.addEventListener("keyup", renderWordsHTML);

formEl.addEventListener("submit", function (e) {
  e.preventDefault();

  const words = renderWordsHTML();
  if (choosing || !words.length) return;

  choosing = true;
  textareaEl.setAttribute("disabled", "");

  timer({
    durationMs: 3000,
    intervalMs: 75,
    callback: function () {
      words[indx].classList.remove("highlight");
      words[indx + 1 === words.length ? (indx = 0) : ++indx].classList.add(
        "highlight"
      );
    },
    onComplete: function () {
      words[indx].classList.remove("highlight");
      words[getRandomIndex(words.length)].classList.add("highlight");
      choosing = false;
      indx = 0;
      textareaEl.removeAttribute("disabled");
    },
  });
});