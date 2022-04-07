import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  inputDelay: document.querySelector('input[name=delay]'),
  inputStep: document.querySelector('input[name=step]'),
  inputAmount: document.querySelector('input[name=amount]'),
  submitButton: document.querySelector('.form button'),
};
let { inputDelay, inputStep, inputAmount, submitButton } = refs;

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

function startCreatePromises(event) {
  event.preventDefault();

  const i = Number(inputAmount.value);

  if (i) {
    let step = Number(inputStep.value);
    let delay = Number(inputDelay.value);
    createPromise(1, delay).then(onSuccess).catch(onError);

    let createNewPromises = () => {
      for (let amount = 2; amount <= i; amount += 1) {
        delay += step;

        createPromise(amount, delay).then(onSuccess).catch(onError);
      }
    };
    createNewPromises();
  }
}
