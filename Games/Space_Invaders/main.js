let player;
function setup() {
    createCanvas(300,300);
    player = new Player(300,300);
}
function draw() {
    if(player.w != windowWidth || player.h != windowHeight) {
        resizeCanvas(windowWidth,windowHeight,true);
        player.size(windowWidth,windowHeight);
    }
    background(0);
    player.update()
    player.draw(color(255,0,0));
}
