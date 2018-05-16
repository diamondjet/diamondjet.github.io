class Runner {
    constructor(w,h) {
        this.player = {};
        this.ground = {};
        this.size(w,h);
        this.rate = 70;
        this.highscore = 0;
        this.reset();
    }

    reset() {
        this.obstacles = new Array();
        this.mostRecent = 0;
        this.speed = 10;
        this.player.ySpeed = 0;
        this.player.xPos = 0;
        this.score = 0;
        this.isDay = true;
        this.bright = 1
    }
    size(w,h) {
        this.w = w;
        this.h = h;
        this.sizing = floor(min(this.w/6,this.h/6));
        this.player.x = this.sizing/2
        this.player.w = this.sizing/2
        this.player.h = this.sizing
        this.player.y = this.h - this.sizing*1.5;
        this.player.maxY = this.h - this.sizing*1.5;
        this.ground.w = this.w;
        this.ground.h = this.sizing/2;
        this.ground.y = this.h - this.sizing/2;
        this.ground.x = 0;
    }
    draw() {

        background(0.6,0.4,1);

        applyMatrix();
        translate(this.w-this.sizing*0.25,this.sizing*0.25);
            fill(0.17,1,this.bright);
            ellipse(0,0,this.sizing,this.sizing);
            stroke(0.15,1,1);
            strokeWeight(2);
            for(let i = 0; i < TWO_PI; i += TWO_PI/15) {
                line(this.sizing*sin(i)*0.75,this.sizing*cos(i)*0.75,this.sizing*sin(i),this.sizing*cos(i));
            }
            noStroke();

        resetMatrix();
        fill(0.3,1,1);
        rect(this.ground.x,this.ground.y,this.ground.w,this.ground.h);
        for (let obstacle of this.obstacles) {
            obstacle.draw(color(1,1,1));
        }
        fill(0,0,0);
        rect(this.player.x,this.player.y,this.player.w,this.player.h);
        textSize(this.sizing/2);
        textAlign(LEFT,TOP);
        text(this.score,this.sizing/8,this.sizing/8);
        text(this.highscore,this.sizing/8,5*this.sizing/8);
    }
    jump() {
        if (this.player.y == this.h - this.sizing*1.5) {
            this.player.ySpeed += this.sizing/3;
        }
    }
    isDead() {
        for (let obstacle of this.obstacles) {
            if (this.player.x + this.player.w < obstacle.x) {
            } else if (this.player.y + this.player.h < obstacle.y) {
            } else if (this.player.x > obstacle.x+obstacle.w) {
            } else if (this.player.y > obstacle.y+obstacle.h) {}
            else {
                return true;
            }
        }
        return false;
    }
    update() {
        this.score += 1;
        this.highscore = max(this.highscore,this.score);
        if(this.score % 1000 == 0) {
            this.isDay = !this.isDay;
        }
        this.player.y -= this.player.ySpeed;
        this.player.ySpeed -= this.sizing/40;
        this.player.xPos += 1;
        if (this.player.y >= this.player.maxY) {
            this.player.y = this.player.maxY;
            this.player.ySpeed = 0;
        }
        if(this.player.xPos > this.mostRecent+10) {
            this.mostRecent += this.rate;
            this.speed+=0.1;
            let he = this.ground.h * (random(1+min(this.speed/10,2))+1);
            this.obstacles.push(new Obstacle(this.w,this.ground.y-he,this.player.w,he,this.speed));
        }

        for (var i = this.obstacles.length - 1; i > 0; i--) {
            this.obstacles[i].update();
            if (this.obstacles[i].isDead()) {
                this.obstacles.splice(i,1);
            }
        }
        if(this.isDead()) {
            this.reset();
        }
    }
    keyPressed() {
        if (key == " ") {
            this.jump();
        }
    }
}
