const size = document.querySelector('#size');
const interval = document.querySelector('#interval');
const directory = document.querySelector('#directory');
const startBtn = document.querySelector('#start-btn');

startBtn.addEventListener('click', () => {
    location.href = `/croquis?size=${size.value}&interval=${interval.value}&directory=${directory.value}`;
});
