function getRandomPosition(rectangle, size) {
  const edge = Math.floor(Math.random() * 4);
  const max_x = rectangle.clientWidth - size;
  const max_y = rectangle.clientHeight - size;
  const offset = size * 2;

  switch (edge) {
    case 0:
      return {
        x: Math.floor(Math.random() * max_x),
        y: -offset,
      };
    case 1:
      return {
        x: rectangle.clientWidth + offset,
        y: Math.floor(Math.random() * max_y),
      };
    case 2:
      return {
        x: Math.floor(Math.random() * max_x),
        y: rectangle.clientHeight + offset,
      };
    case 3:
    default:
      return {
        x: -offset,
        y: Math.floor(Math.random() * max_y),
      };
  }
}

function createRandomCircle(rectangleElement) {
  const rectangle = rectangleElement;
  const circle = document.createElement("div");
  const size = Math.floor(Math.random() * 100) + 10;
  const position = getRandomPosition(rectangle, size);
  const duration = 5 + Math.random() * 5;
  const finalPosition = getRandomPosition(rectangle, size);

  circle.style.width = `${size}px`;
  circle.style.height = `${size}px`;
  circle.style.left = `${position.x}px`;
  circle.style.top = `${position.y}px`;
  circle.style.backgroundColor = "rgba(255, 0, 255, 1)";
  circle.style.position = "absolute";
  circle.style.borderRadius = "50%";
  circle.style.filter = "blur(50px)";
  circle.style.zIndex = "-1";

  const animation = circle.animate(
    [
      { left: `${position.x}px`, top: `${position.y}px` },
      { left: `${finalPosition.x}px`, top: `${finalPosition.y}px` },
    ],
    {
      duration: duration * 1000,
      iterations: 1,
      easing: "linear",
    }
  );

  animation.onfinish = () => {
    circle.remove();
    createRandomCircle(rectangleElement);
  };

  rectangle.appendChild(circle);
}

setTimeout(function(){
  $("#loading").addClass("animated fadeOut");
  setTimeout(function(){
    $("#loading").removeClass("animated fadeOut");
    $("#loading").css("display","none");
    $("#box").css("display","none");
    $("#about").removeClass("animated fadeIn");
    $("#contact").removeClass("animated fadeIn");
    $("#work").removeClass("animated fadeIn");
  },1000);
},1500);

function createRandomCircles(rectangleElement) {
  const numberOfCircles = Math.floor(Math.random() * 10) + 1;

  for (let i = 0; i < numberOfCircles; i++) {
    createRandomCircle(rectangleElement);
  }
}

const rectangleElement = document.querySelector(".rectangle");
const spotifyPlayerElement = document.querySelector(".spotifyplayer");
const rectangleRightElement = document.querySelector(".rectangle-right");
const rectangleLeftElement = document.querySelector(".rectangle-left");

createRandomCircles(rectangleElement);
createRandomCircles(spotifyPlayerElement);
createRandomCircles(rectangleRightElement);
createRandomCircles(rectangleLeftElement);

document.addEventListener("DOMContentLoaded", function () {
  const videoFiles = [
    "media/video1.mp4",
    "media/video2.mp4",
    "media/video3.mp4",
    "media/video4.mp4",
  ];

  const randomIndex = Math.floor(Math.random() * videoFiles.length);
  const randomVideoFile = videoFiles[randomIndex];

  const videoElement = document.querySelector(".background-video video");
  const sourceElement = document.createElement("source");

  sourceElement.setAttribute("src", randomVideoFile);
  sourceElement.setAttribute("type", "video/mp4");

  videoElement.appendChild(sourceElement);
  videoElement.load();
});

const expandButtonRight = document.getElementById('expand-button-right');
const arrowRight = expandButtonRight.querySelector('.arrow');
const container = document.querySelector('.container');
const rectangleRight = document.querySelector('.rectangle-right');
const rectangleButtonRight = document.querySelector('.rectangle-button-right');

const expandButtonLeft = document.getElementById('expand-button-left');
const arrowLeft = expandButtonLeft.querySelector('.arrow-left');
const rectangleLeft = document.querySelector('.rectangle-left');
const rectangleButtonLeft = document.querySelector('.rectangle-button-left')

let expandedRight = false;
let expandedLeft = false;

expandButtonRight.addEventListener('click', () => {
  expandedRight = !expandedRight;
  arrowRight.classList.toggle('rotate');
  rectangleRight.classList.toggle('show');
  rectangleButtonRight.classList.toggle('move-right');
});

expandButtonLeft.addEventListener('click', () => {
  expandedLeft = !expandedLeft;
  arrowLeft.classList.toggle('rotate');
  rectangleLeft.classList.toggle('show');
  rectangleButtonLeft.classList.toggle('move-left');
});
const translations = {
  ru: {
      about_me: "О себе",
      description: "Я программист с опытом работы более 1 года в разработке веб-приложений. Моя специализация включает работу с PHP Laravel, Python, React.js и Node.js. Я стремлюсь создавать высококачественные и эффективные решения для клиентов, уделяя особое внимание деталям и пользовательскому опыту.",
      project_title: "Проекты",
      php_laravel: "PHP Laravel",
      about_me_title: "Стэк",
      react: "React.js",
      node: "Node.js",
      js: "JS",
      python: "Python",
      html: "HTML",
      css: "CSS"
  },
  en: {
      about_me: "About me",
      description: "I`m a programmer with over 1 year of experience in web application development. My specialization includes working with PHP Laravel, Python, React.js, and Node.js. I strive to create high-quality and effective solutions for clients, paying special attention to detail and user experience.",
      project_title: "Project",
      about_me_title: "Stack",
      php_laravel: "PHP Laravel",
      react: "React.js",
      node: "Node.js",
      js: "JS",
      python: "Python",
      html: "HTML",
      css: "CSS"
  }
};

function setLanguage(lang) {
  const elements = document.querySelectorAll('[data-translate]');
  elements.forEach(el => {
      const key = el.getAttribute('data-translate');
      if (translations[lang] && translations[lang][key]) {
          el.textContent = translations[lang][key];
      } else {
          el.textContent = '';
      }
  });
  localStorage.setItem('language', lang);
}

document.addEventListener('DOMContentLoaded', function () {
  const savedLanguage = localStorage.getItem('language') || 'en';
  setLanguage(savedLanguage);
});