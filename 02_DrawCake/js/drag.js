// console.log("yl3grweg")
export class dragDecoration {
    constructor() {
        this.home = $("#cake-decoration");
        this.rubbish = $('.trash-can');
        this.delete = false;
        this.goToDraw = $('.pastry-bag02');
        this.copy = $(".copy");
    }
    useRubbish() {//垃圾桶事件控制
        const self = this;
        this.rubbish.on("click", function (e) {
            //e.target是垃圾桶按鈕
            self.delete = true;
            $(e.target).find("path").toggleClass("checked");
        });
    }
    
    ClickDecoration(e) {//點擊初始物件，新增物件並使其可動
        e.preventDefault();
        let MyDrag = $(e.target).clone().removeClass("ani01").addClass("draggable").addClass("copy");
        let oldClass = e.target.classList[1];
        let newClass = `${e.target.classList[1]}_M`;

        MyDrag.removeClass(oldClass).addClass(newClass);
        this.home.append(MyDrag);
        // MyDrag.Draggabilly();
        
        var draggie = $(MyDrag).draggabilly();

        console.log(draggie);
    }
}
