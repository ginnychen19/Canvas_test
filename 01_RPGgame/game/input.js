export class InputHandler {
    constructor() {
        this.keys = [];
        window.addEventListener('keydown', (e) => {
            e.preventDefault();
            //console.log(e.key, this.keys); //看當下按了什麼?
            if ((
                //這裡要小心！！英文大小寫不能打錯。
                e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter'
            ) && this.keys.indexOf(e.key) === -1) {
                this.keys.push(e.key);
            }
        });
        window.addEventListener('keyup', (e) => {
            e.preventDefault();
            if (e.key === 'ArrowDown' ||
                e.key === 'ArrowUp' ||
                e.key === 'ArrowLeft' ||
                e.key === 'ArrowRight' ||
                e.key === 'Enter') {
                this.keys.splice(this.keys.indexOf(e.key), 1);
            }
            console.log(e.key, this.keys);
        });

    }
}


