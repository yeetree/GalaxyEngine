//Galaxy Input Class
class galaxyinput {
    gfx = null;
    canvas = null;

    mousex = 0;
    mousey = 0;

    _keysdown = [];
    _uncheckedkeys = [];
    
    constructor(gfx) {
        this.gfx = gfx
        this.canvas = gfx.canvas
        this.canvas.addEventListener("mousemove", this._upMPos.bind(this))
        this.canvas.addEventListener("keydown", this._upKDwn.bind(this))
        this.canvas.addEventListener("keyup", this._upKUp.bind(this))
    }

    _upMPos = function(event) {
        var rect = this.canvas.getBoundingClientRect();
        this.mousex = event.clientX - rect.left;
        this.mousey = event.clientY - rect.top;
    }

    _upKDwn = function(event) {
        if(this._keysdown.indexOf(event.code) == -1) {
            this._keysdown.push(event.code)
            this._uncheckedkeys.push(event.code)
        }
    }

    _upKUp = function(event) {
        let idx = this._keysdown.indexOf(event.code)
        let uidx = this._uncheckedkeys.indexOf(event.code)
        if(idx != -1) {
            this._keysdown.splice(idx, 1);
            this._uncheckedkeys.splice(uidx, 1);
        }
    }

    getMousePos = function() {
        return { x: this.mousex, y: this.mousey }
    }

    getKeyDown = function(key) {
        let idx = this._keysdown.indexOf(key)
        let uidx = this._uncheckedkeys.indexOf(key)
        if(idx != -1 && uidx != -1) {
            this._uncheckedkeys.splice(uidx, 1);
            return true;
        }
        return false;
    }

    getKey = function(key) {
        if(this._keysdown.indexOf(key) != -1) {
            return true
        }
        return false;
    }
}