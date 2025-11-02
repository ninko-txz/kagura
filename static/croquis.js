import Timer from '/static/timer.js';

const params = new URLSearchParams(window.location.search);
const interval = parseInt(params.get('interval'));
const size = parseInt(params.get('size'));

const cursorMon = document.querySelector('#cursor-monitor');
const timeMon = document.querySelector('#time-monitor');
const pauseBtn = document.querySelector('#pause-btn');
const resumeBtn = document.querySelector('#resume-btn');
const finishBtn = document.querySelector('#finish-btn');

let cursor = 1;
const timer = new Timer(interval);

start();

window.addEventListener('countdown', () => {
    timeMon.textContent = timer.time == 0 ? '' : timer.time;
});

window.addEventListener('timeup', () => {
    cursor < size ? next() : end();
});

pauseBtn.addEventListener('click', () => {
    timer.pause();
    pauseBtn.hidden = true;
    resumeBtn.hidden = false;
});

resumeBtn.addEventListener('click', () => {
    timer.resume();
    resumeBtn.hidden = true;
    pauseBtn.hidden = false;
});

finishBtn.addEventListener('click', () => {
    window.location.href = '/';
});

function start() {
    timer.start();
    cursorMon.textContent = `${cursor}/${size}`;
}

function next() {
    document.getElementById(cursor).hidden = true;
    document.getElementById(++cursor).hidden = false;

    cursorMon.textContent = `${cursor}/${size}`;

    timer.set(interval);
    timer.start();
}

function end() {
    document.querySelectorAll('img').forEach((img) => {
        img.hidden = false;
    });
    pauseBtn.hidden = true;
    finishBtn.hidden = false;
    timeMon.textContent = 'お疲れ様!';
}
