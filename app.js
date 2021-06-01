const inputAll = document.querySelectorAll("input");
function inputOff() {
  for (let i = 0; i < inputAll.length; i++) {
    inputAll[i].setAttribute("readonly", true);
  }
}

function inputOn() {
  for (let i = 0; i < inputAll.length; i++) {
    inputAll[i].readOnly = false;
  }
}

function inputDefault() {
  inputMin.value = "05";
  inputSec.value = "00";
}

class Display {
  constructor(stop, start, pause) {
    this.stop = stop;
    this.start = start;
    this.pause = pause;
  }
}

function displayButton() {
  document.querySelector("#stop").style.display = diplayOff.stop;
  document.querySelector("#start").style.display = diplayOff.start;
  document.querySelector("#pause").style.display = diplayOff.pause;
}

diplayOff = new Display("none", "block", "none");
displayButton();

const start = document.getElementById("start");
start.addEventListener("click", function () {
  diplayOff = new Display("block", "none", "block");
  displayButton();
  inputOff();
  startTimer();
});

function startTimer() {
  const inputMin = document.getElementById("inputMin");
  let min = parseInt(inputMin.value);

  const inputSec = document.getElementById("inputSec");
  let sec = parseInt(inputSec.value);

  let convMin = min * 60;
  let timerSec = convMin + sec;

  timerSec--

  const compteur = setInterval(function () {
    if (timerSec > 0) {
      let minutes = Math.floor(timerSec / 60);
      let secondes = timerSec % 60;
      console.log(timerSec);

      minutes = minutes < 10 ? "0" + minutes : minutes;
      secondes = secondes < 10 ? "0" + secondes : secondes;

      inputMin.value = minutes;
      inputSec.value = secondes;

      timerSec--;
    } else {
      const alarme = new Audio("ah.mp3");
      alarme.volume = 0.7;
      alarme.play();

      inputDefault();

      diplayOff = new Display("none", "block", "none");
      displayButton();

      inputOn();

      stopInterval(compteur);
    }
  }, 1000);

  const stop = document.getElementById("stop");
  stop.addEventListener("click", function () {
    diplayOff = new Display("none", "block", "none");
    displayButton();
    inputDefault();
    inputOn();
    stopInterval();
  });

  const pause = document.getElementById("pause");
  pause.addEventListener("click", function () {
    stopInterval();
    inputOff();

    diplayOff = new Display("block", "block", "none");
    displayButton();
  });

  function stopInterval() {
    clearInterval(compteur);
  }
}

// function setTimer() {
//   if (isNaN(sec) || isNaN(min)) {
//     alert("toto");
//   } else {}
// }

/* setTimeout(function () {
  for (let i = 0; i < 2; i++) {
    toto = document.querySelector("body").lastElementChild;
    toto.remove();
  }
}, 0); */
