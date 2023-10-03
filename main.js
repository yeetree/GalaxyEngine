let game = new galaxy(800, 600);
let ent = new entity();
let ent2 = new entity();
let cont = new container();

async function load() {
    await ent.sprite.load("./sample.png")
    await ent2.sprite.load("./sample.png")
    ent.rot = 0;
    ent.x = 20
    ent2.rot = 90;
    ent2.x = -20
    ent2.layer = 2
    cont.addChild(ent)
    cont.addChild(ent2)
    cont.x = 300
    cont.y = 100
    game.scene.addChild(cont);
    loop();
}

let tick = 0;
async function loop() {
    game.draw();
    cont.rot = game.input.mousex
    ent.rot = game.input.mousey
    await sleep(1);
    loop();
}

load();