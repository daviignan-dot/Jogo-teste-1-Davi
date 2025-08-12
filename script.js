// Pegando os elementos do HTML
const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');

// Variáveis de controle
let isJumping = false;
let gravity = 1;
let gameInterval;
let isGameOver = false;

// Função para fazer o dinossauro pular
function jump() {
    if (isJumping) return; // Impede que o dinossauro pule enquanto já estiver no ar
    isJumping = true;

    let jumpHeight = 0;
    const jumpUp = setInterval(() => {
        if (jumpHeight >= 100) {
            clearInterval(jumpUp);
            // Começa a cair
            const fallDown = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallDown);
                    isJumping = false;
                }
                jumpHeight -= gravity;
                dino.style.bottom = jumpHeight + 'px';
            }, 20);
        }
        jumpHeight += gravity;
        dino.style.bottom = jumpHeight + 'px';
    }, 20);
}

// Função para o movimento do obstáculo
function moveObstacle() {
    if (isGameOver) return;

    const obstaclePosition = obstacle.getBoundingClientRect();

    // Colisão com o dinossauro
    if (
        obstaclePosition.left < dino.getBoundingClientRect().right &&
        obstaclePosition.top < dino.getBoundingClientRect().bottom &&
        obstaclePosition.bottom > dino.getBoundingClientRect().top
    ) {
        alert('Game Over!');
        isGameOver = true;
        clearInterval(gameInterval);
    }

    // Reseta a posição do obstáculo quando ele sair da tela
    if (obstaclePosition.left <= -30) {
        obstacle.style.right = '-50px';
    }
}

// Iniciar o jogo
function startGame() {
    gameInterval = setInterval(moveObstacle, 10);
}

// Detecta o pressionamento da tecla de pulo
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

// Iniciar o jogo assim que a página carregar
window.onload = startGame;
