const inputAll = document.querySelectorAll("input");
function inputOff(){
  for (let i = 0; i < inputAll.length; i++) {
    inputAll[i].setAttribute("readonly", true);
  }
}

function inputOn() {
  for (let i = 0; i < inputAll.length; i++) {
    inputAll[i].readOnly = false;
  }
}

class Display {
  constructor(stop, start, pause) {
    this.stop = stop;
    this.start = start;
    this.pause = pause;
  }
}

diplayOff = new Display("none","block","none");
function displayButton() {
  document.querySelector("#stop").style.display = diplayOff.stop
  document.querySelector("#start").style.display = diplayOff.start
  document.querySelector("#pause").style.display = diplayOff.pause
}
displayButton()

const start = document.getElementById("start");
start.addEventListener("click", function() {
  const pause = document.getElementById("pause");
  const stop = document.getElementById("stop");

  const inputMin = document.getElementById("inputMin");
  let min = parseInt(inputMin.value);

  const inputSec = document.getElementById("inputSec");
  let sec = parseInt(inputSec.value);

  let convMin = min * 60;
  let timerSec = convMin + sec;

  diplayOff = new Display("block","none","block");
  displayButton()

  inputOff()

  if (isNaN(sec) || isNaN(min)) {
    alert("toto");
  } else {
    const timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
      if (timerSec >= 0) {
        timerSec--;
        
        let minutes = Math.floor(timerSec / 60);
        let secondes = timerSec % 60;
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        secondes = secondes < 10 ? "0" + secondes : secondes;
        

        inputMin.value = minutes;
        inputSec.value = secondes;
      } else {
        setTimeout(function() {
          const alarme = new Audio("ah.mp3");
          alarme.volume = .7;
          alarme.play();

          inputMin.value = "05";
          inputSec.value = "00";

          diplayOff = new Display("none","block","none");
          displayButton()

          inputOn()
        }, 0);
        stopInterval();
      }
    }

    function stopInterval() {
      clearInterval(timerInterval);
    }

    pause.addEventListener("click", function() {
      stopInterval();
      inputOff()

      diplayOff = new Display("block","block","none");
      displayButton()

    });

    stop.addEventListener("click", function() {
      stopInterval();

      inputMin.value = "05";
      inputSec.value = "00";

      diplayOff = new Display("none","block","none");
      displayButton()

      inputOn()
    });
  }
});

/* setTimeout(function () {
  for (let i = 0; i < 2; i++) {
    caca = document.querySelector("body").lastElementChild;
    caca.remove();
  }
}, 0); */
