// আপনার আগের সব লজিক ঠিক থাকবে, শুধু পজ করার অংশটুকু যোগ করা হলো
let isPaused = false;
let gameInterval;

function pauseGame() {
    isPaused = !isPaused;
    const pauseBtn = document.querySelector('.pause-btn');
    pauseBtn.innerText = isPaused ? "▶" : "⏸";
    pauseBtn.style.color = isPaused ? "#00ffcc" : "#ff4444";
    pauseBtn.style.borderColor = isPaused ? "#00ffcc" : "#ff4444";
}

function draw() {
    if (isPaused) return; // গেম পজ থাকলে ড্র হবে না
    
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    snake.forEach((part, index) => {
        ctx.fillStyle = index === 0 ? "#00ffcc" : "#008866";
        ctx.fillRect(part.x * 20, part.y * 20, 18, 18);
    });

    ctx.fillStyle = "#ff4444";
    ctx.fillRect(food.x * 20, food.y * 20, 18, 18);

    moveSnake();
    checkCollision();
}

function startGame() {
    document.getElementById("splash-screen").style.display = "none";
    if (gameInterval) clearInterval(gameInterval);
    gameInterval = setInterval(draw, 150);
}
// বাকি ফাংশনগুলো (moveSnake, changeDirection) আপনার আগের মতোই থাকবে।
