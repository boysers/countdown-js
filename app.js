const start = document.getElementById("start");
start.addEventListener("click", function () {
  const inputMin = document.getElementById("inputMin").value;
  let min = parseInt(inputMin);

  const inputSec = document.getElementById("inputSec").value;
  let sec = parseInt(inputSec);

  let convMin = min * 60;
  let timerSec = convMin + sec;
  if (isNaN(sec) || isNaN(min)) {
      alert("toto");
    } else {
    const timer = document.getElementById("timer");
    const compteur = setInterval(function () {
      if (timerSec > 0) {
        timerSec--;

        const minutes = Math.floor(timerSec / 60);
        let secondes = timerSec % 60;

        secondes = secondes < 10 ? "0" + secondes : secondes;
        timer.innerHTML = `${minutes} : ${secondes}`;
      } else {
        setTimeout(function () {
          timer.innerHTML = "ah !";
          const alarme = new Audio("ah.mp3");
          alarme.play();
        }, 0);
        clearInterval(compteur);
      }
    }, 1000);

    const stop = document.getElementById("stop");
    stop.addEventListener("click", function (e) {
      timer.innerHTML = "";
      clearInterval(compteur);
    });
  }
});
