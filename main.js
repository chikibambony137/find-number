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

  let numbers = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];

  let randomNumber = Math.floor(Math.random() * 10);
  document.getElementById("number").innerHTML = numbers[randomNumber];
  document.getElementById("variant").innerHTML = numbers[randomNumber];
  numbers.splice(randomNumber, 1);

  console.log(numbers);

  const variants = document.querySelectorAll(".variant");
  let index = 0;
  numbers.forEach((number) => {
    variants[index].innerHTML = number;
    numbers.splice(index, 1);
    console.log(numbers);
    index++;
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

function game(){
  let correctAnswers = 0;
  let wrongAnswers = 0;

  const variants = document.querySelectorAll('.variant, #variant');

  variants.forEach(variant => {
      variant.addEventListener('click', () => {
          if (variant.id === 'variant') {
              correctAnswers++;
              console.log(correctAnswers);
              document.getElementById('correct').innerHTML = correctAnswers;
              goNext();

          } else {
              wrongAnswers++;
              console.log(wrongAnswers);
              document.getElementById('wrong').innerHTML = wrongAnswers;
              goNext();
          }
      });
  });
}

function startGame() {
  countdown();
  generateNumber();
  randomizeVariants();
  game();
}

function goNext() {
  generateNumber();
  randomizeVariants();
}