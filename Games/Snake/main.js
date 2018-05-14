var snake = new Snake(30,30,10);
var snakesSizing = 10;
function setup() {
    createCanvas(windowWidth,windowHeight);
    snakesSizing = min((windowWidth-10)/32, (windowHeight-10)/32)
    snake.resize(snakesSizing);
    background(51);
    frameRate(10);
    colorMode(HSB,1.0)
    highscore = Cookies.get('snakeHighscore') != undefined ? Math.floor(Cookies.get('snakeHighscore')) : 0;
    snake.highscore = highscore;
}
var highscore = 0;
function draw() {
    snake.update();
    if(snake.isStopped()) {
        highscore = max(Math.floor(snake.highscore),highscore);
        Cookies.set('snakeHighscore', highscore, { expires: 365, path: '' });
        snake.go();
    }
    //drawing
    if (width!=windowWidth || height!=windowHeight) {
        resizeCanvas(windowWidth,windowHeight,true);
        snakesSizing = min((windowWidth-10)/32, (windowHeight-10)/32)
        snake.resize(snakesSizing);
    }
    background(0,0,0);
    fill(255);
    noStroke();
        var offsetX = (windowWidth - snake.w * (snake.size))/2;
        var offsetY = (windowHeight - snake.h * (snake.size))/2;
        snake.draw(offsetX,offsetY);
}
function keyPressed() {
    if (keyCode === LEFT_ARROW) {
      snake.move(Snake.LEFT());
    } else if (keyCode === RIGHT_ARROW) {
      snake.move(Snake.RIGHT());
    }
    else if (keyCode === UP_ARROW) {
      snake.move(Snake.UP());
    }
    else if (keyCode === DOWN_ARROW) {
      snake.move(Snake.DOWN());
    }
}
