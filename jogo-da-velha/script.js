let jogador = null;
let vencedor = null;

const jogadorVencedor = document.getElementById("jogador-vencedor");
const jogadorSelecionado = document.getElementById("jogador-selecionado");
const reiniciarBtn = document.querySelector("button");

mudarJogador("X");

function escolherQuadrado(id) {
  if (vencedor !== null) {
    return;
  }

  const quadrado = document.getElementById(id);

  if (quadrado.innerHTML !== "⠀") {
    return;
  }

  quadrado.innerHTML = jogador;

  if (jogador === "X") {
    jogador = "O";
  } else {
    jogador = "X";
  }
  mudarJogador(jogador);
  checarVencedor();
}

function mudarJogador(valor) {
  jogador = valor;
  jogadorSelecionado.innerHTML = jogador;
}

function checarVencedor() {
  let quadrado1 = document.getElementById(1);
  let quadrado2 = document.getElementById(2);
  let quadrado3 = document.getElementById(3);
  let quadrado4 = document.getElementById(4);
  let quadrado5 = document.getElementById(5);
  let quadrado6 = document.getElementById(6);
  let quadrado7 = document.getElementById(7);
  let quadrado8 = document.getElementById(8);
  let quadrado9 = document.getElementById(9);

  if (checarSequencia(quadrado1, quadrado2, quadrado3)) {
    mudarCorQuadrado(quadrado1, quadrado2, quadrado3);
    mudarVencedor(quadrado1);
    return;
  }

  if (checarSequencia(quadrado4, quadrado5, quadrado6)) {
    mudarCorQuadrado(quadrado4, quadrado5, quadrado6);
    mudarVencedor(quadrado4);
    return;
  }

  if (checarSequencia(quadrado7, quadrado8, quadrado9)) {
    mudarCorQuadrado(quadrado7, quadrado8, quadrado9);
    mudarVencedor(quadrado7);
    return;
  }

  if (checarSequencia(quadrado1, quadrado4, quadrado7)) {
    mudarCorQuadrado(quadrado1, quadrado4, quadrado7);
    mudarVencedor(quadrado1);
    return;
  }

  if (checarSequencia(quadrado2, quadrado5, quadrado8)) {
    mudarCorQuadrado(quadrado2, quadrado5, quadrado8);
    mudarVencedor(quadrado2);
    return;
  }

  if (checarSequencia(quadrado3, quadrado6, quadrado9)) {
    mudarCorQuadrado(quadrado3, quadrado6, quadrado9);
    mudarVencedor(quadrado3);
    return;
  }

  if (checarSequencia(quadrado1, quadrado5, quadrado9)) {
    mudarCorQuadrado(quadrado1, quadrado5, quadrado9);
    mudarVencedor(quadrado1);
    return;
  }

  if (checarSequencia(quadrado3, quadrado5, quadrado7)) {
    mudarCorQuadrado(quadrado3, quadrado5, quadrado7);
    mudarVencedor(quadrado3);
    return;
  }
}

function mudarVencedor(quadrado) {
  vencedor = quadrado.innerHTML;
  jogadorVencedor.innerHTML = vencedor;
}

function mudarCorQuadrado(quadrado1, quadrado2, quadrado3) {
  quadrado1.style.background =
    "linear-gradient(315deg, #00b712 0%, #5aff15 74%)";
  quadrado2.style.background =
    "linear-gradient(315deg, #00b712 0%, #5aff15 74%)";
  quadrado3.style.background =
    "linear-gradient(315deg, #00b712 0%, #5aff15 74%)";
}

function checarSequencia(quadrado1, quadrado2, quadrado3) {
  var sequenciaCorreta = false;

  if (
    quadrado1.innerHTML !== "⠀" &&
    quadrado1.innerHTML === quadrado2.innerHTML &&
    quadrado2.innerHTML === quadrado3.innerHTML
  ) {
    sequenciaCorreta = true;
  }
  return sequenciaCorreta;
}

function reiniciar() {
  location.reload();
}
