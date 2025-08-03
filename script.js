import {
  testList,
  INTERACTIVE_TUTOR_PROMPT,
  FLASHCARD_TEACHER_PROMPT,
  REPS_COACH_PROMPT
} from "./testData.js";

const MAX_ANIMATION_CYCLES = 100;
const ANIMATION_DELAY_MS    = 20;

document.addEventListener("DOMContentLoaded", () => {
  const textBox             = document.querySelector(".box__text");
  const selectionBox        = document.querySelector(".box__category");
  const rotateButton        = document.querySelector(".box__rotate");
  const allCategoriesButton = document.querySelector(".box__all-categories");
  const promptSelect        = document.querySelector("#prompt-select");

  const promptMap = {
    INTERACTIVE_TUTOR_PROMPT,
    FLASHCARD_TEACHER_PROMPT,
    REPS_COACH_PROMPT
  };
  let currentPrompt = promptMap[promptSelect.value];

  promptSelect.addEventListener("change", () => {
    currentPrompt = promptMap[promptSelect.value];
  });

  let isAllCategoriesSelected = false;
  const selectedCategories = new Set();
  const categoryButtons    = {};

  allCategoriesButton.addEventListener("click", () => {
    isAllCategoriesSelected = !isAllCategoriesSelected;
    allCategoriesButton.classList.toggle("selected", isAllCategoriesSelected);
    selectedCategories.clear();

    for (const category in testList) {
      if (isAllCategoriesSelected) {
        selectedCategories.add(category);
        categoryButtons[category].classList.add("selected");
      } else {
        categoryButtons[category].classList.remove("selected");
      }
    }
  });

  for (const category in testList) {
    const btn = document.createElement("button");
    btn.textContent = category;
    btn.classList.add("topic-button");
    selectionBox.appendChild(btn);
    categoryButtons[category] = btn;

    btn.addEventListener("click", () => {
      if (selectedCategories.has(category)) {
        selectedCategories.delete(category);
        btn.classList.remove("selected");
      } else {
        selectedCategories.add(category);
        btn.classList.add("selected");
      }
      isAllCategoriesSelected = false;
      allCategoriesButton.classList.remove("selected");
    });
  }

  function getSelectedTopics() {
    let topics = [];
    selectedCategories.forEach(cat => {
      topics = topics.concat(testList[cat]);
    });
    return topics;
  }

  function rotateText(topics, cycles, count = 0) {
    if (count < cycles && topics.length > 0) {
      const idx = Math.floor(Math.random() * topics.length);
      textBox.innerHTML = `<p>${currentPrompt} ${topics[idx]}</p>`;
      setTimeout(() => rotateText(topics, cycles, count + 1), ANIMATION_DELAY_MS);
    } else {
      rotateButton.disabled = false;
    }
  }

  rotateButton.addEventListener("click", () => {
    const topics = getSelectedTopics();
    if (topics.length === 0) {
      textBox.innerHTML = "<p>Please select at least one category.</p>";
      return;
    }
    rotateButton.disabled = true;
    const cycles = Math.floor(Math.random() * MAX_ANIMATION_CYCLES);
    rotateText(topics, cycles);
  });
});
