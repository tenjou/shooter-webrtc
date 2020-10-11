import Bullet from "./entities/bullet"
import Vector2 from "./Vector2"
import Config from "./Config"

const pressedInput: Record<string, boolean> = {}
const target: Vector2 = new Vector2()
const bullets: Array<Bullet> = []
let canvas: HTMLCanvasElement = null
let ctx: CanvasRenderingContext2D = null
let tPrev: number = 0
let player: Character = null
let characterTexture: HTMLCanvasElement = null

class Character {
    position = new Vector2()
    speed = new Vector2()
    rotation = 0
}

const create = () => {
    canvas = document.createElement("canvas")
    ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)

    handleResize()

    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)
    window.addEventListener("mousedown", handleMouseDown)
    window.addEventListener("mouseup", handleMouseUp)
    window.addEventListener("mousemove", handleMouseMove)

    tPrev = Date.now()
}

const createCharacterTexture = () => {
    const characterSizeHalf = Config.characterSize * 0.5
    characterTexture = document.createElement("canvas")
    characterTexture.width = Config.characterSize
    characterTexture.height = Config.characterSize
    const characterTextureCtx = characterTexture.getContext("2d")

    characterTextureCtx.fillStyle = "#000"
    characterTextureCtx.beginPath()
    characterTextureCtx.moveTo(characterSizeHalf, 0)
    characterTextureCtx.lineTo(0, Config.characterSize)
    characterTextureCtx.lineTo(Config.characterSize, Config.characterSize)
    characterTextureCtx.closePath()
    characterTextureCtx.fill()
}

const setup = () => {
    createCharacterTexture()

    player = new Character()
    player.position.set(100, 100)
}

const handleResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

const handleKeyDown = (event: KeyboardEvent) => {
    pressedInput[event.code] = true
}

const handleKeyUp = (event: KeyboardEvent) => {
    pressedInput[event.code] = false
}

const handleMouseDown = (event: MouseEvent) => {
    console.log(event.button)
}

const handleMouseUp = (event: MouseEvent) => {}

const handleMouseMove = (event: MouseEvent) => {
    target.x = event.clientX
    target.y = event.clientY
}

const spawnBullet = (x: number, y: number) => {
    const bullet = new Bullet(x, y, 1, 0)
    bullets.push(bullet)
}

const update = () => {
    const tNow = Date.now()
    const tDeltaF = (tNow - tPrev) / 1000

    if (pressedInput["ArrowLeft"] || pressedInput["KeyA"]) {
        player.speed.x = -Config.characterSpeed
    } else if (pressedInput["ArrowRight"] || pressedInput["KeyD"]) {
        player.speed.x = Config.characterSpeed
    } else {
        player.speed.x = 0
    }

    if (pressedInput["ArrowUp"] || pressedInput["KeyW"]) {
        player.speed.y = -Config.characterSpeed
    } else if (pressedInput["ArrowDown"] || pressedInput["KeyS"]) {
        player.speed.y = Config.characterSpeed
    } else {
        player.speed.y = 0
    }

    player.position.x += player.speed.x * tDeltaF
    player.position.y += player.speed.y * tDeltaF

    const diffX = player.position.x - target.x
    const diffY = target.y - player.position.y
    player.rotation = Math.atan2(diffX, diffY) + Math.PI

    for (let n = 0; n < bullets.length; ++n) {
        const bullet = bullets[n]
        bullet.position.x += bullet.speed.x * tDeltaF
        bullet.position.y += bullet.speed.y * tDeltaF
    }

    tPrev = tNow
}

const render = () => {
    update()

    ctx.fillStyle = "#ccc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    renderCharacter(player)
    for (let n = 0; n < bullets.length; ++n) {
        renderBullet(bullets[n])
    }

    requestAnimationFrame(render)
}

const renderCharacter = (character: Character) => {
    ctx.save()
    ctx.setTransform(1, 0, 0, 1, character.position.x, character.position.y)
    ctx.rotate(character.rotation)
    ctx.drawImage(
        characterTexture,
        -Config.characterSize * 0.5,
        -Config.characterSize * 0.5
    )
    ctx.restore()
}

const renderBullet = (bullet: Bullet) => {
    const bulletHalfSize = Config.bulletSize * 0.5
    ctx.save()
    ctx.fillStyle = "#ff0000"
    ctx.fillRect(
        bullet.position.x - bulletHalfSize,
        bullet.position.y - bulletHalfSize,
        Config.bulletSize,
        Config.bulletSize
    )
    ctx.restore()
}

create()
setup()
render()
