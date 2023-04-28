window.addEventListener("load", eventWindowloaded, false);
var Debugger = function () { };
Debugger.log = function (massage) {
    try {
        console.log(massage)
    } catch (exception) {
        return;
    }
}

function eventWindowloaded() {
    canvasApp();
}
function canvasSupport() {
    return Modernizr.canvas;
}

function canvasApp() {
    if (!canvasSupport()) {
        return;
    } else {
        var theCanvas = document.getElementById("canvasOne");
        var context = theCanvas.getContext("2d");
        var canvasTwo = document.getElementById("canvasTwo");
        var context2 = canvasTwo.getContext("2d");
    }

    //先確保圖片素材都已經加入近來
    var frameIndex_5 = 0; //挖賽這位置還不能亂換ㄝ
    var frameIndex_6 = 0;
    var frameIndex_10 = 0;
    var frameIndex_dead = 0;

    const ALLimage = loadImages(
        {
            "myGirl_walk": {
                src: "../img/Walk_ani.png",
                aniframe: 10,
            },
            "myGirl_Idle": {
                src: "../img/Idle_ani.png",
                aniframe: 5,
            },
            "myGirl_jump": {
                src: "../img/jump_ani.png",
                aniframe: 10,
            },
            "myGirl_Dead": {
                src: "../img/Dead_ani.png",
                aniframe: 10,
            },
            "weed": {
                src: "../img/weed_ani.png",
                aniframe: 6,
            },
            "weedPoisonou": {
                src: "../img/weedPoisonous_ani.png",
                aniframe: 6,
            },
        },
        starUP  // this is called when all images have loaded.
    );
    function loadImages(images, onAllLoaded) {
        var numLoading = Object.keys(images).length;
        const onload = () => --numLoading === 0 && onAllLoaded();
        const ALLimage = {};
        for (const [name, data] of Object.entries(images)) {
            const img = new Image();
            img.src = data.src;
            img.onload = onload;

            ALLimage[name] = {
                img,
                src: data.src,
                aniframe: data.aniframe,
            };
        }
        return ALLimage;
    }
    //畫圖
    function drawCanvasOne() {
        context.fillStyle = '#50C878'; //畫背景
        context.fillRect(0, 0, theCanvas.width, theCanvas.height); //(600 * 600 的土地)

        context.drawImage(//走路
            ALLimage["myGirl_walk"].img,
            ALLimage["myGirl_walk"].img.width / ALLimage["myGirl_walk"].aniframe * frameIndex_10,
            0,
            ALLimage["myGirl_walk"].img.width / ALLimage["myGirl_walk"].aniframe,
            ALLimage["myGirl_walk"].img.height,

            0,
            20,
            ALLimage["myGirl_walk"].img.width / (ALLimage["myGirl_walk"].aniframe * 2),
            ALLimage["myGirl_walk"].img.height / 2,
        );
        context.drawImage(//閒置
            ALLimage["myGirl_Idle"].img,
            ALLimage["myGirl_Idle"].img.width / ALLimage["myGirl_Idle"].aniframe * frameIndex_5,
            0,
            ALLimage["myGirl_Idle"].img.width / ALLimage["myGirl_Idle"].aniframe,
            ALLimage["myGirl_Idle"].img.height,

            120,
            20,
            ALLimage["myGirl_Idle"].img.width / (ALLimage["myGirl_Idle"].aniframe * 2),
            ALLimage["myGirl_Idle"].img.height / 2,
        );
        context.drawImage(//跳躍
            ALLimage["myGirl_jump"].img,
            ALLimage["myGirl_jump"].img.width / ALLimage["myGirl_jump"].aniframe * frameIndex_10,
            0,
            ALLimage["myGirl_jump"].img.width / ALLimage["myGirl_jump"].aniframe,
            ALLimage["myGirl_jump"].img.height,

            240,
            20,
            ALLimage["myGirl_jump"].img.width / (ALLimage["myGirl_jump"].aniframe * 2),
            ALLimage["myGirl_jump"].img.height / 2,
        );
        context.drawImage(//死亡
            ALLimage["myGirl_Dead"].img,
            ALLimage["myGirl_Dead"].img.width / ALLimage["myGirl_Dead"].aniframe * frameIndex_dead,
            0,
            ALLimage["myGirl_Dead"].img.width / ALLimage["myGirl_Dead"].aniframe,
            ALLimage["myGirl_Dead"].img.height,

            360,
            20,
            ALLimage["myGirl_Dead"].img.width / (ALLimage["myGirl_Dead"].aniframe * 2),
            ALLimage["myGirl_Dead"].img.height / 2,
        );
        context.drawImage(//正常葉子
            ALLimage["weed"].img,
            ALLimage["weed"].img.width / ALLimage["weed"].aniframe * frameIndex_6,
            0,
            ALLimage["weed"].img.width / ALLimage["weed"].aniframe,
            ALLimage["weed"].img.height,

            510,
            100,
            ALLimage["weed"].img.width / (ALLimage["weed"].aniframe * 4),
            ALLimage["weed"].img.height / 4,
        );
        context.drawImage(//死亡葉子
            ALLimage["weedPoisonou"].img,
            ALLimage["weedPoisonou"].img.width / ALLimage["weedPoisonou"].aniframe * frameIndex_6,
            0,
            ALLimage["weedPoisonou"].img.width / ALLimage["weedPoisonou"].aniframe,
            ALLimage["weedPoisonou"].img.height,

            510,
            40,
            ALLimage["weedPoisonou"].img.width / (ALLimage["weedPoisonou"].aniframe * 4),
            ALLimage["weedPoisonou"].img.height / 4,
        );
        //動畫計數器們
        frameIndex_5++;
        frameIndex_6++;
        frameIndex_10++;
        frameIndex_dead++;

        if (frameIndex_5 == ALLimage["myGirl_Idle"].aniframe) {
            frameIndex_5 = 0;
        }
        if (frameIndex_6 == ALLimage["weed"].aniframe) {
            frameIndex_6 = 0;
        }
        if (frameIndex_10 == ALLimage["myGirl_walk"].aniframe) {
            frameIndex_10 = 0;
        }
        if (frameIndex_dead == ALLimage["myGirl_Dead"].aniframe) {
            frameIndex_dead = 9; //我想維持在第10偵，但不知為何，就是會導致人物不見。
        }
    }

    //畫圖-目前主要
    function drawCanvastwo() {
        var playerX = 0;
        var playerY = 0;

        context2.fillStyle = '#50C878'; //畫背景
        context2.fillRect(0, 0, canvasTwo.width, canvasTwo.height); //(600 * 600 的土地)

        render("myGirl_Idle", playerX, playerY);
        draw_leafGood();
       
        //動畫計數器們
        frameIndex_5++;
        frameIndex_6++;
        frameIndex_10++;
        frameIndex_dead++;

        if (frameIndex_5 == ALLimage["myGirl_Idle"].aniframe) {
            frameIndex_5 = 0;
        }
        if (frameIndex_6 == ALLimage["weed"].aniframe) {
            frameIndex_6 = 0;
        }
        if (frameIndex_10 == ALLimage["myGirl_walk"].aniframe) {
            frameIndex_10 = 0;
        }
        if (frameIndex_dead == ALLimage["myGirl_Dead"].aniframe) {
            frameIndex_dead = 9; //我想維持在第10偵，但不知為何，就是會導致人物不見。
        }
    }
    function update(){
        $(document).on("keydown", function (event) {
            var speed = 10;
            event.preventDefault(); //避免鍵盤預設行為發生，如捲動/放大/換頁...
            //判斷使用者按下什麼並推算目標座標
            switch (event.code) {
                case "ArrowLeft":
                case "KeyA":
                    console.log("往左");
                    playerX += -speed;
                    playerY += 0;
                    setInterval(drawCanvasOne, 100);
                    render("myGirl_walk", playerX, playerY);
                    break;
                case "ArrowUp":
                case "KeyW":
                    console.log("往上");
                    playerX += 0;
                    playerY += -speed;
                    render("myGirl_walk", playerX, playerY);
                    break;
                case "ArrowRight":
                case "KeyD":
                    console.log("往右");
                    playerX += speed;
                    playerY += 0;
                    render("myGirl_walk", playerX, playerY);
                    break;
                case "ArrowDown":
                case "KeyS":
                    console.log("往下");
                    playerX += 0;
                    playerY += speed;
                    render("myGirl_walk", playerX, playerY);
                    break;
                // case "Space":
                //     console.log("跳");
                default://其他按鍵不處理
                    return;
            }
        });
    }
    //處理使用者按下按鍵
    function render(ani, X, Y) {
        //setInterval(function () {
            context2.fillRect(0, 0, canvasTwo.width, canvasTwo.height);
            context2.drawImage(
                ALLimage[ani].img,
                ALLimage[ani].img.width / ALLimage[ani].aniframe * frameIndex_5,
                0,
                ALLimage[ani].img.width / ALLimage[ani].aniframe,
                ALLimage[ani].img.height,

                X,
                Y,
                ALLimage[ani].img.width / (ALLimage[ani].aniframe * 2),
                ALLimage[ani].img.height / 2,
            );
        //}, 100);
    }
    function draw_leafGood() {
            context2.drawImage(//正常葉子
            ALLimage["weed"].img,
            ALLimage["weed"].img.width / ALLimage["weed"].aniframe * frameIndex_6,
            0,
            ALLimage["weed"].img.width / ALLimage["weed"].aniframe,
            ALLimage["weed"].img.height,

            200,
            300,
            ALLimage["weed"].img.width / (ALLimage["weed"].aniframe * 4),
            ALLimage["weed"].img.height / 4,
        );
    }

    function starUP() {
        //
        setInterval(drawCanvasOne, 100);
        setInterval(drawCanvastwo, 100);
    }

}

