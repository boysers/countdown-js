const start = document.getElementById("start");

start.addEventListener("click", function() {
  const pause = document.getElementById("pause");
  const stop = document.getElementById("stop");
  const continuer = document.getElementById("continuer");

  const inputMin = document.getElementById("inputMin");
  let min = parseInt(inputMin.value);

  const inputSec = document.getElementById("inputSec");
  let sec = parseInt(inputSec.value);

  let convMin = min * 60;
  let timerSec = convMin + sec;

  start.style.display = "none";
  stop.style.display = "block";
  pause.style.display = "block";

  inputMin.setAttribute("readonly", true);
  inputSec.setAttribute("readonly", true);

  if (isNaN(sec) || isNaN(min)) {
    alert("toto");
  } else {
    const timerInterval = setInterval(updateTimer, 1000);

    function updateTimer() {
      if (timerSec >= 0) {
        
        let minutes = Math.floor(timerSec / 60);
        let secondes = timerSec % 60;
        
        minutes = minutes < 10 ? "0" + minutes : minutes;
        secondes = secondes < 10 ? "0" + secondes : secondes;
        
        timerSec--;

        inputMin.value = minutes;
        inputSec.value = secondes;
      } else {
        setTimeout(function() {
          const alarme = new Audio("ah.mp3");
          alarme.volume = .7;
          alarme.play();
          start.style.display = "block";
          stop.style.display = "none";
          pause.style.display = "none";
          inputMin.readOnly = false;
          inputSec.readOnly = false;
          inputMin.value = "00";
          inputSec.value = "00";
        }, 0);
        stopInterval();
      }
    }

    function stopInterval() {
      clearInterval(timerInterval);
    }

    pause.addEventListener("click", function() {
      stopInterval();
      start.style.display = "block";
      stop.style.display = "block";
      pause.style.display = "none";
      inputMin.setAttribute("readonly", true);
      inputSec.setAttribute("readonly", true);
    });

    stop.addEventListener("click", function() {
      stopInterval();
      inputMin.value = "05";
      inputSec.value = "00";
      start.style.display = "block";
      stop.style.display = "none";
      pause.style.display = "none";
      inputMin.readOnly = false;
      inputSec.readOnly = false;
    });
  }
});

/* setTimeout(function () {
  for (let i = 0; i < 2; i++) {
    caca = document.querySelector("body").lastElementChild;
    caca.remove();
  }
}, 0); */
