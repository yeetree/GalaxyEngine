//Galaxy Input Class
class galaxyinput {
    gfx = null;
    canvas = null;

    mousex = 0;
    mousey = 0;
    
    constructor(gfx) {
        this.gfx = gfx
        this.canvas = gfx.canvas
        this.canvas.addEventListener("mousemove", this._upMPos.bind(this))
    }

    _upMPos = function(event) {
        var rect = this.canvas.getBoundingClientRect();
        this.mousex = event.clientX - rect.left;
        this.mousey = event.clientY - rect.top;
    }

    getMousePos = function() {
        return { x: this.mousex, y: this.mousey }
    }
}