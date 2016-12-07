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

    this.sprite.health = configs.health;
    this.SHIPSPEED = configs.SHIPSPEED;
    this.sprite.fire = configs.fire;

    this.sprite.body.collideWorldBounds = true;

    this.sprite.body.setCircle(this.configs.hitBoxRadius, this.configs.hitBoxOffset.x, this.configs.hitBoxOffset.y);

    this.timeSinceLastFire = 0;
  }

  update(){

    this.timeSinceLastFire += Nakama.game.time.physicsElapsed;

    if(Nakama.keyboard.isDown(this.configs.up))// isDown là nút nào trên bàn phím đang bị nhấn xuống, (Phaser.keyboard.UP) là nút ddieuf hướng UP
    {
        this.sprite.body.velocity.y = -this.SHIPSPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.down))
    {
        this.sprite.body.velocity.y = this.SHIPSPEED;
    }
    else {
        this.sprite.body.velocity.y = 0;
    }

    if(Nakama.keyboard.isDown(this.configs.left))
    {
        this.sprite.body.velocity.x = -this.SHIPSPEED;
    }
    else if(Nakama.keyboard.isDown(this.configs.right))
    {
        this.sprite.body.velocity.x = this.SHIPSPEED;
    }
    else {
        this.sprite.body.velocity.x = 0;
    }

    if(Nakama.keyboard.isDown(this.configs.fireButton) && this.timeSinceLastFire >= this.configs.cooldown){
      this.fire();
      this.timeSinceLastFire = 0;
    }

  }
  fire(){}
}
