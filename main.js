let level = 1;

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
      document.getElementById("gameplay").style.display = "block";
      timer();
    } else {
      countdownElement.innerHTML = timeLeft;
      timeLeft--;
    }
  }, 1000);
}

function generateNumber() {
  const variants = document.querySelectorAll(".variant-text, #variant-text");
  let numbers = [];

  if (level === 1) {
    numbersRange = 11;
    variants.forEach((variant) => {
      variant.style.fontSize = "40px";
    });
  }
  if (level === 2) {
    numbersRange = 101;
    variants.forEach((variant) => {
      variant.style.fontSize = "40px";
    });
  }
  if (level === 3) {
    numbersRange = 1001;
    variants.forEach((variant) => {
      variant.style.fontSize = "40px";
    });
  }
  if (level >= 4) {
    numbersRange = 10001;
    variants.forEach((variant) => {
      variant.style.fontSize = "28px";
    });
  }

  let randomNumber = Math.floor(Math.random() * numbersRange);
  document.getElementById("number").innerHTML = randomNumber;
  document.getElementById("variant-text").innerHTML = randomNumber;
  numbers.push(randomNumber);

  const wrongVariants = document.querySelectorAll(".variant-text");

  let successInsert = false;
  wrongVariants.forEach((variant) => {
    while (!successInsert) {
      if (!numbers.includes(randomNumber)) {
        variant.innerHTML = randomNumber;
        numbers.push(randomNumber);
        successInsert = true;
        // console.log(numbers);
      } else {
        randomNumber = Math.floor(Math.random() * numbersRange);
      }
    }
    successInsert = false;
  });
}

function generateRandomStyle() {
  const variants = document.querySelectorAll(".variant, .dop-variant");
  const variantsText = document.querySelectorAll(
    ".variant-text, #variant-text"
  );
  const colors = ["#92b55e", "#fc73b0", "#8e3dcb", "#4db8ec", "#f28e37"];
  const animationClasses = ["fadeInOut", "scale", "rotate"];

  index = 0;
  variants.forEach((variant) => {
    let randomColor = Math.floor(Math.random() * colors.length);
    variant.style.backgroundColor = colors[randomColor];

    if (level >= 3) {
      animation = Math.floor(Math.random() * animationClasses.length);

      // если анимация вращения, то применяется только к тексту
      if (animation === 2) {
        variantsText[index].classList.add(animationClasses[animation]);
      } else {
        variant.classList.add(animationClasses[animation]);
      }
      // console.log(animationClasses[animation], index, animation);
    }
    index++;
    // console.log(colors[randomColor]);
  });
  if (level > 1) {
    const background = document.querySelector(".content");
    const taskBackground = document.querySelector(".task");
    let randomBackgroundColor =
      colors[Math.floor(Math.random() * colors.length)];
    background.style.backgroundColor = randomBackgroundColor;
    taskBackground.style.backgroundColor = randomBackgroundColor;
    console.log(randomBackgroundColor);
  }
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

  const variants = document.querySelectorAll(".variant-text, #variant-text");

  variants.forEach((variant) => {
    variant.addEventListener("click", () => {
      if (variant.id === "variant-text") {
        correctAnswers++;
        level++;
        console.log("level:", level);
        enableDopVariants();

        // console.log(correctAnswers);
        document.getElementById("level").innerHTML = level;
        resetStyle();
        goNext();
      } else {
        wrongAnswers++;
        enableDopVariants();
        if (level > 1) {
          level--;
        }
        console.log("level:", level);
        // console.log(wrongAnswers);
        document.getElementById("level").innerHTML = level;
        resetStyle();
        goNext();
      }
    });
  });
}

function resetStyle() {
  const variants = document.querySelectorAll(".variant, .dop-variant");
  const variantsText = document.querySelectorAll(
    ".variant-text, #variant-text"
  );

  variants.forEach((variant) => {
    variant.classList.remove("fadeInOut", "scale");
  });

  variantsText.forEach((variantText) => {
    variantText.classList.remove("rotate");
  });
}

function enableDopVariants() {
  const variants = document.querySelectorAll(".dop-variant");

  if (level > 3) {
    variants.forEach((variant) => {
      variant.style.display = "block";
    });
  } else {
    variants.forEach((variant) => {
      variant.style.display = "none";
    });
  }
}

function timer() {
  const time = document.getElementById("time");
  let timeLeft = 59;
  const timer = setInterval(() => {
    if (timeLeft < 0) {
      clearInterval(timer);
    } else if (timeLeft >= 10) {
      time.innerHTML = "00:" + timeLeft;
    } else {
      time.innerHTML = "00:0" + timeLeft;
    }
    timeLeft--;
  }, 1000);
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
