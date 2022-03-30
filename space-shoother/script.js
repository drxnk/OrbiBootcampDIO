const yourShip = document.querySelector(".player-shooter");
const playArea = document.querySelector("#main-playing-area");
const startBtn = document.querySelector(".start-button");
const title = document.querySelector(".title");
let alienInterval;

//funcao movimentos e tiro da nave
function flyShip(event) {
  if (event.key === "w") {
    event.preventDefault();
    moveUp();
  } else if (event.key === "s") {
    event.preventDefault();
    moveDown();
  } else if (event.key === " ") {
    event.preventDefault();
    fireLaser();
  }
}

//funcao de subir
function moveUp() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
  if (topPosition === "20px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position -= 10;
    yourShip.style.top = `${position}px`;
  }
}

//funcao de descer
function moveDown() {
  let topPosition = getComputedStyle(yourShip).getPropertyValue("top");
  if (topPosition === "720px") {
    return;
  } else {
    let position = parseInt(topPosition);
    position += 10;
    yourShip.style.top = `${position}px`;
  }
}

//funcao de tiro
function fireLaser() {
  let laser = createLaserElement();
  playArea.appendChild(laser);
  moveLaser(laser);
}

function createLaserElement() {
  let xPosition = parseInt(
    window.getComputedStyle(yourShip).getPropertyValue("left")
  );

  let yPosition = parseInt(
    window.getComputedStyle(yourShip).getPropertyValue("top")
  );

  let newLaser = document.createElement("img");

  newLaser.src = "img/shoot.png";
  newLaser.classList.add("laser");
  newLaser.style.left = `${xPosition}px`;
  newLaser.style.top = `${yPosition - 10}px`;

  return newLaser;
}

function moveLaser(laser) {
  let laserInterval = setInterval(() => {
    let xPosition = parseInt(laser.style.left);

    let aliens = document.querySelectorAll(".alien");

    aliens.forEach((alien) => {
      //comparando se cada alien foi atingido, se sim, troca o src da img
      if (checkLaserCollision(laser, alien)) {
        alien.src = "img/explosion.png";
        alien.classList.remove("alien");
        alien.classList.add("dead-alien");
      }
    });

    if (xPosition === 550) {
      laser.remove();
    } else {
      laser.style.left = `${xPosition + 10}px`;
    }
  }, 12);
}

//funcao para criar inimigos
function createAlien() {
  let newAlien = document.createElement("img");

  newAlien.src = "img/monster.png";
  newAlien.classList.add("alien");
  newAlien.style.left = "500px";
  newAlien.style.top = `${Math.floor(Math.random() * 700) + 30}px`;

  playArea.appendChild(newAlien);

  moveAlien(newAlien);
}

//funcao para movimentar inimigos
function moveAlien(alien) {
  let moveAlienInterval = setInterval(() => {
    let xPosition = parseInt(
      window.getComputedStyle(alien).getPropertyValue("left")
    );

    if (xPosition <= -200) {
      if (Array.from(alien.classList).includes("dead-alien")) {
        alien.remove();
      } else {
        gameOver();
      }
    } else {
      alien.style.left = `${xPosition - 5}px`;
    }
  }, 30);
}

//funcao  para colisao
function checkLaserCollision(laser, alien) {
  let laserTop = parseInt(laser.style.top);
  let laserLeft = parseInt(laser.style.left);
  let laserBottom = laserTop - 20;

  let alienTop = parseInt(alien.style.top);
  let alienLeft = parseInt(alien.style.left);
  let alienBottom = alienTop - 30;

  if (laserLeft != 550 && laserLeft + 40 >= alienLeft) {
    if (laserTop <= alienTop && laserTop >= alienBottom) {
      return true;
    } else {
      return false;
    }
  } else {
    return false;
  }
}

//inicio do jogo

startBtn.addEventListener("click", (event) => {
  playGame();
});
function playGame() {
  yourShip.classList.add("start");
  startBtn.style.display = "none";
  title.style.display = "none";
  window.addEventListener("keydown", flyShip);
  alienInterval = setInterval(() => {
    createAlien();
  }, 2000);
}

//funcao game over
function gameOver() {
  window.removeEventListener("keydown", flyShip);
  clearInterval(alienInterval);
  let aliens = document.querySelectorAll(".alien");
  aliens.forEach((alien) => alien.remove());
  let lasers = document.querySelectorAll(".laser");
  lasers.forEach((laser) => laser.remove());
  setTimeout(() => {
    alert("GAME OVER!\n  - Aperte OK para jogar novamente ");
    yourShip.classList.remove("start");
    yourShip.style.top = "250px";
    title.style.display = "block";
    startBtn.style.display = "block";
  });
}
