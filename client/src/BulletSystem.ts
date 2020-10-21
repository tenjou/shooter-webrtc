import Bullet from "./entities/Bullet"
import Character from "./entities/Character"
import Config from "./Config"

const bullets: Array<Bullet> = []
let bulletsAlive = 0

export const spawnBullet = (character: Character) => {
    let bullet: Bullet
    if (bullets.length > bulletsAlive) {
        bullet = bullets[bulletsAlive]
    } else {
        bullet = new Bullet()
        bullets.push(bullet)
    }

    bullet.set(character.position.x, character.position.y, character.rotation)
    bulletsAlive++
}

export const update = (tDeltaF: number) => {
    const tNow = Date.now()
    for (let n = bulletsAlive - 1; n >= 0; --n) {
        const bullet = bullets[n]
        bullet.position.x += bullet.speed.x * tDeltaF
        bullet.position.y += bullet.speed.y * tDeltaF
        if (tNow > bullet.tDeath) {
            --bulletsAlive
            bullets[n] = bullets[bulletsAlive]
            bullets[bulletsAlive] = bullet
        }
    }
}

export const render = (ctx: CanvasRenderingContext2D) => {
    for (let n = 0; n < bulletsAlive; ++n) {
        renderBullet(ctx, bullets[n])
    }
}

const renderBullet = (ctx: CanvasRenderingContext2D, bullet: Bullet) => {
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
