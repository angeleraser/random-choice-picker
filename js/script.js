import { cronometer, getRandomIndex, getSeparatedWords } from "./utils.js";

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

  const nodes = renderWordsHTML();

  if (choosing || !nodes.length) return;

  choosing = true;
  textareaEl.setAttribute("disabled", "");

  cronometer({
    durationMs: 3000,
    intervalMs: 75,
    callback: function () {
      nodes[indx].classList.remove("highlight", "chosen");
      nodes[indx + 1 === nodes.length ? (indx = 0) : ++indx].classList.add(
        "highlight"
      );
    },
    onComplete: function () {
      nodes[indx].classList.remove("highlight");
      nodes[(indx = getRandomIndex(nodes.length))].classList.add("highlight");
      choosing = false;
      indx = 0;
      textareaEl.removeAttribute("disabled");
    },
  });
});
