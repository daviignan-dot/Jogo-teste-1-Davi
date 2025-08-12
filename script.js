// Pegando os elementos do HTML
const dino = document.getElementById('dino');
const obstacle = document.getElementById('obstacle');

// Variáveis de controle
let isJumping = false;
let jumpHeight = 0;
let gravity = 3;
let jumpPower = 20;
let isGameOver = false;
let obstacleSpeed = 2;

// Função para fazer o dinossauro pular
function jump() {
    if (isJumping || isGameOver) return; // Impede que o dinossauro pule enquanto já estiver no ar
    isJumping = true;

    // Fase de subida
    let jumpUpInterval = setInterval(() => {
        if (jumpHeight >= jumpPower) {
            clearInterval(jumpUpInterval);

            // Fase de queda
            let fallDownInterval = setInterval(() => {
                if (jumpHeight <= 0) {
                    clearInterval(fallDownInterval);
                    isJumping = false;
                    jumpHeight = 0;
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
    const dinoPosition = dino.getBoundingClientRect();

    // Colisão com o dinossauro
    if (
        obstaclePosition.left < dinoPosition.right &&
        obstaclePosition.right > dinoPosition.left &&
        obstaclePosition.top < dinoPosition.bottom &&
        obstaclePosition.bottom > dinoPosition.top
    ) {
        alert('Game Over!');
        isGameOver = true;
        clearInterval(gameInterval);
    }

    // Reseta a posição do obstáculo quando ele sair da tela
    if (obstaclePosition.right <= 0) {
        obstacle.style.right = '-50px';
    }
}

// Iniciar o movimento do obstáculo e o jogo
function startGame() {
    gameInterval = setInterval(() => {
        moveObstacle();
    }, 10);
}

// Detecta o pressionamento da tecla de pulo
document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
        jump();
    }
});

// Iniciar o jogo assim que a página carregar
window.onload = startGame;
