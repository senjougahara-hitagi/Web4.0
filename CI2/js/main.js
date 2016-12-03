//alert('This is product of L.E. corp!!!');
var Nakama = {};
Nakama.configs = {
  SHIPSPEED : 500,
  BULLETSPEED : 1000,
  PLAYERDAMAGE : 10
}

window.onload = function(){
  Nakama.game = new Phaser.Game(
    640,
    960,
    Phaser.AUTO,
    '',
    {
      preload: preload,
      create: create,
      update: update,
      render: render
    },
    false,
    false
  );
}
var preload = function(){ //Ham preload dung de load anh va nhac tu o cung ra RAM
  Nakama.game.scale.minWidth = 320;
  Nakama.game.scale.minHeight = 480;
  Nakama.game.scale.maxWidth = 640;
  Nakama.game.scale.maxHeight = 960;
  Nakama.game.scale.pageAlignHorizontally = true;
  Nakama.game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;

  Nakama.game.load.atlasJSONHash('assets', 'Assets/assets.png', 'Assets/assets.json');
  Nakama.game.load.image('background', 'Assets/Map1.png');

  Nakama.game.time.advancedTiming = true;
}

var starfield;

var create = function(){//Ham create de khoi tao game: nhan vat, mau, ....
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE); //Tao cac hieu ung vat ly.
  Nakama.keyboard = Nakama.game.input.keyboard; //Viet tat Nakama.game.input.keyboard thanh Nakama.keyboard.

  //  The scrolling starfield background
  starfield = Nakama.game.add.tileSprite(0, 0, 640, 960, 'background');

  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.shipControllers = [];

  var player1 = new ShipController(200, 600, "Spaceship3-Partner.png", {
    up : Phaser.Keyboard.UP,
    down : Phaser.Keyboard.DOWN,
    left : Phaser.Keyboard.LEFT,
    right : Phaser.Keyboard.RIGHT,
    fireButton : Phaser.Keyboard.SPACEBAR,
    cooldown : 0.1
  });
  Nakama.shipControllers.push(player1);

  var player2 = new ShipController(300, 600, "EnemyType3.png", {
    up : Phaser.Keyboard.W,
    down : Phaser.Keyboard.S,
    left : Phaser.Keyboard.A,
    right : Phaser.Keyboard.D,
    fireButton : Phaser.Keyboard.SHIFT,
    cooldown : 0.1
  });
  Nakama.shipControllers.push(player2);

  Nakama.enemies = [];
  var enemy = new EnemyCreate(320, 100, "EnemyType1.png", {
    hp : 200
  });
  Nakama.enemies.push(enemy);
}

var update = function(){

  starfield.tilePosition.y += 7;

  for(var i=0; i<Nakama.shipControllers.length; i++){
    Nakama.shipControllers[i].update();
  }

  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.enemyGroup, onBulletHitActor);//Khi bullet va enemy trung nhau
                                                                                              //thi thuc hien onBulletHitActor
} //Tat ca nhung gi xay ra trong game se dc quy dinh trong ham update,
//no se dc goi lien tuc theo so khung hinh tren giay trong game trong moi giay, xuyen suot game.
var render = function(){}

function onBulletHitActor( bulletSprite, actorSprite){
  actorSprite.damage(Nakama.configs.PLAYERDAMAGE);//Trừ health của actorSprite đi bằng đúng DAMAGE nhận đc
  bulletSprite.kill();
}
