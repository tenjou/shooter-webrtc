const characterSize = 32
const characterSpeed = 100
const pressedInput: Record<string, boolean> = {}
let canvas: HTMLCanvasElement = null
let ctx: CanvasRenderingContext2D = null
let tPrev: number = 0
let player: Character = null

class Vector2 {
    x: number = 0
    y: number = 0

    set(x: number, y: number) {
        this.x = x
        this.y = y
    }
}

class Character {
    position = new Vector2()
    speed = new Vector2()
}

const create = () => {
    canvas = document.createElement("canvas")
    ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)

    handleResize()

    window.addEventListener("resize", handleResize)
    window.addEventListener("keydown", handleKeyDown)
    window.addEventListener("keyup", handleKeyUp)

    tPrev = Date.now()
}

const setup = () => {
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

const update = () => {
    const tNow = Date.now()
    const tDeltaF = (tNow - tPrev) / 1000

    if (pressedInput["ArrowLeft"] || pressedInput["KeyA"]) {
        player.speed.x = -characterSpeed
    } else if (pressedInput["ArrowRight"] || pressedInput["KeyD"]) {
        player.speed.x = characterSpeed
    } else {
        player.speed.x = 0
    }

    if (pressedInput["ArrowUp"] || pressedInput["KeyW"]) {
        player.speed.y = -characterSpeed
    } else if (pressedInput["ArrowDown"] || pressedInput["KeyS"]) {
        player.speed.y = characterSpeed
    } else {
        player.speed.y = 0
    }

    player.position.x += player.speed.x * tDeltaF
    player.position.y += player.speed.y * tDeltaF

    tPrev = tNow
}

const render = () => {
    update()

    ctx.fillStyle = "#ccc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    renderCharacter(player)

    requestAnimationFrame(render)
}

const renderCharacter = (character: Character) => {
    ctx.fillStyle = "red"
    ctx.fillRect(
        character.position.x,
        character.position.y,
        characterSize,
        characterSize
    )
}

create()
setup()
render()
