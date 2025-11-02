export default class Timer {
    constructor(time = 0) {
        this.time = time;
        this.timer = null;
    }

    set(time) {
        this.time = time;
    }

    start() {
        if (this.timer) return;
        this.timer = setInterval(() => this.countdown(), 1000);
    }

    countdown() {
        this.time -= 1;
        window.dispatchEvent(new Event('countdown'));

        if (this.time <= 0) {
            this.stop();
            window.dispatchEvent(new Event('timeup'));
        }
    }

    pause() {
        if (this.timer) {
            clearInterval(this.timer);
            this.timer = null;
        }
    }

    resume() {
        this.start();
    }

    stop() {
        this.pause();
        this.time = 0;
    }
}
