import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputsData: document.querySelector('.form'),
  submitButton: document.querySelector('.form button'),
};
let { inputsData, submitButton } = refs;

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve) {
        resolve(Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`));
      } else {
        reject(Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`));
      }
    }, delay);
  });
}
function onSuccess() {
  console.log('Success');
}
function onError() {
  console.log('Error');
}

submitButton.addEventListener('click', startCreatePromises);
inputsData.addEventListener('input', getInputData);

let step = null;
let delay = null;
let i = null;
let bebe = null;
function getInputData(e) {
  step = Number(e.currentTarget.elements[1].value);
  delay = Number(e.currentTarget.elements[0].value);
  i = Number(e.currentTarget.elements[2].value);
}
function clearInputs() {
  step = 0;
  delay = 0;
  i = 0;
}
function startCreatePromises(event) {
  event.preventDefault();

  // const i = Number(inputAmount.value);

  if (i) {
    createPromise(1, delay).then(onSuccess).catch(onError);

    let createNewPromises = () => {
      for (let amount = 2; amount <= i; amount += 1) {
        delay += step;

        createPromise(amount, delay).then(onSuccess).catch(onError);
      }
    };
    createNewPromises();
    clearInputs();
  }
}
