class ShipType2Controller extends ShipController{
  constructor(x, y, isPlayer1, configs){
    var spriteName = "Spaceship2-" + (isPlayer1 ? "Player" : "Partner") + ".png";
    configs.cooldown = 0.6;
    configs.health = 15;
    configs.SHIPSPEED = 400;

    configs.hitBoxRadius = 15;// Ban kinh duong tron quanh tam cua tau
    configs.hitBoxOffset = new Phaser.Point(25, 10);// Toa do tam duong tron trong tinh tu goc tren ben trai an cua tau

    super(x, y, spriteName, configs);
  }

  fire(){
    var newBullet = new BulletType2Controller(this.sprite, true, { });
    var newBullet1 = new BulletType2Controller(this.sprite, false, { });
    Nakama.bullets.push(newBullet);
    Nakama.bullets.push(newBullet1);
  }
}
