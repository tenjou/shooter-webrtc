export default class Vector2 {
    x: number
    y: number

    constructor(x: number = 0, y: number = 0) {
        this.x = x
        this.y = y
    }

    set(x: number, y: number) {
        this.x = x
        this.y = y
    }

    mul(value: number) {
        this.x *= value
        this.y *= value
    }

    rotate(angleRad: number) {
        this.x = Math.cos(angleRad)
        this.y = Math.sin(angleRad)
    }
}
