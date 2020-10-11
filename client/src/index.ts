let canvas: HTMLCanvasElement = null
let ctx: CanvasRenderingContext2D = null

const create = () => {
    canvas = document.createElement("canvas")
    ctx = canvas.getContext("2d")
    document.body.appendChild(canvas)

    handleResize()

    window.addEventListener("resize", handleResize)
    window.addEventListener("onkeydown", handleKeyDown)
    window.addEventListener("onkeyup", handleKeyUp)
}

const handleResize = () => {
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
}

const handleKeyDown = (event: UIEvent) => {}

const handleKeyUp = (event: UIEvent) => {}

const render = () => {
    ctx.fillStyle = "#ccc"
    ctx.fillRect(0, 0, canvas.width, canvas.height)
}

const renderPlayer = (x: number, y: number) => {}

create()
render()
