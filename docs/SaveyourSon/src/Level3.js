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
import HUD from "./HUD.js";

export default class Level2 extends Phaser.Scene {

  constructor() {
    super(/*{ key: 'main' }*/ 'Level3');
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
    this.load.image('jetpackHUD','/SaveyourSon/assets/jetpack.png');
    this.load.image('hookHUD','/SaveyourSon/assets/HookGun.jpg');
    this.load.image('playerHUD','/SaveyourSon/assets/botonNivel.png');
    this.load.spritesheet('explosion', 
    '/SaveyourSon/assets/explosion.png',
        { frameWidth: 64, frameHeight: 64 }
    );
    this.load.spritesheet('alcaideRun','/SaveyourSon/assets/AlcaideRun.png',{frameWidth:64,frameHeight:64});
    this.load.spritesheet('playerRun','/SaveyourSon/assets/PlayerRun.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('alcaideAttack','/SaveyourSon/assets/AlcaideAttack.png',{frameWidth:64, frameHeight:64});
    //this.load.image('explosion','/SaveyourSon/assets/explosion.png');
    this.load.spritesheet('dude', '/SaveyourSon/assets/dude.png', { frameWidth: 32, frameHeight: 48 });

    this.load.tilemapTiledJSON('Nivel3', '/SaveyourSon/assets/Nivel3.json');
     this.load.image('patronesTilemap', '/SaveyourSon/assets/patrones.png');
    

     this.load.audio('explosion','/SaveyourSon/assets/Sonidos/Explosion.wav');
     this.load.audio('PlayerHit','/SaveyourSon/assets/Sonidos/PlayerAlSerPillado.wav');

  }
  
  create() {
    

    this.Hud = new HUD(this,0,0,this.lvM);
    this.Hud.body.setGravityY(-1000);
  this.pausado=false;

    this.anims.create({
      key: 'explode',
      frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4 }),
      frameRate: 10,
      repeat: 0
  });
  this.anims.create({
    key: 'alcaideRunning',
    frames: this.anims.generateFrameNumbers('alcaideRun', { start: 0, end: 14 }),
    frameRate: 15,
    repeat: -1
});

this.anims.create({
  key: 'alcaideAttacking',
  frames: this.anims.generateFrameNumbers('alcaideAttack', { start: 0, end: 12 }),
  frameRate: 15,
  repeat: -1
});

this.anims.create({
  key: 'playerRunning',
  frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 14 }),
  frameRate: 15,
  repeat: -1
});
    this.map = this.make.tilemap({ 
      key: 'Nivel3', 
        tileWidth: 64, 
        tileHeight: 64 
    });
  
    this.pointer = this.input.activePointer;
    
    let t = this.map.addTilesetImage('Tileset', 'patronesTilemap');
    this.background= this.map.createStaticLayer('Tile Layer 1', t);
    this.background.x=0;
    this.background.y=-1000;
    this.background.setCollisionBetween(0, 10);

    this.camera = this.cameras.main
   // this.add.image(10, 10, 'sky').setScale(3.5);
    this.player = new Player(this, this.gM,this.lvM);
    this.jetpack = new JetPack(this);
    this.antigravedad = new Antigravedad(this);
    this.enemy = new Enemy(this,this.player,this.gM);
    //this.enemy.setScale(1,1).refreshBody();
    //this.enemy.refreshBody();
    this.lvM.player=this.player;
    this.lvM.alcaide=this.enemy;
    this.lvM.SetNumBombas(3);
    this.lvM.HUD = this.Hud;
    
    this.player.changeModifierNormal();


    this.key= new Key(this,53200,400,this.lvM).setScale(0.25); //Definitiva
    this.key1= new Key(this,42500,300,this.lvM).setScale(0.25);//Definitiva
    this.key2= new Key(this,22700,800,this.lvM).setScale(0.25);//Definitiva
    this.key3= new Key(this,3800,-500,this.lvM).setScale(0.25);//Definitiva
    this.key4= new Key(this,33000,700,this.lvM).setScale(0.25);//Definitiva

    this.keys= this.physics.add.group();
    this.keys.add(this.key);
    this.keys.add(this.key1);
    this.keys.add(this.key2);
    this.keys.add(this.key3);
    this.keys.add(this.key4);

    this.HookGun = new HookGun(this,this.lvM);

    this.keyCount=0;
    
    //this.background2.setScale(0.1);
  
    this.bombas = this.physics.add.group();
    this.bomba = new Bomba(this,400,200,this.lvM,0);
    this.bomba2 = new Bomba(this,700,200,this.lvM,1);
    this.bombas.add(this.bomba)
    this.bombas.add(this.bomba2);


    //EXTRAS
    this.poli=new Extra (this,2850,-300,'vertical',0,100,200,this.lvM,true,true,100,300);
    this.poli2=new Extra (this,3850,-500,'vertical',0,100,200,this.lvM,false,true,100,300);
    this.poli3=new Extra (this,4000,75,'vertical',0,100,190,this.lvM,false,true,100,300);
    this.poli4=new Extra (this,4200,75,'vertical',0,100,195,this.lvM,false,true,100,300);
    this.poli5=new Extra (this,4400,75,'vertical',0,100,200,this.lvM,false,true,100,300);
    
    this.poli6=new Extra (this,5100,0,'vertical',0,20,50,this.lvM,false,true,100,300);
    this.poli7=new Extra (this,5100,-500,'vertical',0,20,50,this.lvM,false,true,100,300);
    this.poli8=new Extra (this,5250,-200,'vertical',0,20,50,this.lvM,false,true,100,300);
    this.poli9=new Extra (this,5250,100,'vertical',0,20,50,this.lvM,false,true,100,300);
    this.poli10=new Extra (this,5250,-500,'vertical',0,20,50,this.lvM,false,true,100,300);
    this.poli11=new Extra (this,5400,0,'vertical',0,20,50,this.lvM,false,true,100,300);
    this.poli12=new Extra (this,5400,-500,'vertical',0,20,50,this.lvM,false,true,100,300);
  
    this.poli13=new Extra (this,8800,0,'horizontal',0,100,100,this.lvM,true,true,100,300);
    this.poli14=new Extra (this,9400,0,'horizontal',0,100,100,this.lvM,true,true,100,300);

    this.poli15=new Extra (this,11900,75,'vertical',0,100,100,this.lvM,true,true,100,300);

    this.poli16=new Extra (this,22000,900,'vertical',0,30,30,this.lvM,false,true,100,300);
    this.poli17=new Extra (this,22400,900,'vertical',0,50,50,this.lvM,false,true,100,300);
    this.poli18=new Extra (this,22800,900,'vertical',0,75,75,this.lvM,false,true,100,300);
    this.poli19=new Extra (this,23200,900,'vertical',0,100,100,this.lvM,false,true,100,300);
    
    this.poli20=new Extra (this,26700,1000,'vertical',0,100,150,this.lvM,false,true,100,300);
    this.poli21=new Extra (this,26800,600,'vertical',0,100,150,this.lvM,false,true,100,300);

    this.poli22=new Extra (this,30300,600,'horizontal',0,100,150,this.lvM,false,true,100,300);

    this.poli23=new Extra (this,39900,800,'vertical',0,75,150,this.lvM,false,true,100,300);
    this.poli24=new Extra (this,40700,1150,'vertical',0,50,150,this.lvM,false,true,100,300);

    this.poli25=new Extra (this,46000,1100,'horizontal',0,50,150,this.lvM,false,true,100,300);
    this.poli26=new Extra (this,46300,1100,'horizontal',0,50,150,this.lvM,false,true,100,300);
    this.poli27=new Extra (this,46600,1100,'horizontal',0,50,150,this.lvM,false,true,100,300);
    this.poli28=new Extra (this,46900,1100,'horizontal',0,50,150,this.lvM,false,true,100,300);

    this.poli29=new Extra (this,48600,1150,'vertical',0,75,120,this.lvM,false,true,100,300);

    this.poli30=new Extra (this,50320,1100,'horizontal',0,60,120,this.lvM,false,true,100,300);
    this.poli31=new Extra (this,50640,1100,'horizontal',0,0,0,this.lvM,false,true,100,300);

    this.poli32=new Extra (this,51400,1100,'horizontal',0,100,100,this.lvM,false,true,100,300);
    this.poli33=new Extra (this,53000,600,'vertical',0,100,100,this.lvM,false,true,100,300);

    this.poli34=new Extra (this,55000,600,'horizontal',0,100,100,this.lvM,false,true,100,300);
    this.poli35=new Extra (this,54500,750,'vertical',0,100,150,this.lvM,false,true,100,300);
    this.poli36=new Extra (this,55500,750,'horizontal',0,100,150,this.lvM,true,true,30,300);

    this.poli37=new Extra (this,57400,1150,'vertical',0,100,150,this.lvM,true,true,30,300);
    this.poli38=new Extra (this,57625,1150,'vertical',0,100,155,this.lvM,true,true,30,300);
    this.poli39=new Extra (this,57850,1150,'vertical',0,100,150,this.lvM,true,true,30,300);
    this.poli40=new Extra (this,57400,550,'vertical',0,100,150,this.lvM,true,true,30,300);
    this.poli41=new Extra (this,57625,570,'vertical',0,125,155,this.lvM,true,true,30,300);
    this.poli42=new Extra (this,57850,550,'vertical',0,100,150,this.lvM,true,true,30,300);

    this.poli43=new Extra (this,56300,750,'vertical',0,100,150,this.lvM,true,true,30,300);
    this.poli44=new Extra (this,56300,1100,'vertical',0,100,150,this.lvM,true,true,30,300);


    this.extrasPolis = this.physics.add.group();
    this.extrasPolis.add(this.poli);
    this.extrasPolis.add(this.poli2);
    this.extrasPolis.add(this.poli3);
    this.extrasPolis.add(this.poli4);
    this.extrasPolis.add(this.poli5);
    this.extrasPolis.add(this.poli6);
    this.extrasPolis.add(this.poli7);
    this.extrasPolis.add(this.poli8);
    this.extrasPolis.add(this.poli9);
    this.extrasPolis.add(this.poli10);
    this.extrasPolis.add(this.poli11);
    this.extrasPolis.add(this.poli12);
    this.extrasPolis.add(this.poli13);
    this.extrasPolis.add(this.poli14);
    this.extrasPolis.add(this.poli15);
    this.extrasPolis.add(this.poli16);
    this.extrasPolis.add(this.poli17);
    this.extrasPolis.add(this.poli18);
    this.extrasPolis.add(this.poli19);
    this.extrasPolis.add(this.poli20);
    this.extrasPolis.add(this.poli21);
    this.extrasPolis.add(this.poli22);
    this.extrasPolis.add(this.poli23);
    this.extrasPolis.add(this.poli24);
    this.extrasPolis.add(this.poli25);
    this.extrasPolis.add(this.poli26);
    this.extrasPolis.add(this.poli27);
    this.extrasPolis.add(this.poli28);
    this.extrasPolis.add(this.poli29);
    this.extrasPolis.add(this.poli30);
    this.extrasPolis.add(this.poli31);
    this.extrasPolis.add(this.poli32);
    this.extrasPolis.add(this.poli33);
    this.extrasPolis.add(this.poli34);
    this.extrasPolis.add(this.poli35);
    this.extrasPolis.add(this.poli36);
    this.extrasPolis.add(this.poli37);
    this.extrasPolis.add(this.poli38);
    this.extrasPolis.add(this.poli39);
    this.extrasPolis.add(this.poli40);
    this.extrasPolis.add(this.poli41);
    this.extrasPolis.add(this.poli42);
    this.extrasPolis.add(this.poli43);
    this.extrasPolis.add(this.poli44);
    









    
    this.preso = new Extra(this,500,100,'horizontal',-1,50,100,this.lvM,true,false,300,300);
    this.Presos = this.physics.add.group();
    this.Presos.add(this.preso);
    

    //INPUT
    this.pointer = this.input.activePointer;
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);


   //Creo plataformas random
 
    
  

    //Plataformas moviles
    this.movablePlatform = new MovableWall(this,700,800,200,200);
    

    //Paredes destructibles
    this.bombWall = new BombWall(this,750,700);
    this.lvM.bombWalls= new Array();
    this.lvM.bombWalls[0]= this.bombWall;
    
    //Suelo para el alcaide
    //this.floor = this.physics.add.staticGroup();
    //this.physics.add.collider(this.enemy, this.floor);

    
    

    this.physics.add.collider(this.player, this.background);
    this.physics.add.collider(this.jetpack,this.background);
    this.physics.add.collider(this.antigravedad,this.background);
    this.physics.add.collider(this.enemy,this.background);
    this.physics.add.collider(this.keys,this.background);
    this.physics.add.collider(this.Presos,this.background);
    
  
    this.physics.add.collider(this.bombas,this.background);
    this.physics.add.collider(this.extrasPolis,this.background);
    this.physics.add.collider(this.HookGun,this.background);
    this.physics.add.collider(this.movablePlatform,this.player);
    this.physics.add.collider(this.bombas,this.bombWall);
    this.physics.add.collider(this.player,this.bombWall);
    this.physics.add.collider(this.player,this.background);


    // this.physics.add.collider(this.enemy,this.player);
    // this.physics.add.collider(this.enemy,this.player,this.CatchPlayer,null,this.enemy);

    
    //Puedo hacer llamadas a varios métodos en un mismo evento overlap
    this.physics.add.overlap(this.player,this.bombas,this.PillarBomba,null,this);
    
    this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player);
    this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack);
    this.physics.add.overlap(this.player,this.antigravedad,this.player.changeModifierAntigravedad,null,this.player);
    this.physics.add.overlap(this.player,this.antigravedad,this.antigravedad.changeModifier,null,this.antigravedad);
    this.physics.add.overlap(this.player,this.keys,this.PillarLlave,null,this);
    
    
    this.physics.add.overlap(this.player,this.bomba,this.PillarBomba,null,this);

    this.physics.add.overlap(this.player,this.bomba,this.bomba.PickMe,null,this.bomba);
    this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickGun,null,this.HookGun);
    
  //  this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickMe,null,this.HookGun);


    this.physics.add.overlap(this.player,this.enemy,this.CatchPlayer,null,this);
    this.physics.add.overlap(this.player,this.enemy,this.Muerte2,null,this);
    //Dependiendo de si es un preso o un policia hay que hacerlo con el alcaide o el player pero solo con uno, para que un preso no estu
    this.physics.add.overlap(this.player,this.extrasPolis,this.PoliPilla,null,this);
    this.physics.add.overlap(this.enemy,this.Presos,this.PresoPilla,null,this);

    


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


    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.player.LiberarPresos(true);
            }
            else if(Phaser.Input.Keyboard.JustUp(this.spacebar)){
      this.player.LiberarPresos(false);
            }
            
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

    this.bombas.children.iterate(function (child) {

      if(child != undefined)
      child.Update();  
  });
  this.extrasPolis.children.iterate(function (child) {

    if(child != undefined)
    child.Update();  
});
this.Presos.children.iterate(function(child){
  if(child != undefined)
    child.Update();  
});


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
    //this.gameOver=true;
    this.enemy.HitPlayer();
    this.player.dontMove();
    this.enemy.body.setVelocityX(0);
  }
  EndGame(){

  }

  PillarBomba(player,bomba){
    
    if(!bomba.recogida){
     bomba.PickMe();
     player.changeModifierBomba(bomba.index);
     console.log(bomba.index);
    }
  }
  PillarLlave(player,llave){
    llave.PickMe();
  }
PoliPilla(player,poli){

  
poli.caught();
}

PresoPilla(enemy, preso){
preso.caught();
}

  LanzarBomba(bomba,x,y){

bomba.Lanzamiento(x,y,0,0);
  }


  Pausar(){
    if(!this.pausado){
    this.pausado=true;
      this.scene.pause();
    }
    else{
      console.log('kjewbkwbkeb');
      this.pausado=false;
    this.scene.resume('Level2');
    }
  }
}