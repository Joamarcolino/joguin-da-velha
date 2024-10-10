const currentPlayer = document.querySelector(".currentPlayer");
let selected = [];
let player = "X";
const positions = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7],
];

function init() {
    selected = [];
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`;
    document.querySelectorAll(".game button").forEach((item) => {
        item.innerHTML = ""; // Limpa o conteúdo do botão
        item.addEventListener("click", newMove);
    });
}

init(); // Inicializa o jogo

function newMove(e) {
    const index = e.target.getAttribute("data-i");
    e.target.innerHTML = player; // Mostra o jogador atual no botão
    e.target.removeEventListener("click", newMove); // Remove o evento de clique após uma jogada
    selected[index] = player; // Registra a jogada
    setTimeout(check, 100); // Verifica se há vencedor após um pequeno atraso
    player = player === "X" ? "O" : "X"; // Alterna entre os jogadores
    currentPlayer.innerHTML = `JOGADOR DA VEZ: ${player}`; // Atualiza o jogador atual
}

function check() {
    const playerLastMove = player === "X" ? "O" : "X"; // Determina o último jogador
    const items = selected
        .map((item, i) => [item, i])
        .filter((item) => item[0] === playerLastMove)
        .map((item) => item[1]);

    for (const pos of positions) {
        if (pos.every((item) => items.includes(item))) {
            alert("O JOGADOR '" + playerLastMove + "' GANHOU!"); // Anuncia o vencedor
            init(); // Reinicia o jogo
            return; // Interrompe a execução
        }
    }

    // Verifica se houve empate
    if (selected.filter((item) => item).length === 9) {
        alert("DEU EMPATE!");
        init(); // Reinicia o jogo
    }
}