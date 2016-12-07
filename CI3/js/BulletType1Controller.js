class BulletType1Controller extends BulletController{
  constructor(shipSprite, direction, configs){
    var spriteName = "BulletType1.png";

    configs.anchor = new Phaser.Point(0.5, 0.5);
    configs.BULLETSPEED = 1000;
    configs.power = 10;
    configs.direction = direction;
    configs.index = 1;
    super(shipSprite, spriteName, configs);
  }
}
