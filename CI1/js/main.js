//alert('This is product of L.E. corp!!!');
var Nakama = {};
Nakama.config = {
  SHIPSPEED : 777
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
var create = function(){
  Nakama.game.physics.startSystem(Phaser.Physics.ARCADE); //Tao cac hieu ung vat ly.
  Nakama.keyboard = Nakama.game.input.keyboard; //Viet tat Nakama.game.input.keyboard thanh Nakama.keyboard.

  Nakama.ship = Nakama.game.add.sprite(//Tao ship
    200,
    400,
    'assets',
    "Spaceship1-Player.png");
  Nakama.partner = Nakama.game.add.sprite(
    300,
    400,
    'assets',
    "Spaceship1-Partner.png");

    Nakama.game.physics.enable(Nakama.ship, Phaser.Physics.ARCADE); //Ap dung hieu ung vat ly len tau.
    Nakama.game.physics.enable(Nakama.partner, Phaser.Physics.ARCADE);
} //Ham create de khoi tao game: nhan vat, mau, ....
var update = function(){
  if(Nakama.keyboard.isDown(Phaser.Keyboard.UP))// isDown là nút nào trên bàn phím đang bị nhấn xuống, (Phaser.keyboard.UP) là nút ddieuf hướng UP
  {
    Nakama.ship.body.velocity.y = -Nakama.config.SHIPSPEED;
  }
  else if(Nakama.keyboard.isDown(Phaser.Keyboard.DOWN))
  {
    Nakama.ship.body.velocity.y = Nakama.config.SHIPSPEED;
  }
  else {
    Nakama.ship.body.velocity.y = 0;
  }
  if(Nakama.keyboard.isDown(Phaser.Keyboard.LEFT))
  {
    Nakama.ship.body.velocity.x = -Nakama.config.SHIPSPEED;
  }
  else if(Nakama.keyboard.isDown(Phaser.Keyboard.RIGHT))
  {
    Nakama.ship.body.velocity.x = Nakama.config.SHIPSPEED;
  }
  else {
    Nakama.ship.body.velocity.x = 0;
  }
//---------------------------------------------------------------------------------------------
  if(Nakama.keyboard.isDown(Phaser.Keyboard.W))
  {
    Nakama.partner.body.velocity.y = -Nakama.config.SHIPSPEED;
  }
  else if(Nakama.keyboard.isDown(Phaser.Keyboard.S))
  {
    Nakama.partner.body.velocity.y = Nakama.config.SHIPSPEED;
  }
  else {
    Nakama.partner.body.velocity.y = 0;
  }
  if(Nakama.keyboard.isDown(Phaser.Keyboard.A))
  {
    Nakama.partner.body.velocity.x = -Nakama.config.SHIPSPEED;
  }
  else if(Nakama.keyboard.isDown(Phaser.Keyboard.D))
  {
    Nakama.partner.body.velocity.x = Nakama.config.SHIPSPEED;
  }
  else {
    Nakama.partner.body.velocity.x = 0;
  }
} //Tat ca nhung gi xay ra trong game se dc quy dinh trong ham update,
//no se dc goi lien tuc theo so khung hinh tren giay trong game trong moi giay, xuyen suot game.
var render = function(){}
