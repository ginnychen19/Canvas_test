import { Player } from './player.js';
import { InputHandler } from './input.js';
import { Background } from './backgrond.js';
import { FlyingEnemy,GroundEnemy,ClimbingEnemy} from './enemies.js';

window.addEventListener('load', function () {
    const canvas = this.document.getElementById("canvas1")
    const ctx = canvas.getContext('2d');
    
    canvas.width = 600;
    canvas.height = 500;

    class Game {
        constructor(width, height) {
            this.width = width;
            this.height = height;
            this.groundMargin = 80; //(引響狗的高度)設定畫布中的地板有多高
            this.speed = 1; //影響整體畫面速度
            this.background = new Background(this)
            this.player = new Player(this);
            this.input = new InputHandler();
            this.enemies = [];
            this.enemyTimer = 0;
            this.enemyInterval = 1000;

        }
        update(deltaTime) {
            this.background.update();
            this.player.update(this.input.keys,deltaTime);
            //handleEnemies
            if(this.enemyTimer > this.enemyInterval){
                this.addEnemy();
                this.enemyTimer = 0;
            }else{
                this.enemyTimer += deltaTime;
            }
            this.enemies.forEach(enemy =>{ //enemy是從addEnemy()底下收進來的 new FlyingEnemy(this)
                enemy.update(deltaTime);
                if(enemy.markedForDeletion) this.enemies.splice(this.enemies.indexOf(enemy),1);//刪除當前這個enemy
            })
        }
        draw(context) {
            this.background.draw(context);
            this.player.draw(context);
            this.enemies.forEach(enemy =>{
                enemy.draw(context);
            })
        }
        addEnemy(){
            this.enemies.push(new FlyingEnemy(this));//讓FlyingEnemy可以取得this.game物件
            console.log(this.enemies);//會發現每秒都有多新增敵人
        }
    }

    const game = new Game(canvas.width, canvas.height);
    //console.log(game);
    let lastime = 0;

    function animate(timeStamp) {
        const deltaTime = timeStamp - lastime;
        // console.log(deltaTime);
        //這個console.log可以發現requestAnimationFram的時間是算的很細的。
        //因此我們把時間加入到.update()
        lastime = timeStamp;
        // game.draw(ctx);
        //要加clearRect，要不然會有無限殘影。
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        game.update(deltaTime);
        game.draw(ctx);
        requestAnimationFrame(animate);
    }
    animate(0);
});