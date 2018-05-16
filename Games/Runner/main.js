let runner;
let highscore;
function setup() {
    createCanvas(300,300);
    colorMode(HSB,1.0);
    noStroke();
    runner = new Runner();
    runner.size(300,300);
    highscore = Cookies.get('runnerHighscore') != undefined ? Math.floor(Cookies.get('runnerHighscore')) : 0;
    runner.highscore = highscore;
}
function draw() {
    //thinking
    runner.update();
    if (keyIsPressed) {
        runner.keyPressed();
    }
    //drawing
    if(width != windowWidth || height != windowHeight) {
        resizeCanvas(windowWidth,windowHeight,true);
        runner.size(windowWidth,windowHeight);
    }
    background(0,0,0)
    runner.draw();
    highscore = max(Math.floor(runner.highscore),highscore);
    Cookies.set('runnerHighscore', highscore, { expires: 365, path: '' });
}
