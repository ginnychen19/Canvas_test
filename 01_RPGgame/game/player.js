import { Sitting ,Running,Jumping,Falling } from './playerStates.js';

//這邊的this = Player這個class ，也就是操控角色。
export class Player {
    constructor(game) {
        this.game = game;
        this.width = 100;
        this.height = 91.3;
        this.x = 0;
        this.y = this.game.height - this.height;
        this.vy = 0; //控制角色掉落速度的變量
        this.weight = 1;
        this.image = document.getElementById("myplayer");
        this.frameX = 0; //這邊是用來畫精靈圖。
        this.frameY = 0; //決定動作狀態。  
        this.maxframe; //決定動作狀態。 
        this.fps = 20; //這邊影響動畫看起來的速度。
        this.frameInterval = 1000 / this.fps;
        this.frameTimer = 0; //以上三個用來計數動畫
        this.speed = 0;
        this.maxSpeed = 10;
        this.states = [//這邊會放playerStates.js的各種狀態。
            new Sitting(this),
            new Running(this),
            new Jumping(this),
            new Falling(this)
        ]; 
        this.currentState = this.states[0];
        this.currentState.enter();
    }
    update(input ,deltaTime) {
        this.currentState.handleInput(input);//在每次更新前先檢查狀態
        // horizontal movement 左右移動
        this.x += this.speed;
        if (input.includes('ArrowRight')) this.speed = this.maxSpeed;
        else if (input.includes('ArrowLeft')) this.speed = -this.maxSpeed;
        else this.speed = 0;
        if (this.x < 0) this.x = 0;
        if (this.x > this.game.width - this.width) this.x = this.game.width - this.width;

        // vertical movement 上下移動
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;

        //畫動態圖
        if(this.frameTimer > this.frameInterval){ 
            this.frameTimer = 0;
            if(this.frameX < this.maxframe) this.frameX++;
            else this.frameX = 0;
        }else{
            this.frameTimer += deltaTime;
            //這時可能會發現動態有少，所以我們在playerStates加入maxframe的值！
        }
    }

    draw(context) {
        // console.log(context);
        context.drawImage(
            this.image, 

            this.frameX * this.width, this.frameY * this.height, 
            this.width, this.height,
            
            this.x, this.y,
            this.width,this.height
            );
    }

    onGround() {
        return this.y >= this.game.height - this.height;
    }
    setState(state){
        //把從playerStates.js接收到的狀態內容換到這裡
        this.currentState = this.states[state];//這是啥意思?
        this.currentState.enter();
    }
}

/*
    this.vy 被初始化为 0，
    这意味着角色在垂直方向上不会运动，
    但当角色跳跃或下落时，
    this.vy 的值将会被修改，以控制角色的垂直运动。

    在 Player.update() 方法中，
    this.y += this.vy 可以更新角色在垂直方向上的位置。
*/
/*
    假设currentState是一个状态对象，
    它有一个名为enter()的方法，
    该方法会在状态进入时被调用，
    执行一些初始化操作或者开始执行该状态的逻辑。
*/