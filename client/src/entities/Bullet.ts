import Config from "../Config"
import Vector2 from "../Vector2"

export default class Bullet {
    position = new Vector2()
    speed = new Vector2()
    tDeath = 0

    constructor(x: number, y: number, rotation: number) {
        this.position.set(x, y)
        this.speed.rotate(rotation - Math.PI * 0.5)
        this.speed.mul(Config.bulletSpeed)
        this.tDeath = Date.now() + Config.bulletMaxLife
    }
}
