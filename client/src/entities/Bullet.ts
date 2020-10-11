import Config from "../Config"
import Vector2 from "../Vector2"

export default class Bullet {
    position = new Vector2()
    speed = new Vector2()
    tSpawn = 0

    constructor(x: number, y: number, dirX: number, dirY: number) {
        this.position.set(x, y)
        this.speed.set(Config.bulletSpeed * dirX, Config.bulletSpeed * dirY)
        this.tSpawn = Date.now()
    }
}
