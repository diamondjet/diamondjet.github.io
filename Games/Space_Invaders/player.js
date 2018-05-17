class Player {
    constructor (w,h) {
        this.size(w,h);
    }
    size(w,h) {
        this.w = w;
        this.h = h;
        this.sizing = min(this.w,this.h);
        this.maxSizing = max(this.w,this.h);
        this.reset();
    }
    addEnemies() {
        for(let i = 0; i < 10; i++) {
            for (let j = 0; j < 4; j++) {
                this.enemies[i*4+j] = new Invader(i*this.sizing/15,j*this.sizing/15,this.sizing/20,this.sizing/20,this.maxSizing/200);
            }
        }
    }
    reset() {
        this.player = {};
        this.enemies = [];
        this.addEnemies();
    }
    kill() {
        this.reset();
    }
    update() {
        let switchDir = false;
        for (let enemy of this.enemies) {
            enemy.update();
            if(enemy.onEdge(this.w)) {
                switchDir = true;
            }
            if(enemy.killer()) {
                this.kill(this.h);
            }
        }
        if (switchDir) {
            for (let enemy of this.enemies) {
                enemy.changeDir();
            }
        }
    }
    draw() {
        noStroke();
        for (let enemy of this.enemies) {
            enemy.draw(color(255,0,0));
        }
    }
}
