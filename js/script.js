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

//reiniciar a rodada
function reiniciarJogada(){
    [primeiraCarta, segundaCarta,bloqueado]= [null,null,false];
}



// Atualizar recorde ao vencer
function verificarVitoria() {
  const cartasViradas = document.querySelectorAll(".flip");
  const totalCartas = document.querySelectorAll(".memory-card").length;
  if (cartasViradas.length === totalCartas) {
    stopTimer();

    // Verifica se bateu recorde
    const bestScore = localStorage.getItem("bestScore") || 0;
    const bestTime = localStorage.getItem("bestTime") || 9999;

    if (score > bestScore || (score == bestScore && seconds < bestTime)) {
      localStorage.setItem("bestScore", score);
      localStorage.setItem("bestTime", seconds);
    }

    loadRanking(); // atualiza na tela

    const victory = document.getElementById("victory-message");
    victory.classList.remove("hidden");
    setTimeout(() => victory.classList.add("show"), 50);
  }
}

// Chamar ao carregar a página
loadRanking();







// Reiniciar jogo
document.getElementById("restart-btn").addEventListener("click", () => {
  const victory = document.getElementById("victory-message");
  victory.classList.remove("show");
  setTimeout(() => victory.classList.add("hidden"), 600); // fade-out

  // resetar cronômetro
  seconds = 0;
  stopTimer();
  document.getElementById("timer").textContent = "Tempo: 0s";
// resetar movimentos e pontuação
  moves = 0;
  score = 0;
  document.getElementById("moves").textContent = "Movimentos: 0";
  document.getElementById("score").textContent = "Pontuação: 0";
 

  // Desvira todas as cartas
  document.querySelectorAll(".memory-card").forEach(card => {
    card.classList.remove("flip");
    card.addEventListener("click", virarCarta);
  });

  // Embaralha novamente
  let cartas = Array.from(document.querySelectorAll(".memory-card"));
  cartas.sort(() => Math.random() - 0.5);
  const tabuleiro = document.querySelector(".memory-game");
  cartas.forEach(carta => tabuleiro.appendChild(carta));

  // Reinicia variáveis de controle
  [primeiraCarta, segundaCarta, bloqueado] = [null, null, false];
});

// Carregar recorde ao iniciar
function loadRanking() {
  const bestScore = localStorage.getItem("bestScore") || 0;
  const bestTime = localStorage.getItem("bestTime") || 0;
  document.getElementById("best-score").textContent = `Pontuação: ${bestScore}`;
  document.getElementById("best-time").textContent = `Tempo: ${bestTime}s`;
}
// Botão voltar
window.onload = () => {
  const backBtn = document.getElementById("back-btn");
  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "index.html";//volta para a tela inicial do jogo index
      //window.history.back(); // volta para a página anterior
    });
  }
}

//para testar vitoria
document.addEventListener("keydown", (e) => {
  if (e.key === "v") {
    document.querySelectorAll(".memory-card").forEach(card => {
      card.classList.add("flip");
    });

    verificarVitoria();
  }
});