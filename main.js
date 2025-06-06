let level = 0;

function countdown() {
  let countdownElement = document.getElementById("countdown");
  let timeLeft = 3;
  let gameDiv = document.querySelector(".content");
  let overlayDiv = document.querySelector(".overlay");

  const countdown = setInterval(() => {
    if (timeLeft <= 0) {
      clearInterval(countdown);
      countdownElement.parentElement.style.display = "none";

      gameDiv.style.backgroundSize = "800px";
      gameDiv.style.backgroundPosition = "-90px 0px";
      overlayDiv.style.display = "none";
    } else {
      countdownElement.innerHTML = timeLeft;
      timeLeft--;
    }
  }, 1000);
}

function generateNumber() {
  let numbers = [];
  numbersRange = 11;
  if (level === 1) {
    numbersRange = 101;
  }
  if (level >= 2) {
    numbersRange = 1001;
  }

  let randomNumber = Math.floor(Math.random() * numbersRange);
  document.getElementById("number").innerHTML = randomNumber;
  document.getElementById("variant").innerHTML = randomNumber;
  numbers.push(randomNumber);

  const variants = document.querySelectorAll(".variant");

  let successInsert = false;
  variants.forEach((variant) => {
    while (!successInsert) {
      if (!numbers.includes(randomNumber)) {
        variant.innerHTML = randomNumber;
        numbers.push(randomNumber);
        successInsert = true;
        console.log(numbers);
      } else {
        randomNumber = Math.floor(Math.random() * numbersRange);
      }
    }
    successInsert = false;
  });
}

function generateRandomStyle() {
  const variants = document.querySelectorAll(".variant, #variant");
  const colors = ["red", "blue", "green", "black", "yellow", "orange"];
  const animationClasses = ["fadeInOut", "scale", "rotate"];

  variants.forEach((variant) => {
    let randomColor = Math.floor(Math.random() * (colors.length - 1));
    variant.style.backgroundColor = colors[randomColor];

    if (level >= 2) {
      variant.classList.add(
        animationClasses[
          Math.floor(Math.random() * (animationClasses.length - 1))
        ]
      );
    }

    console.log(colors[randomColor]);
  });
}

function randomizeVariants() {
  // Функция для перемешивания массива
  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  // Получаем все элементы с классом 'variant' и 'variant' id
  const variantsContainer = document.querySelector(".variants");
  const variants = Array.from(variantsContainer.children);

  // Перемешиваем элементы
  const shuffledVariants = shuffleArray(variants);

  // Очищаем контейнер и добавляем перемешанные элементы обратно
  variantsContainer.innerHTML = "";
  shuffledVariants.forEach((variant) => {
    variantsContainer.appendChild(variant);
  });
}

function game() {
  let correctAnswers = 0;
  let wrongAnswers = 0;

  const variants = document.querySelectorAll(".variant, #variant");

  variants.forEach((variant) => {
    variant.addEventListener("click", () => {
      if (variant.id === "variant") {
        correctAnswers++;
        level++;
        console.log("level:", level);
        // console.log(correctAnswers);
        document.getElementById("correct").innerHTML = correctAnswers;
        resetStyle();
        goNext();
      } else {
        wrongAnswers++;
        if (level >= 1) {
          level--;
        }
        console.log("level:", level);
        // console.log(wrongAnswers);
        document.getElementById("wrong").innerHTML = wrongAnswers;
        resetStyle();
        goNext();
      }
    });
  });
}

function resetStyle() {
  const variants = document.querySelectorAll(".variant, #variant");
  variants.forEach((variant) => {
    variant.classList.remove("fadeInOut", "scale", "rotate");
  });
}

function startGame() {
  countdown();
  generateNumber();
  generateRandomStyle();
  randomizeVariants();
  game();
}

function goNext() {
  generateNumber();
  generateRandomStyle();
  randomizeVariants();
}
