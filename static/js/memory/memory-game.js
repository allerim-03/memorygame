//lógica do jogo
/* funcionalidade
- mostrar cartas para baixo
-virar uma carta ao clicar
-comparar as duas cartas
-manter aberta se forem iguais
-virar novamente se forem diferentes
- detectar quando tdas as cartas forem encontradas
*/

// ======================================
// MEMORY GAME
// Arquivo único temporário
// ======================================



// ======================================
// [FUTURO] STORAGE.JS
// ======================================
// Responsável por:
// - localStorage
// - recordes
// - ranking
//
// Funções:
// getBestScore()
// getBestTime()
// saveRecord()
// loadRanking()
// ======================================

// STORAGE (armazenamento)


function getBestScore() {
  return Number(localStorage.getItem("bestScore")) || 0;
}

function getBestTime() {
  return Number(localStorage.getItem("bestTime")) || 0;
}

function saveRecord(score, time) {
  localStorage.setItem("bestScore", score);
  localStorage.setItem("bestTime", time);
}


// RANKING / RECORDES


// CARREGAR RANKING AO INICIAR

function loadRanking() {
const bestScore = getBestScore();
const bestTime = getBestTime();

  document.getElementById("best-score").textContent =
    `⭐ Pontuação: ${bestScore}`;

  document.getElementById("best-time").textContent =
    `⌛ ${bestTime}s`;

// Chamar ao carregar a página
//--loadRanking();

// ======================================
// [FUTURO] GAME STATE
// ======================================
// Estado global do jogo:
//
// primeiraCarta
// segundaCarta
// bloqueado
//
// moves
// score
//
// seconds
// timerInterval
// ======================================

// ESTADO DO JOGO (GAME STATE)
//--7 variáveis globais em um único objeto organizado.
const GameState = {
   // cartas atualmente selecionadas
  primeiraCarta: null,
  segundaCarta: null,

  // impede cliques enquanto cartas estão sendo comparadas
  bloqueado: false,
  // estatísticas da partida
  moves: 0,
  score: 0,

  // cronômetro
  seconds: 0,
  timerInterval: null
};


// ======================================
// [FUTURO] TABULEIRO
// ======================================
// Inicialização:
//
// buscar cartas
// duplicar cartas
// embaralhar cartas
// adicionar eventos
// ======================================
const tabuleiro =
  document.querySelector(".memory-game");

function configurarTabuleiro() {

  let cartas =
    Array.from(document.querySelectorAll(".memory-card"));

  // duplicar cartas
  const novasCartas = cartas.map(carta => {
    const clone = carta.cloneNode(true);
    return clone;
  });
   novasCartas.forEach(c => tabuleiro.appendChild(c));

  // atualizar lista completa
  cartas =
    Array.from(document.querySelectorAll(".memory-card"));

  // embaralhar cartas (embaralha a ordem no DOM)
  cartas.sort(() => Math.random() - 0.5);

  cartas.forEach(carta =>
    tabuleiro.appendChild(carta)
  );
}

 

 
const MemoryGame = {

  iniciar() {
    loadRanking();
    atualizarHUD();
    atualizarTimer();
    configurarTabuleiro();
  },

  reiniciar() {
    reiniciarJogo();
  },

  embaralharCartas() {
    configurarTabuleiro();
  },

  verificarVitoria() {},

  mostrarVitoria() {}
};

// REINICIAR JOGO COMPLETO

function reiniciarJogo() {

  // UI vitória
  const overlay = document.getElementById("overlay");
  const victory = document.getElementById("victory-message");

  victory.classList.remove("show");
  victory.classList.add("hidden");

  overlay?.classList.add("hidden");


  // GAME STATE
  GameState.primeiraCarta = null;
  GameState.segundaCarta = null;
  GameState.bloqueado = false;

  GameState.moves = 0;
  GameState.score = 0;
  GameState.seconds = 0;


  // TIMER
  stopTimer();
  atualizarTimer();


  // HUD
  atualizarHUD();


  // CARTAS
  document.querySelectorAll(".memory-card")
    .forEach(card => {
      card.classList.remove("flip");
    });


  // REEMBARALHAR
  configurarTabuleiro();


  // RANKING
  loadRanking();
}
  













  


// ======================================
// [FUTURO] CRONÔMETRO
// ======================================
//
// startTimer()
// stopTimer()
// ======================================

// CRONÔMETRO



function startTimer() {
  if (GameState.timerInterval) return;

  GameState.timerInterval = setInterval(() => {
    GameState.seconds++;
    atualizarTimer();
  }, 1000);
}

function stopTimer() {
  clearInterval(GameState.timerInterval);
  GameState.timerInterval = null;
}

function atualizarTimer() {
  document.getElementById("timer").textContent =
    `⌛ ${GameState.seconds}s`;
}



// ======================================
// [FUTURO] GAME-UI.JS
// ======================================
// Interface visual:
//
// atualizarHUD()
// atualizarTimer()
//
// mostrarVitoria()
// esconderVitoria()
//
// atualizar textos na tela
// atualizar overlays
// atualizar ranking
// ======================================


// INTERFACE (UI)


function atualizarHUD() {
  document.getElementById("moves").textContent =
    `Movimentos: ${GameState.moves}`;

  document.getElementById("score").textContent =
    `⭐ Pontuação: ${GameState.score}`;
}

function atualizarTimer() {
  document.getElementById("timer").textContent =
    `⌛ ${GameState.seconds}s`;
}

function mostrarVitoria() {
  const overlay = document.getElementById("overlay");
  const victory = document.getElementById("victory-message");

  overlay?.classList.remove("hidden");

  victory.classList.remove("hidden");

  setTimeout(() => {
    victory.classList.add("show");
  }, 50);
}

function esconderVitoria() {
  const overlay = document.getElementById("overlay");
  const victory = document.getElementById("victory-message");

  victory.classList.remove("show");
  victory.classList.add("hidden");

  overlay?.classList.add("hidden");
}


// ======================================
// [FUTURO] GAME-CORE.JS
// ======================================
// Mecânica principal:
//
// virarCarta()
// verificarPar()
// desabilitarCartas()
// desvirarCartas()
// reiniciarJogada()
// verificarVitoria()
// ======================================

// MECÂNICA DAS CARTAS
// elas controlam quais cartas estão abertas

// Adiciona evento de clique em cada carta
// clique nas cartas
document.querySelectorAll(".memory-card")
  .forEach(card => card.addEventListener("click", virarCarta));

//usuario clicando - Função para virar carta

function virarCarta() {

  if (GameState.bloqueado) return;
  if (this === GameState.primeiraCarta) return;// evita clicar duas vezes na mesma

  this.classList.add("flip");

  // primeira carta
  if (!GameState.primeiraCarta) {
    GameState.primeiraCarta = this;
    startTimer(); // inicia na primeira jogada
    // inicia cronômetro na primeira jogada
    return;
  }

  // segunda carta
  GameState.segundaCarta = this;

  verificarPar();
}

//verificar se forma um par
function verificarPar() {

  const igual =
    GameState.primeiraCarta.dataset.ods ===
    GameState.segundaCarta.dataset.ods;

  if (igual) {
    desabilitarCartas();
  } else {
    desvirarCartas();
  }
}
// se forem iguais

function desabilitarCartas() {

  GameState.primeiraCarta.removeEventListener("click", virarCarta);
  GameState.segundaCarta.removeEventListener("click", virarCarta);

  reiniciarJogada();

  GameState.moves++;
  GameState.score += 10; // +10 pontos por par correto

  atualizarHUD();
  verificarVitoria();
}


//erro
//se forem diferentes

function desvirarCartas() {

  GameState.bloqueado = true;

  setTimeout(() => {

    GameState.primeiraCarta.classList.remove("flip");
    GameState.segundaCarta.classList.remove("flip");

    reiniciarJogada();

    GameState.moves++;

    atualizarHUD();
    verificarVitoria();

  }, 600);
  // 1000ms = 1 segundo, ideal para crianças 
  //deixei 600 0.6 segundos pq não aguentava maaaiis. 
}
// REINICIAR JOGADA (rodada atual)

function reiniciarJogada() {
 GameState.primeiraCarta = null;
GameState.segundaCarta = null;
GameState.bloqueado = false;
}



// SISTEMA DE VITÓRIA
// VERIFICAR VITÓRIA

function verificarVitoria() {

  const cartasViradas =
    document.querySelectorAll(".flip");

  const totalCartas =
    document.querySelectorAll(".memory-card").length;

  if (cartasViradas.length === totalCartas) {

    stopTimer();

    // ranking
    const bestScore = getBestScore();
    const bestTime = getBestTime() || 9999;

    // comparação correta (GameState)
    if (
      GameState.score > bestScore ||
      (GameState.score === bestScore && GameState.seconds < bestTime)
    ) {
      saveRecord(
        GameState.score,
        GameState.seconds
      );
    }

    loadRanking();// atualiza ranking na tela

    // mostrar vitória  -- Mostrar overlay + tela de vitória
    const overlay =
      document.getElementById("overlay");

    const victory =
      document.getElementById("victory-message");

    overlay?.classList.remove("hidden");

    victory.classList.remove("hidden");

    setTimeout(() => {
      victory.classList.add("show");
    }, 50);
  }
}
// ======================================
// [FUTURO] RESTART
// ======================================
//
// botão restart
//
// resetar:
// timer
// pontuação
// movimentos
// cartas
// estado do jogo
// ======================================

//reiniciar jogo
document.getElementById("restart-btn")
  .addEventListener("click", reiniciarJogo);


function reiniciarJogo() {

 
  // 1. esconder vitória

  const overlay = document.getElementById("overlay");
  const victory = document.getElementById("victory-message");

  victory.classList.remove("show");
  victory.classList.add("hidden");

  overlay?.classList.add("hidden");



  // 2. reset GameState
 
  GameState.primeiraCarta = null;
  GameState.segundaCarta = null;
  GameState.bloqueado = false;

  GameState.moves = 0;
  GameState.score = 0;

  GameState.seconds = 0;


 
  // 3. reset cronômetro
 
  stopTimer();
  atualizarTimer();



  // 4. reset HUD
  
  atualizarHUD();


 
  // 5. reset cartas

  const cartas =
    document.querySelectorAll(".memory-card");

  cartas.forEach(card => {
    card.classList.remove("flip");
  });


 
  // 6. reembaralhar tabuleiro

  const tabuleiro =
    document.querySelector(".memory-game");

  const cartasArray =
    Array.from(cartas);

  cartasArray.sort(() => Math.random() - 0.5);

  cartasArray.forEach(card => {
    tabuleiro.appendChild(card);
  });



  // 7. atualizar ranking
 
  loadRanking();
}

// ======================================
// [FUTURO] NAVEGAÇÃO
// ======================================
//
// botão voltar
//
// window.onload
// ======================================

// NAVEGAÇÃO
// BOTÃO VOLTAR

document.addEventListener("DOMContentLoaded", () => {

  const backBtn = document.getElementById("back-btn");

  if (backBtn) {
    backBtn.addEventListener("click", () => {
      window.location.href = "menu.html";// volta para tela inicial
      //no futuro com flask--window.history.back();
    });
  }

});

// ======================================
// [FUTURO] DEV TOOLS
// ======================================
//
// tecla V
//
// teste rápido de vitória
// ======================================


// TESTE RÁPIDO DE VITÓRIA (DEV)

document.addEventListener("keydown", (e) => {

  if (e.key === "v") {

    const cartas =
      document.querySelectorAll(".memory-card");

    cartas.forEach(card => {
      card.classList.add("flip");
    });

    // garante consistência do jogo
    verificarVitoria();
  }
});



//---------------------------------------------
//lógica principal- conjunto de cartas


document.addEventListener("DOMContentLoaded", () => {
  MemoryGame.iniciar();
});



















