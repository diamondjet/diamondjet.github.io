class Invader {
    constructor (x,y,w,h,speed) {
        this.x = x;
        this.y = y;
        this.w = w;
        this.h = h;
        this.speed = speed;
        this.dir = 1;
    }
    changeDir() {
        this.dir = (this.dir==1?-1:1);
        this.y += this.h;
    }
    onEdge(w) {
        return (this.x<=0 || this.x+this.w>=w)
    }
    update() {
        this.x += this.dir * this.speed;
    }
    killer(h) {
        if(this.y+this.h*2.5>h) {
            return true;
        }
    }
    draw(col) {
        fill(col);
        rect(this.x,this.y,this.w,this.h);
    }
}
