import Player from "./player.js";
import JetPack from "./jetpack.js";
import Enemy from "./enemy.js";
import Antigravedad from "./antigravedad.js";
import Key from "./Key.js";
import Bomba from "./bomb.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
    this.gameOver=false;
  }
  preload() {
    this.load.image('sky', '../assets/sky.png');
    this.load.image('ground', '../assets/platform.png');
    this.load.image('key','../assets/Key.png');
    this.load.image('star', '../assets/star.png');
    this.load.image('bomb', '../assets/bomb.png');
    this.load.image('bomba','../assets/bomba.png');
    this.load.spritesheet('dude', '../assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  //  this.load.tilemapTiledJSON('level1Tilemap', 'level1.json');
   // this.load.image('patronesTilemap', 'assets/patrones.png');
    
  }
  
  create() {
    // this.map = this.make.tilemap({ 
    //   key: 'level1Tilemap', 
    //   tileWidth: 32, 
    //   tileHeight: 32 
    // });
    // this.map.addTilesetImage('patrones', 'patronesTilemap');
    this.camera = this.cameras.main
    this.add.image(10, 10, 'sky').setScale(3.5);
    this.player = new Player(this);
    this.jetpack = new JetPack(this);
    this.antigravedad = new Antigravedad(this);
    this.enemy = new Enemy(this,this.player);
    this.key= new Key(this,700,300).setScale(0.25);
    this.key1= new Key(this,900,0).setScale(0.25);
    this.key2= new Key(this,100,300).setScale(0.25);
    this.key3= new Key(this,600,300).setScale(0.25);
    this.key4= new Key(this,1000,300).setScale(0.25);
    this.keyCount=0;
    this.bomba = new Bomba(this,400,200,this.player).setScale(0.10);

    //INPUT
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


   //Creo plataformas random
    this.platforms = this.physics.add.staticGroup();
   this. platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');

    
    //Suelo para el alcaide
    //this.floor = this.physics.add.staticGroup();
    //this.physics.add.collider(this.enemy, this.floor);

    
    

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.jetpack,this.platforms);
    this.physics.add.collider(this.antigravedad,this.platforms);
    this.physics.add.collider(this.enemy,this.platforms);
    this.physics.add.collider(this.key,this.platforms);
    this.physics.add.collider(this.key1,this.platforms);
    this.physics.add.collider(this.key2,this.platforms);
    this.physics.add.collider(this.key3,this.platforms);
    this.physics.add.collider(this.key4,this.platforms);
    this.physics.add.collider(this.bomba,this.platforms);

    // this.physics.add.collider(this.enemy,this.player);
    // this.physics.add.collider(this.enemy,this.player,this.CatchPlayer,null,this.enemy);

    
    //Puedo hacer llamadas a varios métodos en un mismo evento overlap
    console.log(this.player.speedY);
  
    
    this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player);
    this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack);
    this.physics.add.overlap(this.player,this.antigravedad,this.player.changeModifierAntigravedad,null,this.player);
    this.physics.add.overlap(this.player,this.antigravedad,this.antigravedad.changeModifier,null,this.antigravedad);
    this.physics.add.overlap(this.player,this.key,this.PickKey,null,this);
    this.physics.add.overlap(this.player,this.key1,this.PickKey,null,this);
    this.physics.add.overlap(this.player,this.key2,this.PickKey,null,this); 
    this.physics.add.overlap(this.player,this.key3,this.PickKey,null,this);
    this.physics.add.overlap(this.player,this.key4,this.PickKey,null,this);

    this.physics.add.overlap(this.player,this.key,this.key.PickMe,null,this.key);
    this.physics.add.overlap(this.player,this.key1,this.key.PickMe,null,this.key1);
    this.physics.add.overlap(this.player,this.key2,this.key.PickMe,null,this.key2);
    this.physics.add.overlap(this.player,this.key3,this.key.PickMe,null,this.key3);
    this.physics.add.overlap(this.player,this.key4,this.key.PickMe,null,this.key4);
    
    this.physics.add.overlap(this.player,this.bomba,this.PillarBomba,null,this);
    this.physics.add.overlap(this.player,this.bomba,this.bomba.PickMe,null,this.bomba);

    //this.physics.add.overlap(this.player,this.enemy,this.player.caught,null,this.jetpack);
    this.physics.add.overlap(this.player,this.enemy,this.CatchPlayer,null,this);
    this.physics.add.overlap(this.player,this.enemy,this.Muerte2,null,this);


    


    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {   
    if(this.gameOver) return ;
    console.log(this.keyCount);
    let stuned=this.S.isDown;
    let release=this.R.isDown;
    if(this.keyCount>=3){
      stuned=true;
      this.keyCount=0;
    }
    this.enemy.Update(stuned,release);

    this.player.update();


    if (this.cursors.right.isDown){
      this.player.moveRight();
    }
    else if(this.cursors.left.isDown){
      this.player.moveLeft();
    }

    if(this.cursors.up.isDown)//Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.player.moveUp();
    
      if(Phaser.Input.Keyboard.JustDown(this.cursors.up))
      this.player.keyUp();
   
    this.camera.startFollow(this.player);
  }

  arriba(){
    this.player.changeModifier();
    this.jetpack.changeModifier();
  }
  CatchPlayer(){
    this.gameOver=true;
    this.player.dontMove();
    this.enemy.body.setVelocityX(0);
  }
  PickKey(){
    this.keyCount=this.keyCount+1;
  }


  PillarBomba(){
    this.player.changeModifierBomba(this.bomba);
    
  }
  LanzarBomba(bomba,x,y){

bomba.Lanzamiento(x,y,0,0);
  }
}