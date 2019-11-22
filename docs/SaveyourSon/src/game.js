import Player from "./player.js";
import JetPack from "./jetpack.js";
import Enemy from "./enemy.js";
import Antigravedad from "./antigravedad.js";
import Key from "./Key.js";
import Bomba from "./bomb.js";
import GameManager from "./GameManager.js";
import Level1 from "./Level1.js";
import LevelManager from "./LevelManager.js";
import Extra from "./extra.js";
import HookGun from "./HookGun.js";
//import HookGunProyectile from "./HookGunProyectile.js"
import MovableWall from "./movableWall.js";
import BombWall from "./bombWall.js";

export default class Game extends Phaser.Scene {

  constructor() {
    super(/*{ key: 'main' }*/ 'game');
    this.gameOver=false;
    this.gM= new GameManager();
    this.lvM = new LevelManager();
  }
  preload() {

    this.load.image('sky', '/SaveyourSon/assets/sky.png');
    this.load.image('ground', '/SaveyourSon/assets/platform.png');
    this.load.image('key','/SaveyourSon/assets/Key.png');
    this.load.image('star', '/SaveyourSon/assets/star.png');
    this.load.image('bomb', '/SaveyourSon/assets/bomb.png');
    this.load.image('bomba','/SaveyourSon/assets/bomba.png');
    this.load.spritesheet('dude', '/SaveyourSon/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    //Problemas1
  //  this.load.tilemapTiledJSON('level1Tilemap', '/SaveyourSon/assets/prueba1.json');
  //   this.load.image('patronesTilemap', '/SaveyourSon/assets/patrones.png');
    
  }
  
  create() {
    //Problemas2
    // this.map = this.add.tilemap({ 
    //   key: 'level1Tilemap', 
    //   tileWidth: 32, 
    //   tileHeight: 32 
    // });
    //  let t = this.map.addTilesetImage('Platformer', 'patronesTilemap');
    // this.background= this.map.createStaticLayer("Capa de Patrones 1", t);

    this.camera = this.cameras.main
    this.add.image(10, 10, 'sky').setScale(3.5);
    this.player = new Player(this, this.gM,this.lvM);
    this.jetpack = new JetPack(this);
    this.antigravedad = new Antigravedad(this);
    this.enemy = new Enemy(this,this.player,this.gM);
    this.lvM.player=this.player;
    this.lvM.alcaide=this.enemy;
    this.key= new Key(this,700,300,this.lvM).setScale(0.25);
    this.key1= new Key(this,900,0,this.lvM).setScale(0.25);
    this.key2= new Key(this,100,300,this.lvM).setScale(0.25);
    this.key3= new Key(this,600,300,this.lvM).setScale(0.25);
    this.key4= new Key(this,1000,300,this.lvM).setScale(0.25);
    this.HookGun = new HookGun(this,this.lvM);

    //this.keyCount=0;
    // this.map = this.add.tilemap({ 
    //   key: 'level1Tilemap', 
    //   // tileWidth: 32, 
    //   // tileHeight: 32 
    // });
    // this.background= this.map.createStaticLayer("Capa de Patrones 1", t);
    this.bomba = new Bomba(this,400,200,this.lvM).setScale(0.10);


    //EXTRAS
    this.poli=new Extra (this,this.enemy,this.lvM,true,false,100,300);

    //INPUT
    this.pointer = this.input.activePointer;
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


   //Creo plataformas random
    this.platforms = this.physics.add.staticGroup();
    this. platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
    
  

    //Plataformas moviles
    this.movablePlatform = new MovableWall(this,700,800,200,200);
    

    //Paredes destructibles
    this.bombWall = new BombWall(this,750,700);
    this.lvM.bombWall= this.bombWall;
    
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
    this.physics.add.collider(this.poli,this.platforms);
    this.physics.add.collider(this.HookGun,this.platforms);
    this.physics.add.collider(this.movablePlatform,this.player);
    this.physics.add.collider(this.bomba,this.bombWall);
    this.physics.add.collider(this.player,this.bombWall);


    // this.physics.add.collider(this.enemy,this.player);
    // this.physics.add.collider(this.enemy,this.player,this.CatchPlayer,null,this.enemy);

    
    //Puedo hacer llamadas a varios métodos en un mismo evento overlap
  
    
    this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player);
    this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack);
    this.physics.add.overlap(this.player,this.antigravedad,this.player.changeModifierAntigravedad,null,this.player);
    this.physics.add.overlap(this.player,this.antigravedad,this.antigravedad.changeModifier,null,this.antigravedad);
    this.physics.add.overlap(this.player,this.key,this.key.PickKey,null,this.key);
    this.physics.add.overlap(this.player,this.key1,this.key1.PickKey,null,this.key1);
    this.physics.add.overlap(this.player,this.key2,this.key2.PickKey,null,this.key2); 
    this.physics.add.overlap(this.player,this.key3,this.key3.PickKey,null,this.key3);
    this.physics.add.overlap(this.player,this.key4,this.key4.PickKey,null,this.key4);

