//alert('This is product of L.E. corp!!!');
var Nakama = {};
Nakama.configs = {
  SHIPSPEED : 500,
  BULLETSPEED : 100,
  PLAYERDAMAGE : 1,
  PLAYER_TYPE : {
    PLAYER_1 : true,
    PLAYER_2 : false
  }
}

window.onload = function(){
  Nakama.configs.SHIP_TYPE = {
    SHIP_TYPE1: ShipType1Controller,
    SHIP_TYPE2: ShipType2Controller,
    SHIP_TYPE3: ShipType3Controller
  }
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
Nakama.bullets = [];
Nakama.enemies = [];

var create = function(){//Ham create de khoi tao game: nhan vat, mau, ....
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE); //Tao cac hieu ung vat ly.
  Nakama.keyboard = Nakama.game.input.keyboard; //Viet tat Nakama.game.input.keyboard thanh Nakama.keyboard.

  //  The scrolling starfield background
  starfield = Nakama.game.add.tileSprite(0, 0, 640, 960, 'background');
  //Nakama.game.add.sprite(0, 0, 'background');

  Nakama.bulletGroup = Nakama.game.add.physicsGroup();
  Nakama.enemyGroup = Nakama.game.add.physicsGroup();
  Nakama.playerGroup = Nakama.game.add.physicsGroup();

  Nakama.shipControllers = [];

  var player1Constructor = getPlayerShipChoice("Player1");
  var player2Constructor = getPlayerShipChoice("Player2");

  var player1 = new player1Constructor(400, 800, Nakama.configs.PLAYER_TYPE.PLAYER_1, {
    up : Phaser.Keyboard.UP,
    down : Phaser.Keyboard.DOWN,
    left : Phaser.Keyboard.LEFT,
    right : Phaser.Keyboard.RIGHT,
    fireButton : Phaser.Keyboard.SPACEBAR
  });
  Nakama.shipControllers.push(player1);

  var player2 = new player2Constructor(250, 800, Nakama.configs.PLAYER_TYPE.PLAYER_2, {
    up : Phaser.Keyboard.W,
    down : Phaser.Keyboard.S,
    left : Phaser.Keyboard.A,
    right : Phaser.Keyboard.D,
    fireButton : Phaser.Keyboard.SHIFT
  });
  Nakama.shipControllers.push(player2);

  var enemy1 = new EnemyCreate(320, 100, "EnemyType3.png", {
    hp : 1000
  });
  Nakama.enemies.push(enemy1);

  var enemy2 = new EnemyCreate(320, 200, "EnemyType2.png", {
    hp : 700
  });
  Nakama.enemies.push(enemy2);

  var enemy3 = new EnemyCreate(200, 200, "EnemyType2.png", {
    hp : 700
  });
  Nakama.enemies.push(enemy3);
}

var update = function(){

  starfield.tilePosition.y += 7;

  for(var i=0; i<Nakama.shipControllers.length; i++){
    Nakama.shipControllers[i].update();
  }

  for(i=0; i<Nakama.bullets.length; i++){
    Nakama.bullets[i].update();
  }

  for(i=0; i < Nakama.enemies.length; i++){
    //Nakama.enemies[i].update();
  }

  Nakama.game.physics.arcade.overlap(Nakama.bulletGroup, Nakama.enemyGroup, onBulletHitActor);//Khi bullet va enemy trung nhau
                                                                                              //thi thuc hien onBulletHitActor
} //Tat ca nhung gi xay ra trong game se dc quy dinh trong ham update,
//no se dc goi lien tuc theo so khung hinh tren giay trong game trong moi giay, xuyen suot game.
var render = function(){
  /*Nakama.playerGroup.forEachAlive(function(sprite){
    Nakama.game.debug.body(sprite);
  });
  Nakama.enemyGroup.forEachAlive(function(sprite){
    Nakama.game.debug.body(sprite);
  });
  Nakama.bulletGroup.forEachAlive(function(sprite){
    Nakama.game.debug.body(sprite);
  });*/
}

function onBulletHitActor( bulletSprite, actorSprite){
  actorSprite.damage(bulletSprite.power);//Trừ health của actorSprite đi bằng đúng DAMAGE nhận đc
  if(bulletSprite.index != 3)
    bulletSprite.kill();
}

function getPlayerShipChoice(playerName){
  var playerChoice = prompt(playerName + " Please choose ship type.");
  playerChoice = parseInt(playerChoice);
  switch (playerChoice) {
    case 1:
    default:
      var playerConstructor = Nakama.configs.SHIP_TYPE.SHIP_TYPE1;
      break;
    case 2:
      var playerConstructor = Nakama.configs.SHIP_TYPE.SHIP_TYPE2;
      break;
    case 3:
      var playerConstructor = Nakama.configs.SHIP_TYPE.SHIP_TYPE3;
      break;
  }
  return playerConstructor;
}
