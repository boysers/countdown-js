let inputDefault = {
  min: '05',
  sec: '00'
}

let timerSec = 0;

let compteur = null;

class Display {
  constructor(state) {
    this.inputMin = document.querySelector(state.inputMin);
    this.inputSec = document.querySelector(state.inputSec);
    this.setInputDefault()
    this.stop = document.querySelector(state.btnStop);
    this.start = document.querySelector(state.btnStart);
    this.pause = document.querySelector(state.btnPause);
  }

  optionDisplay(state) {
    this.stop.style.display = state.stop
    this.start.style.display = state.start
    this.pause.style.display = state.pause
  }

  showBtnStart(toto) {
    this.start.style.display = toto ? "block" : "none"
  }

  showBtnStop(toto) {
    this.stop.style.display = toto ? "block" : "none"
  }
  
  showBtnPause(toto) {
    this.pause.style.display = toto ? "block" : "none"
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
  inputMin : "#inputMin",
  inputSec : "#inputSec",
  btnStop : "#stop",
  btnStart : "#start",
  btnPause : "#pause"
}

let displayOpt = {
  stop : "none",
  start : "block",
  pause : "none"
}

let display = new Display(displayEl)
display.optionDisplay(displayOpt)

function updateTimer() {
  if (timerSec > 0) {
    let minutes = Math.floor(timerSec / 60);
    let secondes = timerSec % 60;
    
    minutes = minutes < 10 ? "0" + minutes : minutes;
    secondes = secondes < 10 ? "0" + secondes : secondes;
    
    display.inputMin.value = minutes;
    display.inputSec.value = secondes;
    
    timerSec--;

  } else {
    const alarme = new Audio("ah.mp3");
    alarme.volume = 0.7;
    alarme.play();
    stopTimer()
  }
}

function startTimer() {
  display.inputReadOnly(true);
  display.showBtnStop(true);
  display.showBtnStart(false);
  display.showBtnPause(true);
  
  let min = parseInt(display.inputMin.value);
  let sec = parseInt(display.inputSec.value);
  
  let convMin = min * 60;
  timerSec = convMin + sec;
  
  timerSec--;

  compteur = setInterval(updateTimer, 1000);
}


function stopTimer() {
  clearInterval(compteur);
  display.setInputDefault();
  display.inputReadOnly(false);
  display.showBtnStop(false);
  display.showBtnStart(true);
  display.showBtnPause(false);
}

function pauseTimer() {
  clearInterval(compteur);
  display.inputReadOnly(false);
  display.showBtnStop(true);
  display.showBtnStart(true);
  display.showBtnPause(false);
}

display.stop.addEventListener("click", stopTimer);
display.start.addEventListener("click", startTimer);
display.pause.addEventListener("click", pauseTimer);


/* setTimeout(function () {
  for (let i = 0; i < 2; i++) {
    toto = document.querySelector("body").lastElementChild;
    toto.remove();
  }
}, 0); */