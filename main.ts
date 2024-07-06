controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile2 = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . 9 9 9 9 9 9 . . . . 
        . . . . . 9 9 9 9 9 9 5 9 . . . 
        9 9 9 9 9 9 5 5 5 5 5 9 9 . . . 
        . . . . . 9 9 9 9 9 9 9 9 . . . 
        . . . . . 9 9 9 9 9 9 9 9 . . . 
        . . . . . . . . 9 9 9 9 . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . 9 9 9 9 9 9 . . . . . 
        9 9 9 9 9 9 9 9 9 9 5 9 . . . . 
        . . . . . 9 5 5 5 5 9 9 . . . . 
        . . . . . 9 9 9 9 9 9 9 . . . . 
        . . . . . . 9 9 9 9 9 . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    projectile = sprites.createProjectileFromSprite(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . 9 9 9 9 9 . . . 
        . . . . . . 9 9 9 9 9 9 9 . . . 
        9 9 9 9 9 9 9 5 5 5 5 9 9 . . . 
        . . . . . 9 9 9 9 9 9 9 9 . . . 
        . . . . . . . 9 9 9 9 . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, mySprite, 200, 0)
})
statusbars.onZero(StatusBarKind.EnemyHealth, function (status) {
    sprites.destroy(status.spriteAttachedTo())
})
sprites.onOverlap(SpriteKind.Projectile, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(sprite)
    statusbars.getStatusBarAttachedTo(StatusBarKind.Health, otherSprite).value += -20
    info.changeScoreBy(1)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    sprites.destroy(otherSprite, effects.disintegrate, 500)
    scene.cameraShake(5, 500)
})
let statusbar: StatusBarSprite = null
let enemy_cannon_ball: Sprite = null
let projectile: Sprite = null
let projectile2: Sprite = null
let mySprite: Sprite = null
effects.starField.startScreenEffect()
mySprite = sprites.create(img`
    . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . 6 4 4 4 4 
    . . . . . . . . . . . 6 6 6 6 6 . 
    . . . . . . . . . . . 6 6 6 . . . 
    . . . . . . . . . . 6 6 6 6 . . . 
    . . . . . . . 6 6 6 6 6 6 6 . . . 
    . . . . 8 8 8 8 8 8 8 8 8 a . . . 
    . . 6 6 6 6 6 6 6 6 6 6 a a a . . 
    . 6 6 6 6 6 6 6 6 6 6 6 a a a . . 
    . . 6 6 6 6 6 6 6 6 6 6 a a a . . 
    . . . 6 6 6 6 6 6 6 6 6 6 a . . . 
    . . . . 8 8 8 8 8 8 8 8 8 8 . . . 
    . . . . . . . 6 6 6 6 6 6 6 . . . 
    . . . . . . . . . 6 6 6 6 6 4 4 4 
    . . . . . . . . . . . . . 6 6 6 . 
    . . . . . . . . . . . . . . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 130, 130)
mySprite.setStayInScreen(true)
info.setLife(21)
game.onUpdateInterval(4269, function () {
    enemy_cannon_ball = sprites.create(img`
        .......224........
        ....22444422......
        ...2444ff4444.....
        ...24fffffff442...
        ..24fffffffff44...
        ..2fffffffffff42..
        .4ffffffffffff44..
        .2ffffffffffff22..
        2ffffffffffffff2..
        2ffffffffffffff2..
        2fffffffffffff22..
        2fffffffffffff222.
        222ffffffffff2222.
        2442ffffffff2422..
        .2444fffffff4422..
        ...244442224422...
        ....222444442.....
        ..................
        ..................
        `, SpriteKind.Enemy)
    enemy_cannon_ball.x = scene.screenWidth()
    enemy_cannon_ball.vx = -20
    enemy_cannon_ball.y = randint(10, scene.screenHeight() - 10)
    statusbar = statusbars.create(18, 4, StatusBarKind.EnemyHealth)
    statusbar.setColor(7, 2, 3)
    statusbar.attachToSprite(enemy_cannon_ball)
})
