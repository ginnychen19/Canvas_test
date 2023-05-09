/* 控制器們 */
var drawColor = document.getElementById("drawColor");
var cakeColor = document.getElementById("cakeColor");
//奶油大小和橡皮擦的事件再replaceSvgImages()完成後做。

/*換奶油顏色*/
drawColor.addEventListener("change", (e) => {
    console.log(drawColor.value);
})
/*換蛋糕顏色*/
cakeColor.addEventListener("change", (e) => {
    console.log(cakeColor.value);
    $(".cakePIC").attr("src", `./Source/SVG/game/${cakeColor.value}.svg`);
})

/* 把所有img引入的svg在網頁上轉換成svg */
function replaceSvgImages() {
    // 创建一个 Promise 对象并返回它
    return new Promise(function (resolve, reject) {
        var promises = [];
        jQuery('img.svg').each(function () {
            var $img = jQuery(this);
            var imgID = $img.attr('id');
            var imgClass = $img.attr('class');
            var imgURL = $img.attr('src');

            // 创建一个 Promise 对象，并将它添加到 promises 数组中
            var promise = jQuery.get(imgURL, function (data) {
                var $svg = jQuery(data).find('svg');
                if (typeof imgID !== 'undefined') {
                    $svg = $svg.attr('id', imgID);
                }
                if (typeof imgClass !== 'undefined') {
                    $svg = $svg.attr('class', imgClass + ' replaced-svg');
                }
                $svg = $svg.removeAttr('xmlns:a');
                if (!$svg.attr('viewBox') && $svg.attr('height') && $svg.attr('width')) {
                    $svg.attr('viewBox', '0 0 ' + $svg.attr('height') + ' ' + $svg.attr('width'))
                }
                $img.replaceWith($svg);
            }, 'xml');

            // 将 promise 添加到 promises 数组中
            promises.push(promise);
        });

        // 在所有 Promise 对象都执行完毕之后调用 resolve() 方法
        Promise.all(promises).then(function () {
            resolve();
        }).catch(function (error) {
            reject(error);
        });
    });
}
// 调用 replaceSvgImages() 方法并在所有 SVG 替换完成后执行回调函数
replaceSvgImages().then(function () {
    console.log('All SVG images have been replaced!');

    //奶油按鈕事件控制
    let cream = $('.cream');
    cream.eq(0).find("path").addClass("checked"); //給第一個加上選中
    cream.on("click", function (e) {
        $('.checked').not($(this)).removeClass('checked');
        $(this).find("path").toggleClass("checked");
    });

    //橡皮擦按鈕事件控制
    let Eraser = $('.eraser');
    Eraser.on("click", function (e) {
        $(this).find("path").toggleClass("checked");
    });

    /* 處存畫布按鈕 */
    var element = document.getElementById('imageDIV');
    $("#download").on('click', function () {
        html2canvas(element, {
            scrollX: 0,
            scrollY: 0,
            willReadFrequently: true,
            onrendered: function (canvas) {
                // 下載圖像
                Canvas2Image.saveAsPNG(canvas);

                // 插入圖像到 output div 中
                var output = document.getElementById('output');
                output.innerHTML = '';
                var img = document.createElement('img');
                img.src = canvas.toDataURL('image/png');
                output.appendChild(img);

                // 打開新的瀏覽器窗口顯示圖像
                var imgData = canvas.toDataURL('image/png');
                var newWindow = window.open('about:blank', '_blank');
                newWindow.document.write('<img src="' + imgData + '" alt="image"/>');
            }
        });
    });
})
        // var imgageData = getCanvas.toDataURL("image/png");
        // // Now browser starts downloading it instead of just showing it
        // var newData = imgageData.replace(/^data:image\/png/, "data:application/octet-stream");
        // $("#download").attr("download", "image.png").attr("href", newData);



