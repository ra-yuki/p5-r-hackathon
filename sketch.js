var main;
function setup(){
    createCanvas(640, 480);
    main = new Main();
}

function draw(){
    Update();
    background(0);
    Draw();
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
      main = new Main();
  }
  if (keyCode === RIGHT_ARROW) {
      main.option.x += main.spd;
      main.option.y += main.spd;
  }
  if (keyCode === LEFT_ARROW) {
      main.option.x -= main.spd;
      main.option.y -= main.spd;
  }
}

function Update(){
    main.Update();
}

function Draw(){
    main.Draw();
}

class Main{
    constructor(){
        // option
        this.option = new Vec2(50, 100);
        // lines
        this.num = 5;
        this.lines = new Array();
        for(var i=0; i<this.num; i++){
            var rand_st = random(width*0.1, width*0.8);
            this.lines[i] = new Vec2(round(rand_st), round(rand_st+100));
        }
        // collision num
        this.collisions = 0;
        // spd
        this.spd = 20;
    }
    
    Update(){
        this.collisions = this.GetCollisions();
    }
    
    GetCollisions(){
        var collisionNum = 0;
        for(var i=0; i<this.num; i++){
            if(this.CollideLines(this.option, this.lines[i])){
                collisionNum++;
            }
        }
        
        return collisionNum;
    }
    
    CollideLines(line, line2){
        var cond = line.x < line2.y;
        var cond2 = line.y > line2.x;
        if(cond && cond2){
            return true;
        }
        
        return false;
    }
    
    Draw(){
        // option
        fill(255, 125, 125);
        noStroke();
        rect(this.option.x, height*0.2, this.option.y-this.option.x, height*0.8);
        
        fill(255,0,0);
        textSize(32);
        text("x_st:" + this.option.x + ", x_ed:" + this.option.y, 10, height*0.1);
        
        textSize(20);
        text("scheduling here", this.option.x-50, height*0.17);
        // lines
        stroke(255);
        strokeWeight(5);
        color(255,0,0);
        for(var i=0; i<this.num; i++){
            var h = i*50 + height*0.3;
            stroke(255);
            line(this.lines[i].x, h, this.lines[i].y, h);
            noStroke();
            text(this.lines[i].x, this.lines[i].x, h-20);
            text(this.lines[i].y, this.lines[i].y, h-20);
        }
        
        // collisions
        textSize(32);
        color(255);
        noStroke();
        text("collisions:" + this.collisions, width*0.5, height*0.1);
    }
}

class Vec2{
    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}