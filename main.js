function countdown() {
  let countdownElement = document.getElementById("countdown");
  let timeLeft = 3;
  let gameDiv = document.querySelector(".content");
  let overlayDiv = document.querySelector(".overlay");

  const countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      countdownElement.parentElement.style.display = "none";

      gameDiv.style.backgroundImage =
        "url('../assets/images/game-background-light.png')";
      gameDiv.style.backgroundSize = "800px";
      gameDiv.style.backgroundPosition = "-90px 0px";
      overlayDiv.style.display = "none";
    } else {
      countdownElement.innerHTML = timeLeft;
      timeLeft--;
    }
  }, 1000);
}