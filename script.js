import { testList, agentDescription } from "./testData.js";

// Constants
const MAX_ANIMATION_CYCLES = 100;
const ANIMATION_DELAY_MS = 20;

document.addEventListener("DOMContentLoaded", () => {
  const textBox = document.querySelector(".box__text");
  const selectionBox = document.querySelector(".box__category");
  const rotateButton = document.querySelector(".box__rotate");
  const allCategoriesButton = document.querySelector(".box__all-categories");

  let isAllCategoriesSelected = false;
  const selectedCategories = new Set();
  const categoryButtons = {};

  allCategoriesButton.addEventListener("click", () => {
    isAllCategoriesSelected = !isAllCategoriesSelected;

    if (isAllCategoriesSelected) {
      allCategoriesButton.classList.add("selected");
      selectedCategories.clear();

      for (const category in testList) {
        selectedCategories.add(category);
        categoryButtons[category].classList.add("selected");
      }
    } else {
      allCategoriesButton.classList.remove("selected");
      selectedCategories.clear();

      for (const category in testList) {
        categoryButtons[category].classList.remove("selected");
      }
    }
  });

  for (const category in testList) {
    const button = document.createElement("button");
    button.textContent = category;
    button.classList.add("topic-button");
    selectionBox.appendChild(button);
    categoryButtons[category] = button;

    button.addEventListener("click", () => {
      if (selectedCategories.has(category)) {
        selectedCategories.delete(category);
        button.classList.remove("selected");
      } else {
        selectedCategories.add(category);
        button.classList.add("selected");
      }

      isAllCategoriesSelected = false;
      allCategoriesButton.classList.remove("selected");
    });
  }

  function getSelectedTopics() {
    let topics = [];
    selectedCategories.forEach((category) => {
      topics = topics.concat(testList[category]);
    });
    return topics;
  }

  function rotateText(topics, cycles, count = 0) {
    if (count < cycles && topics.length > 0) {
      const randomIndex = Math.floor(Math.random() * topics.length);
      textBox.innerHTML = `<p>${agentDescription} ${topics[randomIndex]}</p>`;
      setTimeout(() => {
        rotateText(topics, cycles, count + 1);
      }, ANIMATION_DELAY_MS);
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
    const animationCycles = Math.floor(Math.random() * MAX_ANIMATION_CYCLES);
    rotateText(topics, animationCycles);
  });
});
