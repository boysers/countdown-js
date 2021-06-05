let inputDefault = {
  min: "0",
  sec: "0",
};

let timerSec = 0;
let intervalMilli = 10;

let isInputChange = false;
let compteurIsPause = false;
let compteurIsStart = false;

let compteur = null;

class Display {
  constructor(state) {
    this.inputMin = document.querySelector(state.inputMin);
    this.inputSec = document.querySelector(state.inputSec);
    this.setInputDefault();
    this.stop = document.querySelector(state.btnStop);
    this.start = document.querySelector(state.btnStart);
    this.pause = document.querySelector(state.btnPause);
  }

  optionDisplay(state) {
    this.stop.style.display = state.stop;
    this.start.style.display = state.start;
    this.pause.style.display = state.pause;
  }

  showBtnStart(toto) {
    this.start.style.display = toto ? "block" : "none";
  }

  showBtnStop(toto) {
    this.stop.style.display = toto ? "block" : "none";
  }

  showBtnPause(toto) {
    this.pause.style.display = toto ? "block" : "none";
  }

  //Si true bloques les inputs, si false ils sont débloqués
  inputReadOnly(lol) {
    this.inputMin.readOnly = lol;
    this.inputSec.readOnly = lol;
  }

  setInputDefault() {
    this.inputMin.value = inputDefault.min;
    this.inputSec.value = inputDefault.sec;
  }
}

let displayEl = {
  inputMin: "#inputMin",
  inputSec: "#inputSec",
  btnStop: "#stop",
  btnStart: "#start",
  btnPause: "#pause",
};

let displayOpt = {
  stop: "none",
  start: "block",
  pause: "none",
};

let display = new Display(displayEl);
display.optionDisplay(displayOpt);

function updateTimer() {
  if (timerSec > 0) {
    intervalMilli--;
    if (intervalMilli == 0) {
      timerSec--;
      let minutes = Math.floor(timerSec / 60);
      let secondes = timerSec % 60;

      minutes = minutes < 10 ? minutes : minutes;
      secondes = secondes < 10 ? secondes : secondes;

      if (timerSec >= 59) display.inputMin.value = minutes;
      display.inputSec.value = secondes;
      intervalMilli = 10;
    }
  } else {
    const alarme = new Audio("ah.mp3");
    alarme.volume = 0.7;
    alarme.play();
    stopTimer();
  }
}

function startTimer() {
  compteurIsStart = true;
  if (isInputChange || !compteurIsPause) {
    let min = parseInt(display.inputMin.value);
    let sec = parseInt(display.inputSec.value);
    let convMin = min * 60;
    timerSec = convMin + sec;
  }

  if (timerSec <= 0) {
    display.inputMin.classList.add("error");
    display.inputSec.classList.add("error");
    return;
  } else {
    display.inputMin.classList.remove("error");
    display.inputSec.classList.remove("error");
  }

  display.inputReadOnly(true);
  display.showBtnStop(true);
  display.showBtnStart(false);
  display.showBtnPause(true);

  // timerSec--;

  compteur = setInterval(updateTimer, 100);
}

function stopTimer() {
  compteurIsStart = false;
  compteurIsPause = false;
  clearInterval(compteur);
  display.setInputDefault();
  display.inputReadOnly(false);
  display.showBtnStop(false);
  display.showBtnStart(true);
  display.showBtnPause(false);
}

function pauseTimer() {
  compteurIsStart = false;
  compteurIsPause = true;
  clearInterval(compteur);
  display.inputReadOnly(false);
  display.showBtnStop(true);
  display.showBtnStart(true);
  display.showBtnPause(false);
}

function eventInputChange(e) {
  isInputChange = true;
  display.showBtnStop(false);
  display.showBtnStart(true);
  display.showBtnPause(false);
}

display.inputMin.addEventListener("input", eventInputChange);
display.inputSec.addEventListener("input", eventInputChange);
display.stop.addEventListener("click", stopTimer);
display.start.addEventListener("click", startTimer);
display.pause.addEventListener("click", pauseTimer);

for (let wrapper of document.querySelectorAll(".input")) {
  wrapper.addEventListener("click", (event) => {
    if (event.target.nodeName == "SPAN") {
      let input = event.target.parentElement.firstElementChild;
      input.focus();
      //input.setSelectionRange(input.value.length, input.value.length);
    }
  });
}

const key = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];

for (let wrapper of document.querySelectorAll(".input")) {
  wrapper.firstElementChild.addEventListener("keydown", (event) => {
    if (key.includes(event.key) && event.target.value.length == 2)
      event.target.value = "";
    if (event.key == "Enter") startTimer();
    if (
      key.includes(event.key) ||
      event.key == "Backspace" ||
      event.key.startsWith("Arrow")
    )
      return true;
    event.preventDefault();
  });
}

window.addEventListener("keyup", (event) => {
  if (event.code == "Space" && compteurIsStart) pauseTimer();
  else if (event.code == "Space" && compteurIsPause) startTimer();
});
