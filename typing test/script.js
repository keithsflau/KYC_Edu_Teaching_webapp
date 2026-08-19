const quotes = [
  "Practice makes perfect, but no one is perfect, so why practice?",
  "The purpose of our lives is to be happy and create meaningful moments.",
  "Success is not final, failure is not fatal; it is the courage to continue that counts.",
  "Do not watch the clock. Do what it does: keep going.",
  "Setting goals is the first step in turning the invisible into the visible.",
  "Life is 10 percent what happens to us and 90 percent how we react to it.",
  "Your time is limited, so do not waste it living someone else's life.",
  "If you can dream it, you can do it, so set your mind to the task.",
  "It always seems impossible until it is done, so take the first step.",
  "Great things never come from comfort zones; challenge yourself today."
];

const quoteElement = document.getElementById("quote");
const inputElement = document.getElementById("input");
const timeElement = document.getElementById("time");
const wpmElement = document.getElementById("wpm");
const accuracyElement = document.getElementById("accuracy");
const errorsElement = document.getElementById("errors");
const summarySection = document.getElementById("summary");
const summaryText = document.getElementById("summaryText");
const startButton = document.getElementById("startButton");
const newQuoteButton = document.getElementById("newQuoteButton");

let currentQuote = "";
let startTime = null;
let timerInterval = null;
let totalTypedCharacters = 0;
let totalErrors = 0;

function getRandomQuote() {
  const index = Math.floor(Math.random() * quotes.length);
  return quotes[index];
}

function renderQuote(quote) {
  quoteElement.innerHTML = "";
  const fragment = document.createDocumentFragment();

  quote.split("").forEach((character) => {
    const span = document.createElement("span");
    span.textContent = character;
    fragment.appendChild(span);
  });

  quoteElement.appendChild(fragment);
  const firstSpan = quoteElement.querySelector("span");
  if (firstSpan) {
    firstSpan.classList.add("current");
  }
}

function resetStats() {
  totalTypedCharacters = 0;
  totalErrors = 0;
  startTime = null;
  timeElement.textContent = "0.0s";
  wpmElement.textContent = "0";
  accuracyElement.textContent = "100%";
  errorsElement.textContent = "0";
  summarySection.classList.add("hidden");
  clearInterval(timerInterval);
}

function updateStats() {
  if (!startTime) {
    return;
  }

  const elapsedSeconds = (Date.now() - startTime) / 1000;
  timeElement.textContent = `${elapsedSeconds.toFixed(1)}s`;

  const wordsTyped = totalTypedCharacters / 5;
  const minutes = elapsedSeconds / 60;
  const wpm = minutes > 0 ? Math.round(wordsTyped / minutes) : 0;
  wpmElement.textContent = `${wpm}`;

  const accuracy = totalTypedCharacters > 0
    ? Math.max(0, Math.round(((totalTypedCharacters - totalErrors) / totalTypedCharacters) * 100))
    : 100;
  accuracyElement.textContent = `${accuracy}%`;

  errorsElement.textContent = `${totalErrors}`;
}

function startTimer() {
  startTime = Date.now();
  timerInterval = setInterval(updateStats, 100);
}

function finishGame() {
  clearInterval(timerInterval);
  updateStats();
  inputElement.disabled = true;
  newQuoteButton.disabled = false;

  const timeTaken = timeElement.textContent;
  const wpm = wpmElement.textContent;
  const accuracy = accuracyElement.textContent;
  const errors = errorsElement.textContent;

  summaryText.textContent =
    `You finished the quote in ${timeTaken} with ${wpm} WPM, ` +
    `${accuracy} accuracy, and ${errors} error${errors === "1" ? "" : "s"}.`;
  summarySection.classList.remove("hidden");
}

function handleTyping(event) {
  if (!startTime) {
    startTimer();
  }

  const quoteSpans = quoteElement.querySelectorAll("span");
  const input = inputElement.value;
  totalTypedCharacters = input.length;

  totalErrors = 0;

  quoteSpans.forEach((span, index) => {
    const character = span.textContent || "";
    const typedCharacter = input[index];

    span.classList.remove("correct", "incorrect", "current");

    if (typedCharacter == null) {
      return;
    }

    if (typedCharacter === character) {
      span.classList.add("correct");
    } else {
      span.classList.add("incorrect");
      totalErrors += 1;
    }
  });

  const nextIndex = input.length;
  const nextSpan = quoteSpans[nextIndex];
  if (nextSpan) {
    nextSpan.classList.add("current");
  }

  updateStats();

  if (input.length === currentQuote.length && totalErrors === 0) {
    finishGame();
  } else if (input.length >= currentQuote.length) {
    inputElement.value = input.slice(0, currentQuote.length);
  }
}

function prepareNewRound() {
  resetStats();
  currentQuote = getRandomQuote();
  renderQuote(currentQuote);
  inputElement.value = "";
  inputElement.disabled = false;
  inputElement.focus();
  startButton.disabled = true;
  newQuoteButton.disabled = true;
}

function handleStartButton() {
  prepareNewRound();
}

function handleNewQuoteButton() {
  startButton.disabled = false;
  newQuoteButton.disabled = true;
  inputElement.value = "";
  inputElement.disabled = true;
  quoteElement.innerHTML = "";
  summarySection.classList.add("hidden");
}

startButton.addEventListener("click", handleStartButton);
newQuoteButton.addEventListener("click", handleNewQuoteButton);
inputElement.addEventListener("input", handleTyping);

