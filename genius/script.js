let order = [];
let clickedOrder = [];
let score = 0;

//0 = verde
//1 = vermelho
//2 = amarelo
//3 = azul

const verde = document.querySelector(".verde");
const vermelho = document.querySelector(".vermelho");
const amarelo = document.querySelector(".amarelo");
const azul = document.querySelector(".azul");

//criar ordem aleatória de cores
function shuffleOrder() {
  let colorOrder = Math.floor(Math.random() * 4);
  order[order.length] = colorOrder;
  clickedOrder = [];

  for (let i in order) {
    let elementColor = createColorElement(order[i]);
    lightColor(elementColor, Number(i) + 1);
  }
}

//acende a próxima cor
function lightColor(element, number) {
  number = number * 500;
  setTimeout(() => {
    element.classList.add("selected");
  }, number - 250);
  setTimeout(() => {
    element.classList.remove("selected");
  }, number);
}

//checa se os notões clicados são os mesmos da ordem gerada no jogo
function checkOrder() {
  for (let i in clickedOrder) {
    if (clickedOrder[i] !== order[i]) {
      gameOver();
      break;
    }
  }
  if (clickedOrder.length == order.length) {
    alert(`Pontuação: ${score}\nVocê acertou! Iniciando próximo nível!`);
    nextLevel();
  }
}

//funcao para o clique do usuario
function click(color) {
  clickedOrder[clickedOrder.length] = color;
  createColorElement(color).classList.add("selected");

  setTimeout(() => {
    createColorElement(color).classList.remove("selected");
    checkOrder();
  }, 100);

  checkOrder();
}

//funcao que retorna a cor
function createColorElement(color) {
  if (color == 0) {
    return verde;
  } else if (color == 1) {
    return vermelho;
  } else if (color == 2) {
    return amarelo;
  } else if (color == 3) {
    return azul;
  }
}

//funcao para proximo nivel

function nextLevel() {
  score++;
  shuffleOrder();
}

// funcao para game over
function gameOver() {
  alert(
    `Pontuação: ${score}\n
    Você perdeu o jogo!\n
    Clique 'OK' para jogar novamente`
  );
  order = [];
  clickedOrder = [];

  playGame();
}

//funao iniciar jogo
function playGame() {
  alert("Bem-vindo(a) ao Genesis! Iniciando novo jogo");
  score = 0;

  nextLevel();
}

//eventos de clique para as cores
verde.onclick = () => click(0);
vermelho.onclick = () => click(1);
amarelo.onclick = () => click(2);
azul.onclick = () => click(3);


//iniciar jogo
playGame();
