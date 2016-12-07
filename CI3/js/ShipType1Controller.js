class ShipType1Controller extends ShipController{
  constructor(x, y, isPlayer1, configs){
    var spriteName = "Spaceship1-" + (isPlayer1 ? "Player" : "Partner") + ".png";
    configs.cooldown = 0.3;
    configs.health = 10;
    configs.SHIPSPEED = 600;

    configs.hitBoxRadius = 15;// Ban kinh duong tron quanh tam cua tau
    configs.hitBoxOffset = new Phaser.Point(25, 15);// Toa do tam duong tron trong tinh tu goc tren ben trai an cua tau

    super(x, y, spriteName, configs);
  }

  fire(){
    var newBullet = new BulletType1Controller(this.sprite, new Phaser.Point(0, -10), {});
    var newBullet1 = new BulletType1Controller(this.sprite, new Phaser.Point(1, -10), {});
    var newBullet2 = new BulletType1Controller(this.sprite, new Phaser.Point(-1, -10), {});
    var newBullet3 = new BulletType1Controller(this.sprite, new Phaser.Point(3, -10), {});
    var newBullet4 = new BulletType1Controller(this.sprite, new Phaser.Point(-3, -10), {});
  }
}
