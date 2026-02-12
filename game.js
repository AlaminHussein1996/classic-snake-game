// Canvas ও Context
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

let box = 20;
let snake, food, score, highScore, direction, gameInterval;

// হাইস্কোর লোড
highScore = localStorage.getItem("snakeHS") || 0;
document.getElementById("highScore").textContent = highScore;

// Splash Screen Logic
window.onload = () => {
    setTimeout(() => {
        document.getElementById("permission-section").style.display = "block";
    }, 1500);
};

function requestPermission() {
    document.getElementById("permission-section").style.display = "none";
    document.getElementById("enter-section").style.display = "block";
}

function enterGame() {
    document.getElementById("splash-screen").style.opacity = "0";
    setTimeout(() => {
        document.getElementById("splash-screen").style.display = "none";
        startGame();
    }, 800);
}

// Game Initialization
function startGame() {
    snake = [{ x: 9 * box, y: 10 * box }];
    food = generateFood();
    score = 0;
    direction = "";
    document.getElementById("score").textContent = score;

    clearInterval(gameInterval);
    gameInterval = setInterval(draw, 300); // Slower snake
}

// Random Food Generator
function generateFood() {
    return {
        x: Math.floor(Math.random() * (canvas.width / box)) * box,
        y: Math.floor(Math.random() * (canvas.height / box)) * box
    };
}

// Direction Change
function changeDirection(dir) {
    if (dir === "LEFT" && direction !== "RIGHT") direction = "LEFT";
    else if (dir === "UP" && direction !== "DOWN") direction = "UP";
    else if (dir === "RIGHT" && direction !== "LEFT") direction = "RIGHT";
    else if (dir === "DOWN" && direction !== "UP") direction = "DOWN";
}

// Keyboard Control
document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowLeft": changeDirection("LEFT"); break;
        case "ArrowUp": changeDirection("UP"); break;
        case "ArrowRight": changeDirection("RIGHT"); break;
        case "ArrowDown": changeDirection("DOWN"); break;
    }
});

// Draw Game
function draw() {
    // Clear Canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw Snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? "#00ffcc" : "#008866";
        let radius = box / 2;
        ctx.beginPath();
        ctx.arc(segment.x + radius, segment.y + radius, radius - 2, 0, 2 * Math.PI);
        ctx.fill();
    });

    // Draw Food
    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(food.x + box / 2, food.y + box / 2, box / 2, 0, 2 * Math.PI);
    ctx.fill();

    // Move Snake
    let headX = snake[0].x;
    let headY = snake[0].y;

    if (direction === "LEFT") headX -= box;
    if (direction === "UP") headY -= box;
    if (direction === "RIGHT") headX += box;
    if (direction === "DOWN") headY += box;

    // Eat Food
    if (headX === food.x && headY === food.y) {
        score++;
        document.getElementById("score").textContent = score;

        if (score > highScore) {
            highScore = score;
            localStorage.setItem("snakeHS", highScore);
            document.getElementById("highScore").textContent = highScore;
        }

        food = generateFood();
    } else {
        snake.pop(); // Remove tail if no food eaten
    }

    const newHead = { x: headX, y: headY };

    // Collision Check
    if (headX < 0 || headX >= canvas.width || headY < 0 || headY >= canvas.height || checkCollision(newHead, snake)) {
        clearInterval(gameInterval);
        setTimeout(() => {
            alert("গেম ওভার! স্কোর: " + score);
            startGame();
        }, 100);
        return;
    }

    // Add new head
    snake.unshift(newHead);
}

// Collision Detection
function checkCollision(head, array) {
    return array.some(segment => segment.x === head.x && segment.y === head.y);
}
