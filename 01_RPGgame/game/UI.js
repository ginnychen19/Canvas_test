export class UI {
    constructor(game) {
        this.game = game;
        this.fontSize = 30;
        this.fontFamily = "Microsoft JhengHei";
        this.livesImage = document.getElementById("lives");
    }
    draw(context) {
        //遊戲結束提示
        if (this.game.gameOver) {
            context.textAlign = 'center';
            context.font = this.fontSize * 2 + "px " + this.fontFamily;

            if (this.game.lives <= 0) {
                /* 背景填充 */
                context.fillStyle = 'rgba(255, 0, 0, 0.5)';
                context.fillRect(
                    (this.game.width/2) *0.5,
                    (this.game.height/2) *0.5,
                    this.game.width / 2,
                    this.game.height / 2
                    );

                context.fillStyle = this.game.fontColor;
                context.fillText(
                    '遊戲結束',
                    this.game.width * 0.5,
                    this.game.height * 0.5,
                );
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(
                    "你死了",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );

            } else if (this.game.score >= 60) {
                context.fillStyle = 'rgba(255, 255, 255, 0.8)';
                context.fillRect(
                    (this.game.width/2) *0.5,
                    (this.game.height/2) *0.5,
                    this.game.width / 2,
                    this.game.height / 2
                    );

                context.fillStyle = this.game.fontColor;
                context.fillText(
                    '遊戲結束',
                    this.game.width * 0.5,
                    this.game.height * 0.5,
                );
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(
                    "你是黑暗生物害怕的英雄！",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );
            } else if (this.game.score >= 25) {
                context.fillStyle = 'rgba(255, 255, 255, 0.8)';
                context.fillRect(
                    (this.game.width/2) *0.5,
                    (this.game.height/2) *0.5,
                    this.game.width / 2,
                    this.game.height / 2
                    );

                context.fillStyle = this.game.fontColor;
                context.fillText(
                    '遊戲結束',
                    this.game.width * 0.5,
                    this.game.height * 0.5,
                )
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(
                    "還不錯，你是個好狗狗",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );
            } else {
                context.fillStyle = 'rgba(255, 255, 255, 0.8)';
                context.fillRect(
                    (this.game.width/2) *0.5,
                    (this.game.height/2) *0.5,
                    this.game.width / 2,
                    this.game.height / 2
                    );

                context.fillStyle = this.game.fontColor;
                context.fillText(
                    '遊戲結束',
                    this.game.width * 0.5,
                    this.game.height * 0.5,
                )
                context.font = this.fontSize * 0.7 + 'px ' + this.fontFamily;
                context.fillText(
                    "你是來給黑暗生物加餐的嗎?",
                    this.game.width * 0.5,
                    this.game.height * 0.5 + 40
                );
            }
        } else {
            context.font = this.fontSize + "px " + this.fontFamily;
            context.textAlign = 'left';
            context.fillStyle = this.game.fontColor;
            //分數繪製
            context.fillText("已蒐集: " + this.game.score, 20, 50);
            //時間計數器
            context.font = this.fontSize * 0.8 + "px " + this.fontFamily;
            context.fillText('時間: ' + this.game.formattedTime, 20, 80)
            //生命計數器
            for (let i = 0; i < this.game.lives; i++) {
                context.drawImage(
                    this.livesImage,
                    30 * i + 20, 95,
                    25, 25
                ); //間距 * i + 起始位置
            }
        }
    }
}