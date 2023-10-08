
# Galaxy Engine Documentation

## Getting Started
If you want to set up a Galaxy project, just download the Github repo. There are 4 essential things you need to keep: `engine` folder, `config.js`, `index.html`, and `main.js`. You can keep the `assets` folder if you need to use the example.

`config.js` is loaded before the main engine, and defines where the game's main script is and where to find the engine. You can change these by editing the file. If you want to change the name of the engine folder, or the main script, you can! You can check the file for all possible parameters.

If you have a blank `main.js` file, you can create a game like this:
Add `let game = new galaxy(800, 600)` to create a new instance of  Galaxy. This will automatically add a canvas to the page.

After setting up your game, you can run `game.start()` to start the game loop. See the sample `main.js` to see how to set up a game, then you can check the API reference and make your game.

## API Reference
###  `galaxy` Class
* `new galaxy(width, height, id)` - Creates Galaxy instance with width `width` and height `height`. Adds it to element with id `id`.

* `galaxy.gfx` (`galaxygfx`) - Reference to `galaxygfx` class

* `galaxy.input` (`galaxyinput`) - Reference to `galaxyinput` class

* `galaxy.scene` (`container`) - Scene that is currently being rendered, is a `container`

* `galaxy.fps` (`Number`) - Target frame rate, restart engine to apply changes. 

* `galaxy.running` (`Boolean`) - Whether engine is running or not. Setting to false while running stops the game

* `galaxy.alreadystarted` (`Boolean`)  - Whether the game has been initiated or not. If you stop the game, then start it, it will not run all of the start functions

* `galaxy.start()` (`Function`) -  Starts the engine and game loop

### `galaxyinput` Class
* `new galaxyinput(gfx)` - Creates new `galaxyinput` instance. `gfx ` is a `galaxygfx` instance that `galaxyinput` will attach listeners to

* `galaxyinput.mousex` (`Number`) - Mouse X Position

* `galaxyinput.mousey` (`Number`) - Mouse Y Position

* `galaxyinput.getKey(key)` (`Function`) - Checks if `key` is down. **NOTE: `key` is a string, and these functions check for HTML KeyboardEvent.code codes**

*  `galaxyinput.getKeyDown(key)` (`Function`) - Checks if `key` is down, but only triggers once after keydown. **NOTE: `key` is a string, and these functions check for HTML KeyboardEvent.code codes**

### `galaxygfx` Class
* `new galaxygfx(width, height, id)` - Creates canvas with width `width` and height `height` and `galaxygfx` instance. Adds it to element with id `id`

* `galaxygfx.drawspr(sprite, x, y)` (`Function`) - Draws `sprite` (is a `sprite` object) at `x`, `y`

* `galaxygfx.drawsprimg(sprite, x, y)` (`Function`) - Draws `sprite` (as a `HTMLImageElement` or `HTMLCanvasElement`) at `x`, `y`

* `galaxygfx.clear()` (`Function`) - Clears screen

### `sprite` Class
* `new sprite()` - Creates new sprite with blank image.

* `sprite.img` (`HTMLImageElement`) - Image

* `sprite.width` + `sprite.height` (`Number`) - Width and height of sprite. Can be resized to scale.

* `sprite.load(url)` (`Async Function`) - Loads image from `url`, please use `await` to load.

### `spritesheet` Class
* `new spritesheet()` - Creates new spritesheet with blank image.

* `spritesheet.img` (`HTMLImageElement`) - Spritesheet source image

* `spritesheet.width` + `spritesheet.height` (`Number`) - Width and height of source image. Can be resized to scale.

* `spritesheet.load(url)` (`Async Function`) - Loads source image from `url`, please use `await` to load.

* `spritesheet.sprites` (`Array of sprite`) - An array containing all the sprites resulting after splitting the image with `spritesheet.split`.

* `spritesheet.split(cw, ch, cols, rows)` (`Function`) - Splits the image and stores sub-images in `spritesheet.sprites`. `cw` is the width of the cells in pixels, `ch`, is the height of them, `cols` is the number of columns to split the image into, and `rows` is the number of rows to split the image into.

### `canvassprite` Class
* `new canvassprite(width, height)` - Creates new canvassprite with canvas as image, use `drawsprimg(cs.sprite.canvas, x, y)` to draw.

* `canvassprite.width` + `canvassprite.height` (`Number`) - Same as `sprite`

* `canvassprite.canvas` (`HTMLCanvasElement`) - Reference to the sprite's canvas.

* `canvassprite.ctx` (`CanvasRenderingContext2D`) - Reference to the sprite's canvas 2D rendering context. Use this to draw to the sprite.

### `v2` Class
* `new v2(x, y)` - Creates new Vector2 with x `x` and y `y`

* `v2.x` (`Number`) - X Value

* `v2.y` (`Number`) - Y Value

### `entity` Class
* `new entity()` - Creates new entity with blank sprite

* `entity.pos` (`v2`) - Entity's position

* `entity.wpos` (`v2`) - Entity's global position (readonly)

* `entity.rot` (`Number`) - Entity's rotation (degrees)

* `entity.layer` (`Number`) - Entity's draw layer

* `entity.sprite` (`sprite`) - Entity's sprite. Is a `sprite` object, so use that to load sprites.

* `entity.update()` (`Function`) - Entity's update function. Re-definable by user.

* `entity.start()` (`Function`) - Entity's start function. Re-definable by user.

### `canvasentity` Class
* `new canvasentity()` - Creates new entity with blank sprite

* `canvasentity.pos` (`v2`) - Entity's position

* `canvasentity.wpos` (`v2`) - Entity's global position (readonly)

* `canvasentity.rot` (`Number`) - Entity's rotation (degrees)

* `canvasentity.layer` (`Number`) - Entity's draw layer

* `canvasentity.sprite` (`sprite`) - Entity's sprite. Is a `canvassprite` object, so use that to draw on it.

* `canvasentity.update()` (`Function`) - Entity's update function. Re-definable by user.

* `canvasentity.start()` (`Function`) - Entity's start function. Re-definable by user.

### `text` Class
* `new text()` - Creates new text object entity

* `text.pos` (`v2`) - Entity's position

* `text.wpos` (`v2`) - Entity's global position (readonly)

* `text.rot` (`Number`) - Entity's rotation (degrees)

* `text.layer` (`Number`) - Entity's draw layer

* `text.txt` (`String`) - Entity's text to display.

* `text.font` (`String`) - Entity's font. Uses same format as CanvasRenderingContext2D.font.

* `text.color` (`String`) - Entity's color. Uses same format as CanvasRenderingContext2D.fillStyle / CanvasRenderingContext2D.strokeStyle.

* `text.fill` (`Boolean`) - Chooses to use either fillText or stokeText.

### `container` Class
* `new container()` - Creates new entity with blank sprite

* `container.pos` (`v2`) - Container's position

* `container.wpos` (`v2`) - Container's global position (readonly)

* `container.rot` (`Number`) - Container's rotation (degrees)

* `container.layer` (`Number`) - Container's draw layer

* `container.objects` (`Array of entity, canvasentity, or container`) - Container's children.

* `canvasentity.addChild(obj)` (`Function`) - Adds child to container and sorts objects by layer. `obj` is either a `entity`, `canvasentity`, or `container`

* `canvasentity.addChild(obj)` (`Function`) - Removes child from container. `obj` is either a `entity`, `canvasentity`, or `container`

* `canvasentity.update()` (`Function`) - Container's update function. Re-definable by user.

* `canvasentity.start()` (`Function`) - Container's start function. Re-definable by user.