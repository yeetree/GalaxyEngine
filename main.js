let game = new galaxy(800, 600);
let ent = new entity();

async function load() {
    await ent.sprite.load("./sample.png")
    ent.rot = 0;
    let cont = new container();
    cont.addChild(ent)
    cont.rot = 0;
    cont.x = 50
    game.scene.addChild(cont);
    game.draw();
}

load();