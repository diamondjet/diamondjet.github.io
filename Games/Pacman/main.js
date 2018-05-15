let pacman;
function setup() {
    createCanvas(windowWidth,windowHeight);
    colorMode(HSB)
    background(0,0,0);
    pacman = new Pacman(windowWidth,windowHeight);
}
function draw() {
    pacman.draw();
}
