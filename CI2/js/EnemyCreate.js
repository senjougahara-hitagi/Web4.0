class EnemyCreate{
    constructor(x, y, spriteName, configs){
        this.configs = configs;

        this.sprite = Nakama.enemyGroup.create(
            x,
            y,
            'assets',
            spriteName
        );
        this.sprite.anchor = new Phaser.Point(0.5, 0.5);
        this.sprite.health = this.configs.hp;
    }
}
