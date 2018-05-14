class Snake {
    static UP() {
        return 0;
    }
    static RIGHT() {
        return 1;
    }
    static DOWN() {
        return 2;
    }
    static LEFT() {
        return 3;
    }
    constructor (w,h,size) {
        this.stopped = false;
        this.w = w;
        this.h = h;
        this.size = size;
        this.highscore = 0;
        this.reset();
    }
    resize(size) {
        this.size = size;
    }
    addFood() {
        var xpos = Math.floor(Math.random()*this.w);
        var ypos = Math.floor(Math.random()*this.h);
        this.food = [xpos,ypos];
    }
    reset() {
        this.addFood();
        this.length = 1;
        this.move(Snake.UP());
        this.move(Snake.RIGHT());
        this.squares = new Array(this.length);
        this.squares[0] = new Array(this.x,this.y);
        this.x = Math.floor(this.w/2);
        this.y = Math.floor(this.h/2);
        this.score = 0;
    }
    move(dir) {
        if ( (dir + 2) % 4 != this.dir) {
            this.dir = dir;
        }
    }
    feed() {
        var added = 2;
        this.score+=1;
        this.highscore = max(this.highscore,this.score);
        for (var i = 0; i < added; i++) {
            this.squares[this.length+i] = new Array(undefined,undefined);
        }
        this.length += added;
    }
    stop() {
        this.stopped = true;
    }
    go() {
        this.stopped = false;
    }
    isStopped() {
        return this.stopped;
    }
    update() {
        if(!this.stopped) {
            for(var i = this.length-1;i>0;i--) {
                this.squares[i] = this.squares[i-1];
            }
            this.x -= (this.dir-2)%2
            this.y += (this.dir-1)%2
            this.squares[0] = [this.x,this.y];
            if(this.x==this.food[0]&&this.y==this.food[1]) {
                this.feed();
                this.addFood();
            }
            if(this.isDead()) {
                this.stop();
                this.reset();
            }
        }
    }
    isDead() {
        if (this.x<0 || this.y<0 || this.x>this.w-1 || this.y>this.h-1) {
            return true;
        }
        for (var i = 0; i < this.length; i++) {
            for(var j = 0; j < this.length; j++) {
                if (i!=j) {
                    if (this.squares[i][0]===this.squares[j][0] && this.squares[i][1]===this.squares[j][1] && this.squares[j][1] != undefined) {
                        return true;
                    }
                }
            }
        }
    }
    draw(offsetX,offsetY) {
        fill(0,0,0.5);
        rect(offsetX,offsetY,this.w*this.size,this.h*this.size);
        fill(0,0,1);
        for(var i = 0; i<this.length; i++) {
            var x = offsetX + this.squares[i][0] * this.size;
            var y = offsetY + this.squares[i][1] * this.size;
            var size = this.size
            rect(x,y,size,size);
        }
        fill(0,1,1);
        rect(offsetX+this.food[0]*this.size,offsetY+this.food[1]*this.size,this.size,this.size);
        fill(0.1,1,1,0.5);
        textSize(this.size*this.h/4);
        textAlign(LEFT,TOP);
        text(this.score, offsetX+10, offsetY+10);
        textAlign(RIGHT,TOP);
        text(this.highscore, offsetX+this.w*this.size-10, offsetY + 10);
    }
}
