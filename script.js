import { testList, agentDescription } from "./testData.js";

// Constants for animation
const MAX_ANIMATION_CYCLES = 100;
const ANIMATION_DELAY_MS = 20;

document.addEventListener("DOMContentLoaded", () => {
  const textBox = document.getElementsByClassName("box__text")[0];
  const rotateButton = document.getElementsByClassName("box__rotate")[0];

  // Rotate function for animating the random test display
  function rotateText(cycles, count = 0) {
    if (count < cycles) {
      const randomIndex = Math.floor(Math.random() * testList.length);
      textBox.innerHTML = `<p>${agentDescription} ${testList[randomIndex]}</p>`;
      setTimeout(() => {
        rotateText(cycles, count + 1);
      }, ANIMATION_DELAY_MS);
    } else {
      // Re-enable the button after animation
      rotateButton.disabled = false;
    }
  }

  rotateButton.addEventListener("click", () => {
    // Prevent multiple animations at once
    rotateButton.disabled = true;
    const animationCycles = Math.floor(Math.random() * MAX_ANIMATION_CYCLES);
    rotateText(animationCycles);
  });
});
