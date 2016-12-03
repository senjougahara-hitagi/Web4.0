class ShipController{
  constructor(x, y, spriteName, configs){
    this.configs = configs;

    //Tao ship sprite( ten rieng)
    this.sprite = Nakama.playerGroup.create(
      x,
      y,
      'assets',
      spriteName);
      this.sprite.anchor = new Phaser.Point(0.5, 0.5);
      Nakama.game.physics.enable(this.sprite, Phaser.Physics.ARCADE); //Ap dung hieu ung vat ly len tau.

      this.timeSinceLastFire = 0;
  }

  update(){

    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;

    if(Nakama.keyboard.isDown(this.configs.up))// isDown là nút nào trên bàn phím đang bị nhấn xuống, (Phaser.keyboard.UP) là nút ddieuf hướng UP
    {
      this.sprite.body.velocity.y = -Nakama.configs.SHIPSPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.down))
    {
      this.sprite.body.velocity.y = Nakama.configs.SHIPSPEED;
    }
    else {
      this.sprite.body.velocity.y = 0;
    }

    if(Nakama.keyboard.isDown(this.configs.left))
    {
      this.sprite.body.velocity.x = -Nakama.configs.SHIPSPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.right))
    {
      this.sprite.body.velocity.x = Nakama.configs.SHIPSPEED;
    }
    else {
      this.sprite.body.velocity.x = 0;
    }

    if(Nakama.keyboard.isDown(this.configs.fireButton) && this.timeSinceLastFire >= this.configs.cooldown){
      this.fire();
      this.timeSinceLastFire = 0;
    }

  }

  fire(){
    var newBullet = new BulletCreate(this.sprite, 0, -10, "BulletType1.png", {});
    var newBullet1 = new BulletCreate(this.sprite, 1, -10, "BulletType1.png", {});
    var newBullet2 = new BulletCreate(this.sprite, -1, -10, "BulletType1.png", {});
    var newBullet3 = new BulletCreate(this.sprite, 3, -10, "BulletType1.png", {});
    var newBullet4 = new BulletCreate(this.sprite, -3, -10, "BulletType1.png", {});
  }
}
