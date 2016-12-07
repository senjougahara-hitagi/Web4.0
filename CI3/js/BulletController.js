class BulletController{
  constructor(shipSprite, spriteName, configs){
    this.configs = configs;

    this.sprite = Nakama.bulletGroup.create(
      shipSprite.position.x,
      shipSprite.position.y,
      'assets',
      spriteName
    );
    this.sprite.anchor = configs.anchor;
    this.sprite.power = configs.power;
    this.shipSprite = shipSprite;
    this.sprite.index = configs.index

    if(this.sprite.index == 1){
      this.sprite.body.velocity = (configs.direction).setMagnitude(configs.BULLETSPEED);
      this.sprite.angle = Math.atan2(configs.direction.x, -(configs.direction.y))*(180/Math.PI);
    }else if(this.sprite.index == 2){
      this.sprite.events.onKilled.add(this.explode, this);
      this.SPEED = configs.BULLETSPEED;
      this.TURN_RATE = configs.TURN_RATE;
      this.minDistanceToEnemy = 9999999;

      this.sprite.body.velocity = new Phaser.Point(0, -1).setMagnitude(configs.BULLETSPEED);
      this.Enemy_x;
      this.Enemy_y;
    }else if(this.sprite.index == 3)
      this.sprite.events.onKilled.add(this.explode, this);


    this.sprite.checkWorldBounds = true;
    this.sprite.outOfBoundsKill = true;

  }

  update(){
    if(this.sprite.index == 2){
      this.nearestEnemy();
      if(this.minDistanceToEnemy != 9999999){
        var targetAngle = Nakama.game.math.angleBetween(
            this.sprite.position.x,
            this.sprite.position.y,
            this.Enemy_x,
            this.Enemy_y
        ) + Math.PI/2;
        if(this.sprite.rotation != targetAngle){
            var delta = targetAngle - this.sprite.rotation;

            if(delta > Math.PI) delta -= Math.PI*2;
            if(delta < -Math.PI) delta += Math.PI*2;

            if(delta > 0) {
                this.sprite.angle += this.TURN_RATE;
            } else {
                this.sprite.angle -= this.TURN_RATE;
            }

            if(Math.abs(delta) < Nakama.game.math.degToRad(this.TURN_RATE)){
                this.sprite.rotation = targetAngle;
            }
        }
        this.sprite.body.velocity.x = Math.cos(this.sprite.rotation-Math.PI/2)* this.SPEED;
        this.sprite.body.velocity.y = Math.sin(this.sprite.rotation-Math.PI/2)* this.SPEED;
        //this.sprite.body.velocity.setTo(this.sprite.body.velocity.x + this.Enemy_x - this.sprite.position.x , this.sprite.body.velocity.y + this.Enemy_y - this.sprite.position.y).setMagnitude(this.SPEED);
      }
    }
    if(this.sprite.index == 3){
      if(Nakama.keyboard.isDown(Phaser.Keyboard.SPACEBAR) || Nakama.keyboard.isDown(Phaser.Keyboard.SHIFT)) {
        this.sprite.position.x = this.shipSprite.position.x;
        this.sprite.position.y = this.shipSprite.position.y;
      } else {
        this.sprite.kill();
      }
    }
  }

  nearestEnemy() {
    this.minDistanceToEnemy = 9999999;
    for(var i=0;i<Nakama.enemies.length;i++){
      if(Nakama.enemies[i].sprite.health > 0){
        var distance = Nakama.game.math.distance(
          Nakama.enemies[i].sprite.position.x,
          Nakama.enemies[i].sprite.position.y,
          this.sprite.position.x,
          this.sprite.position.y
        );
        if (distance < this.minDistanceToEnemy) {
          this.minDistanceToEnemy = distance;
          this.Enemy_x = Nakama.enemies[i].sprite.position.x;
          this.Enemy_y = Nakama.enemies[i].sprite.position.y;
        }
      }
      /*else{
        var index = Nakama.enemies.indexOf(Nakama.enemies[i]);
        Nakama.enemies.splice(index,1);
      }*/
    }
  }

  explode(){
    var index = Nakama.bullets.indexOf(this);
    if(index > -1){
      Nakama.bullets.splice(index,1);
    }
  }
}
