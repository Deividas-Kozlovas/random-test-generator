import { testList } from './testData.js';

document.addEventListener('DOMContentLoaded', () => {
    const textBox = document.getElementsByClassName("box__text")[0];
    const roteateButton = document.getElementsByClassName("box__rotate")[0];
    const randomLoopCount = Math.floor(Math.random() * 100);

    roteateButton.addEventListener('click', () => {
        let count = 0;
        function rotate(randomLoopCount, count){
            if(randomLoopCount > count){
                const randomIndex = Math.floor(Math.random() * testList.length);
                textBox.innerHTML = `<p>${testList[randomIndex]}</p>`;
                setTimeout(() => {
                    rotate(randomLoopCount, count + 1);
                }, 20)
            }
        }
        rotate(randomLoopCount, count);
    });
});