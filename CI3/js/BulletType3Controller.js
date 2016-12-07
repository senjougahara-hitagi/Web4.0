class BulletType3Controller extends BulletController{
  constructor(shipSprite, configs){
    var spriteName = "BulletType3.png";

    configs.anchor = new Phaser.Point(0.5, 1);
    configs.index = 3;
    configs.power = 2;
    super(shipSprite, spriteName, configs);
  }
}
