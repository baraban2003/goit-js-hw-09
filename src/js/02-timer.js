import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startButton: document.querySelector('button[data-start]'),
  timerDays: document.querySelector('.value[data-days]'),
  timerHours: document.querySelector('.value[data-hours]'),
  timerMinutes: document.querySelector('.value[data-minutes]'),
  timerSeconds: document.querySelector('.value[data-seconds]'),
};

const { startButton, timerDays, timerHours, timerMinutes, timerSeconds } = refs;

//Формат времени ХХ, Количество дней может состоять из более чем двух цифр
function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}

//Для подсчета значений используй готовую функцию convertMs
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = addLeadingZero(Math.floor(ms / day));
  // Remaining hours
  const hours = addLeadingZero(Math.floor((ms % day) / hour));
  // Remaining minutes
  const minutes = addLeadingZero(Math.floor(((ms % day) % hour) / minute));
  // Remaining seconds
  const seconds = addLeadingZero(Math.floor((((ms % day) % hour) % minute) / second));

  return { days, hours, minutes, seconds };
}
let intervalId = null;
let hasClickable = true;
//console.log(timerDays.innerHTML);

//Выбор даты

const onClose = (selectedDates, dateStr, instance) => {
  //console.log(selectedDates[0], dateStr, instance);
  const calcTime = selectedDates[0] - instance.now;
  /*   */
  //Если пользователь выбрал валидную дату (в будущем), кнопка «Start» становится активной.
  if (calcTime && calcTime > 0) {
    startButton.disabled = false;
    flatpickr(myInput, { clickOpens: false, enableTime: true, time_24hr: true });
    const starTimer = () => {
      startButton.disabled = true;

      intervalId = setInterval(() => {
        const currentTime = Date.now();
        //расчет разницы милисекунд
        const calcTimeUpatedInMs = selectedDates[0] - currentTime;
        //приведение времени в нормальный вид
        let calcTimeUpated = convertMs(calcTimeUpatedInMs);
        //присвоение калькулятора
        timerDays.innerHTML = calcTimeUpated.days;
        timerHours.innerHTML = calcTimeUpated.hours;
        timerMinutes.innerHTML = calcTimeUpated.minutes;
        timerSeconds.innerHTML = calcTimeUpated.seconds;

        if (calcTimeUpatedInMs < 999) {
          clearInterval(intervalId);
        }

        //console.log(calcTimeUpated);
      }, 1000);
    };

    startButton.addEventListener('click', starTimer);

    //
  }

  if (calcTime <= 0) {
    //Если пользователь выбрал дату в прошлом, покажи window.alert() с текстом "Please choose a date in the future".
    Notify.failure('Please choose a date in the future');
  }
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose,
};

const myInput = document.querySelector('#datetime-picker');
let fp = flatpickr(myInput, options);
