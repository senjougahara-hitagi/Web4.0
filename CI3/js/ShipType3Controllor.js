class ShipType3Controller extends ShipController{
  constructor(x, y, isPlayer1, configs){
    var spriteName = "Spaceship3-" + (isPlayer1 ? "Player" : "Partner") + ".png";
    configs.cooldown = 0.1;
    configs.health = 5;
    configs.SHIPSPEED = 800;

    configs.hitBoxRadius = 15;// Ban kinh duong tron quanh tam cua tau
    configs.hitBoxOffset = new Phaser.Point(15, 15);// Toa do tam duong tron trong tinh tu goc tren ben trai an cua tau

    super(x, y, spriteName, configs);
  }

  fire(){
    var newBullet = new BulletType3Controller(this.sprite,{ });
    Nakama.bullets.push(newBullet);
  }
}
