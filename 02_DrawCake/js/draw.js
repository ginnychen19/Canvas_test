/* 畫布處理區塊 */
var _canvas = document.getElementById('draw-cake');
var ctx = _canvas.getContext('2d');
_canvas.width = 480;
_canvas.height = 480;

//奶油大小和橡皮擦的事件再replaceSvgImages()完成後做。
export class drawCanvas {
    constructor() {
        /* 控制器們 */
        this.drawColor = document.getElementById("drawColor");
        this.cakeColor = document.getElementById("cakeColor");
        this.cream = $('.cream');
        this.eraser = $('.eraser');
    }
    draw() {//畫奶油
        $(_canvas).on("mousedown", openCvs);
        $(_canvas).on("mouseup", closeCvs);

        function openCvs() {
            _canvas.addEventListener("mousemove", clickCvs);
        }
        function closeCvs() {
            _canvas.removeEventListener("mousemove", clickCvs);
        }
        function clickCvs(e) {
            /* 獲得滑鼠之於canvas的位置 */
            /* 01.因為我的canvas和瀏覽器窗口的量是會變的，所以要算差多少 */
            /* 02.我的滑鼠位置之於瀏覽器窗口也會一直變 */
            /* 03.所以取得當前變量後，相減才會得到正確的位置 */
            /*canvas*/
            var rect = ctx.canvas.getBoundingClientRect();
            var canvasOffsetX = rect.left;
            var canvasOffsetY = rect.top;
            /* 滑鼠 */
            /*e.client就直接是滑鼠與目前瀏覽器的距離*/
            var x = e.clientX - canvasOffsetX;
            var y = e.clientY - canvasOffsetY;

            drawStar(x, y);
        }

        function drawStar(x, y) {
            var scale = 1;
            var canterX = 30;
            var canterY = 30;
            var points = "55.28 30.27 56.97 32.65 59.7 35.53 59.04 38.09 53.85 38.98 55.07 42.01 52.95 43.57 54.63 47.58 49.44 46.63 48.81 49.15 46.51 50.01 44.97 51.72 43.89 54.39 40.68 53.22 40.32 58.66 37.7 59.01 35.26 60 32.44 57.79 30.04 56.22 27.67 57.57 25.6 55.63 22.27 59.43 20.46 56.73 18.83 54.45 16.79 53.35 13.9 53.46 10.59 53.58 8.67 51.77 7.31 49.46 6.98 46.51 7.27 43.49 7.1 41.03 3.54 39.97 1.05 38.08 2.61 35.14 0 32.92 2.79 30.27 3.94 27.98 .85 25.1 1.18 22.5 4.23 20.83 6.5 19.24 4.35 15.36 7.47 14.38 6.96 10.8 10.58 10.7 12.47 9.21 12.94 5.71 16.6 6.85 19.13 6.73 19.71 1.74 22.95 3.65 25.13 2.27 27.54 1.52 30.04 0 32.57 1.22 34.72 3.64 37.64 1.77 40.48 1.44 42.92 2.52 43.95 6.07 44.44 9.6 48.96 7.6 49.61 10.61 53.42 10.56 50.65 15.77 54.92 15.84 55.59 18.3 56.68 20.53 54.53 23.67 59.83 24.99 60 27.64 55.28 30.27"
            var coords = points.split(' ').reduce(function (acc, point, index, array) {
                /* 問題點 */
                if (index % 2 === 0) {
                    acc.push([
                        /*把svg改成數組，後面再加上x、y就可以形成繪製關係 -的部分則是為了讓滑鼠看起來在中間*/
                        (parseFloat(point) * scale + x) - canterX * scale,
                        (parseFloat(array[index + 1]) * scale + y) - canterY * scale
                    ]);
                }
                return acc;
            }, []);


            // 绘制路径
            ctx.save();
            ctx.beginPath();
            coords.forEach(function (coord, index) {
                if (index === 0) {
                    ctx.moveTo(coord[0], coord[1]);
                } else {
                    ctx.lineTo(coord[0], coord[1]);
                }
            });
            ctx.closePath();
            ctx.fillStyle = "red";
            ctx.fill();
        }
    }
    CreamColorChange() {/*換奶油顏色*/
        this.drawColor.addEventListener("change", (e) => {
            console.log(drawColor.value);
            return drawColor.value
        })
    }
    CreamSizeChange() {//奶油按鈕事件控制
        this.cream.eq(0).find("path").addClass("checked"); //給第一個加上選中
        this.cream.on("click", function (e) {
            $('.checked').not($(this)).removeClass('checked');
            $(this).find("path").toggleClass("checked");
        });
    }
    useEraser() {//橡皮擦按鈕事件控制
        this.eraser.on("click", function (e) {
            $(this).find("path").toggleClass("checked");
        });
    }
    CakeColorChange() {/*換蛋糕顏色*/
        this.cakeColor.addEventListener("change", (e) => {
            // console.log(cakeColor.value);
            $(".cakePIC").attr("src", `./Source/SVG/game/${cakeColor.value}.svg`);
        })
    }
}


// /*選擇繪製顏色*/
// $('.color').change(function () {
//     $('.color>input').each(function (index, elem) {
//         if (this.checked) {
//             let mycolor = $(elem).attr("id");
//             changeColor(mycolor);//取出input中的數值
//         }
//     });
// });
// function changeColor(mycolor) {
//     console.log(mycolor);
//     ctx.strokeStyle = mycolor;
//     //將顏色的值寫到ctx.strokeStyle即可
// };

// function getMousePos(canvas, evt) {
//     // console.log(evt.offsetX);
//     var rect = canvas.getBoundingClientRect();
//     //getBoundingClientRect 取得物件完整座標資訊，包含寬高等
//     return {
//         x: evt.clientX - rect.left,
//         y: evt.clientY - rect.top,
//         canvasWidth: canvas.width,
//         canvasHeight: canvas.height
//     };
//     //這個function將會傳回滑鼠在 _canvas上的座標
// };

// function mouseMove(evt) {
//     var mousePos = getMousePos(_canvas, evt);
//     //透過getMousePos function 去取得滑鼠座標
//     //mousePos 是一個物件，包含x和y的值
//     ctx.lineTo(mousePos.x, mousePos.y);
//     //利用取回的值畫線
//     ctx.stroke();
//     //畫!
// };
// _canvas.addEventListener('mousedown', function (evt) {
//     var mousePos = getMousePos(_canvas, evt);
//     //從按下去就會執行第一次的座標取得
//     evt.preventDefault();
//     ctx.beginPath();
//     //建立path物件
//     ctx.moveTo(mousePos.x, mousePos.y);
//     //每次的點用moveTo去區別開，如果用lineTo會連在一起


//     _canvas.addEventListener('mousemove', mouseMove, false);
//     //mousemove的偵聽也在按下去的同時開啟
// });


// //如果滑鼠放開或是碰到邊界，將會停止mouseup的偵聽
// // if (mousePos.x < 0 || mousePos.x > mousePos.canvasWidth || mousePos.y < 0 || mousePos.y > mousePos.canvasHeight) {
// //     canvas.removeEventListener('mousemove', mouseMove, false);
// // }
// _canvas.addEventListener('mouseup', function () {
//     _canvas.removeEventListener('mousemove', mouseMove, false);
// }, false);
