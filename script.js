let gameContainer = document.querySelector(".game-container")
let scoreContainer = document.querySelector(".score-container")

let foodX, foodY;
let headX = 10, headY = 10;
let velocityX = 0, velocityY = 0;
let snakebody = []
let score = 0;


function generateFood() {
    foodX = Math.floor(Math.random() * 25) + 1;
    foodY = Math.floor(Math.random() * 25) + 1;
    for(let i=0;i<snakebody.length;i++){
        if(snakebody[i][1] == foodY && snakebody[i][0] == foodX){
            generateFood()
            
            
        }
    }

}
function gameOver() {
    headX = 12;
    headY = 12;
    generateFood();
    velocityX = 0;
    velocityY = 0;
    snakebody = []
    score = 0
    scoreContainer.innerHTML = "Score: "+score
    alert("Game Over!")
}

function renderGame() {
    let updatedGame = `<div class="food" style="grid-area: ${foodY}/${foodX};"></div>`;
    if (foodX == headX && headY == foodY) {
        snakebody.push([foodX,foodY])
        generateFood();
        score += 10;
        scoreContainer.innerHTML = "Score: "+score

    }

    snakebody.pop();
    headX += velocityX;
    headY += velocityY;
    snakebody.unshift([headX, headY])

    if (headX == 0 || headY == 0 || headX == 26 || headY == 26) {
        gameOver();
    }
    for(let i=1;i<snakebody.length;i++){
        if(snakebody[0][0] == snakebody[i][0] && snakebody[0][1] == snakebody[i][1]){
            gameOver();
        }
    }

    for (let i = 0; i < snakebody.length; i++) {
        updatedGame += `<div class="snake" style="grid-area: ${snakebody[i][1]}/${snakebody[i][0]};"></div>`;

    }


    gameContainer.innerHTML = updatedGame;
}
generateFood();
setInterval(renderGame, 150);
document.addEventListener("keydown", function (e) {
    let key = e.key;
    console.log(e.key);
    if (key == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (key == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (key == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (key == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }

}
)