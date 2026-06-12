//lógica do jogo
/* funcionalidade
- mostrar cartas para baixo
-virar uma carta ao clicar
-comparar as duas cartas
-manter aberta se forem iguais
-virar novamente se forem diferentes
- detectar quando tdas as cartas forem encontradas
*/

//lógica principal- conjunto de cartas


let cartas = Array.from(document.querySelectorAll(".memory-card"));
const tabuleiro = document.querySelector(".memory-game");


// duplicar cada carta
cartas.forEach(carta => {
  const clone = carta.cloneNode(true);
  tabuleiro.appendChild(clone);
});

// Embaralhar cartas (embaralha a ordem no DOM)
cartas = Array.from(document.querySelectorAll(".memory-card"));
cartas.sort(() => Math.random() - 0.5);
cartas.forEach(carta => tabuleiro.appendChild(carta));

//variáveis importantes ( de controle)

let primeiraCarta= null;
let segundaCarta = null;
let bloqueado = false;
let moves = 0;
let seconds = 0;
let timerInterval = null;
let score = 0;


//cronometro


function startTimer() {
  if (timerInterval) return; // evita múltiplos timers
  timerInterval = setInterval(() => {
    seconds++;
    document.getElementById("timer").textContent = `⌛ ${seconds}s`;
  }, 1000);
}


function stopTimer() {
  clearInterval(timerInterval);
  timerInterval = null;
}

// elas controlam quais cartas estão abertas

// Adiciona evento de clique em cada carta
cartas.forEach(card => card.addEventListener("click", virarCarta))
//usuario clicando - Função para virar carta

function virarCarta(){
    if (bloqueado) return;
    if (this === primeiraCarta) return; // evita clicar duas vezes na mesma

  this.classList.add("flip");
    

    if (!primeiraCarta){
        primeiraCarta = this;
        startTimer(); // inicia cronômetro na primeira jogada
        return;
    }
    segundaCarta= this;
    verificarPar();
}

//verificar se forma um par
function verificarPar (){
    const igual =
    primeiraCarta.dataset.ods
    ===
    segundaCarta.dataset.ods;
    if(igual){
        desabilitarCartas();

    }else {
        desvirarCartas();
    }
}
// se forem iguais

function desabilitarCartas() {
  primeiraCarta.removeEventListener("click", virarCarta);
  segundaCarta.removeEventListener("click", virarCarta);
  reiniciarJogada();

  moves++;
  document.getElementById("moves").textContent = `Movimentos: ${moves}`;

  score += 10; // +10 pontos por par correto
  document.getElementById("score").textContent = `Pontuação: ${score}`;

  verificarVitoria();
}


//se forem diferentes
function desvirarCartas(){
    bloqueado= true;
    setTimeout(() => {
        primeiraCarta.classList.remove("flip");
        segundaCarta.classList.remove("flip");
        reiniciarJogada ();
         moves++;
         document.getElementById("moves").textContent = `Movimentos: ${moves}`;
        verificarVitoria();
    }, 600); // 1000ms = 1 segundo, ideal para crianças deixei 600=// 0.6 segundos pq não aguentava maaaiis. 



}
// ===============================
// REINICIAR JOGADA (rodada atual)
// ===============================
function reiniciarJogada() {
  [primeiraCarta, segundaCarta, bloqueado] = [null, null, false];
}


// ===============================
// VERIFICAR VITÓRIA
// ===============================
function verificarVitoria() {
  const cartasViradas = document.querySelectorAll(".flip");
  const totalCartas = document.querySelectorAll(".memory-card").length;

  if (cartasViradas.length === totalCartas) {
    stopTimer();

    // Verifica se bateu recorde
    const bestScore = Number(localStorage.getItem("bestScore")) || 0;
    const bestTime = Number(localStorage.getItem("bestTime")) || 9999;

    if (score > bestScore || (score === bestScore && seconds < bestTime)) {
      localStorage.setItem("bestScore", score);
      localStorage.setItem("bestTime", seconds);
    }

    loadRanking(); // atualiza ranking na tela

    // Mostrar overlay + tela de vitória
    const overlay = document.getElementById("overlay");
    const victory = document.getElementById("victory-message");

    if (overlay) overlay.classList.remove("hidden");

    victory.classList.remove("hidden");
    setTimeout(() => victory.classList.add("show"), 50);
  }
}


// ===============================
// CARREGAR RANKING AO INICIAR
// ===============================
function loadRanking() {
  const bestScore = localStorage.getItem("bestScore") || 0;
  const bestTime = localStorage.getItem("bestTime") || 0;

  document.getElementById("best-score").textContent =
    `Pontuação: ${bestScore}`;

  document.getElementById("best-time").textContent =
    `Tempo: ${bestTime}s`;
}


// Chamar ao carregar a página
loadRanking();


// ===============================
// REINICIAR JOGO COMPLETO
// ===============================
document.getElementById("restart-btn").addEventListener("click", () => {

  const overlay = document.getElementById("overlay");
  const victory = document.getElementById("victory-message");

  // esconder vitória
  victory.classList.remove("show");
  victory.classList.add("hidden");

  if (overlay) overlay.classList.add("hidden");

  // resetar cronômetro
  seconds = 0;
  stopTimer();
  document.getElementById("timer").textContent = "⌛ 0s";

  // resetar movimentos e pontuação
  moves = 0;
  score = 0;

  document.getElementById("moves").textContent = "Movimentos: 0";
  document.getElementById("score").textContent = "⭐ Pontuação: 0";

  // resetar cartas
  document.querySelectorAll(".memory-card").forEach(card => {
    card.classList.remove("flip");
  });

  // embaralhar cartas
  let cartas = Array.from(document.querySelectorAll(".memory-card"));
  cartas.sort(() => Math.random() - 0.5);

  const tabuleiro = document.querySelector(".memory-game");
  cartas.forEach(carta => tabuleiro.appendChild(carta));

  // resetar controle do jogo
  [primeiraCarta, segundaCarta, bloqueado] = [null, null, false];
});


// ===============================
// BOTÃO VOLTAR
// ===============================
window.onload = () => {
  const backBtn = document.getElementById("back-btn");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "index.html"; // volta para tela inicial
    });
  }
};


// ===============================
// TESTE RÁPIDO DE VITÓRIA (DEV)
// ===============================
document.addEventListener("keydown", (e) => {
  if (e.key === "v") {
    document.querySelectorAll(".memory-card").forEach(card => {
      card.classList.add("flip");
    });

    verificarVitoria();
  }
});