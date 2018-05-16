class Obstacle {
    constructor (x,y,w,h,speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.s = speed;
        this.h = h;
        this.kill = false;
    }
    isDead() {
        return this.kill;
    }
    update() {
        this.x -= this.s;
        if (this.x+this.w < 0) {
            this.kill = true;
        }
    }
    draw(c) {
        fill(c);
        rect(this.x,this.y,this.w,this.h);
    }
}
