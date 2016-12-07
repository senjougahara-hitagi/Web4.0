class BulletType2Controller extends BulletController{
  constructor(shipSprite, isLeft, configs){
    var spriteName = "BulletType2.png";
    if(isLeft)//Được bắn từ cách trái
      configs.anchor = new Phaser.Point(-1, 0.5);
    else configs.anchor = new Phaser.Point(2, 0.5);
    configs.BULLETSPEED = 400;
    configs.power = 50;
    configs.TURN_RATE = 7;
    configs.index = 2;
    super(shipSprite, spriteName, configs);
  }
}
