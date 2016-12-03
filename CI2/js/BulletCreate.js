class BulletCreate{
  constructor(ship, vector_x, vector_y, spriteName, configs){
    this.sprite = Nakama.bulletGroup.create(
      ship.position.x,
      ship.position.y,
      'assets',
      spriteName
    );
    this.sprite.anchor = new Phaser.Point(0.5, 0.5);
    this.sprite.body.velocity = new Phaser.Point(vector_x, vector_y).setMagnitude(Nakama.configs.BULLETSPEED);
  }
}
