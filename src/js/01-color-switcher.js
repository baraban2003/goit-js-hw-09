refs = {
  body: document.querySelector('body'),
  buttonStart: document.querySelector('button[data-start]'),
  buttonStop: document.querySelector('button[data-stop]'),
};

const { body, buttonStart, buttonStop } = refs;
let intervalId = null;
let hasClickable = true;

const startActions = () => {
  if (hasClickable) {
    intervalId = setInterval(() => {
      body.style.backgroundColor = `${getRandomHexColor()}`;

      console.log(hasClickable);
      console.log('кликнул');

      function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
      }
    }, 1000);
    hasClickable = false;
  }
};

buttonStart.addEventListener('click', startActions);
buttonStop.addEventListener('click', () => {
  clearInterval(intervalId);
  hasClickable = true;
});