    this.physics.add.overlap(this.player,this.key,this.key.PickMe,null,this.key);
    this.physics.add.overlap(this.player,this.key1,this.key.PickMe,null,this.key1);
    this.physics.add.overlap(this.player,this.key2,this.key.PickMe,null,this.key2);
    this.physics.add.overlap(this.player,this.key3,this.key.PickMe,null,this.key3);
    this.physics.add.overlap(this.player,this.key4,this.key.PickMe,null,this.key4);
    
    this.physics.add.overlap(this.player,this.bomba,this.PillarBomba,null,this);
    this.physics.add.overlap(this.player,this.bomba,this.bomba.PickMe,null,this.bomba);
    this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickGun,null,this.HookGun);
    
  //  this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickMe,null,this.HookGun);


    //this.physics.add.overlap(this.player,this.enemy,this.player.caught,null,this.jetpack);
    this.physics.add.overlap(this.player,this.enemy,this.CatchPlayer,null,this);
    this.physics.add.overlap(this.player,this.enemy,this.Muerte2,null,this);
    //Dependiendo de si es un preso o un policia hay que hacerlo con el alcaide o el player pero solo con uno, para que un preso no estu
    this.physics.add.overlap(this.player,this.poli,this.poli.caught,null,this.poli);


    


    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {   
    if(this.gameOver) return ;
   // console.log(this.keyCount);
    let stuned=this.S.isDown;
    let release=this.R.isDown;
    if(this.lvM.GetKey()>=4){
      // stuned=true;
      this.gM.AddSpeedImprovment(2);
      this.scene.start('MenuPowerUps',this.gM);
    }
    this.enemy.Update(stuned,release);

    this.player.update();


    if (this.cursors.right.isDown){
      this.player.moveRight();
     // this.scene.start('Level1');

    }
    else if(this.cursors.left.isDown){
      this.player.moveLeft();
    }

    if(this.cursors.up.isDown)//Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.player.moveUp();
    
      if(Phaser.Input.Keyboard.JustUp(this.cursors.up))
      this.player.keyUp();

      if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
this.player.LiberarPresos(true);
      }
      else if(Phaser.Input.Keyboard.JustUp(this.spacebar)){
this.player.LiberarPresos(false);
      }

    this.camera.startFollow(this.player);
    this.bomba.Update();
    this.poli.Update();
  if(this.pointer.isDown){
    //this.HookGunProyectile.Shoot(this.pointer.x,this.pointer.y);
  }
  
    this.movablePlatform.Update();
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


  PillarBomba(){
    this.player.changeModifierBomba(this.bomba);
    
  }
  LanzarBomba(bomba,x,y){

bomba.Lanzamiento(x,y,0,0);
  }
}