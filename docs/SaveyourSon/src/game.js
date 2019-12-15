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
import HookGunProyectile from "./HookGunProyectile.js"
export default class Game extends Phaser.Scene {

  constructor(key) {
     super(key);
    this.gameOver=false;
    //this.gM= new GameManager();
    this.lvM = new LevelManager();
  }
preload() {

  this.load.image('sky', '/SaveyourSon/assets/sky.png');
  this.load.image('bombWall', '/SaveyourSon/assets/BombWall.png');
  this.load.image('ground', '/SaveyourSon/assets/platform.png');
  this.load.image('key','/SaveyourSon/assets/Key.png');
  this.load.image('star', '/SaveyourSon/assets/star.png');
  this.load.image('bomb', '/SaveyourSon/assets/bomb.png');
  this.load.image('bomba','/SaveyourSon/assets/bomba.png');
  this.load.image('jetpackHUD','/SaveyourSon/assets/jetpack.png');
  this.load.image('hookHUD','/SaveyourSon/assets/HookGun.png');
  this.load.image('playerHUD','/SaveyourSon/assets/botonNivel.png');
  this.load.image('modifierNoDisponible','/SaveyourSon/assets/ModifierNoDisponible.png');
  this.load.image('meta','/SaveyourSon/assets/Meta.png');
  this.load.image('interfazModifier','/SaveyourSon/assets/FondoModifierHUD.png');
  this.load.image('interfazFondoLlave','/SaveyourSon/assets/FondoLlaveHUD.png');
  this.load.image('iconoPlayer','/SaveyourSon/assets/IconoPlayer.png');
  this.load.image('miraPuntero','/SaveyourSon/assets/miraPuntero.png');
  this.load.spritesheet('explosion', 
  '/SaveyourSon/assets/explosion.png',
      { frameWidth: 64, frameHeight: 64 }
  );
  this.load.spritesheet('alcaideRun','/SaveyourSon/assets/AlcaideRun.png',{frameWidth:64,frameHeight:64});
  this.load.spritesheet('playerRun','/SaveyourSon/assets/PlayerRun.png',{frameWidth:64, frameHeight:64});
  this.load.spritesheet('alcaideAttack','/SaveyourSon/assets/AlcaideAttack.png',{frameWidth:64, frameHeight:64});
  this.load.spritesheet('presoIdle','/SaveyourSon/assets/PresoIdle.png',{frameWidth:64,frameHeight:64});
  this.load.spritesheet('poliVertical','/SaveyourSon/assets/PoliVertical.png',{frameWidth:64, frameHeight:64});
    this.load.spritesheet('poliwalk','/SaveyourSon/assets/poliWalk.png',{frameWidth:64,frameHeight:64});
    this.load.spritesheet('AlcaideAttack','/SaveyourSon/assets/AlcaideAttack.png',{frameWidth:64,frameHeight:64});
    this.load.spritesheet('playerJetpack', '/SaveyourSon/assets/PlayerJetPack.png', { frameWidth: 64, frameHeight: 64 });
    this.load.spritesheet('portalAnimation', '/SaveyourSon/assets/PortalAnimation.png', { frameWidth: 64, frameHeight: 64 });
  //this.load.image('explosion','/SaveyourSon/assets/explosion.png');
  this.load.spritesheet('dude', '/SaveyourSon/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
-
  

   this.load.audio('explosion','/SaveyourSon/assets/Sonidos/Explosion.wav');
     this.load.audio('PlayerHit','/SaveyourSon/assets/Sonidos/PlayerAlSerPillado.wav');
     this.load.audio('Antigravedad', '/SaveyourSon/assets/Sonidos/Antigravedad.wav');
     this.load.audio('CojerLlave', '/SaveyourSon/assets/Sonidos/KeysCortado.wav');
     this.load.audio('Salto', '/SaveyourSon/assets/Sonidos/Salto.wav');
     this.load.audio('PlayerTouched', '/SaveyourSon/assets/Sonidos/PlayerTouched.wav');
     this.load.audio('AlcaideTouched', '/SaveyourSon/assets/Sonidos/AlcaideTouched.wav');
     this.load.audio('Jetpack', '/SaveyourSon/assets/Sonidos/Jetpack.wav');
     this.load.audio('JetpackNoFuel', '/SaveyourSon/assets/Sonidos/JetpackNoFuel.wav');
     this.load.audio('PickUpItem', '/SaveyourSon/assets/Sonidos/PickUpItem.wav');
     this.load.audio('Gancho', '/SaveyourSon/assets/Sonidos/Gancho.wav');


}
create(){
    //INPUT
    this.pointer = this.input.activePointer;
    this.miraSniper = this.add.sprite(0,0,'miraPuntero');
    this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
    this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
    this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
    this.cursors = this.input.keyboard.createCursorKeys();

        //creamos el HUD y establecemos que el juego no esta pausado
        this.textoLLaves= this.add.text(100,100,'HOLA');
this.textoLLaves.setAlign('center');
this.textoLLaves.setFont('Arial Black');
this.textoLLaves.setFontSize(40);
        this.Hud = new HUD(this,0,0,this.lvM,39800,this.textoLLaves);
        this.Hud.body.setGravityY(-1000);
      this.pausado=false;

    //Creamos las animaciones 
        this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4 }),
          frameRate: 10,
          repeat: 0
      });
      this.anims.create({

        key: 'poliWalking',
        frames: this.anims.generateFrameNumbers('poliwalk', { start: 0, end: 30 }),
        frameRate: 10,
        repeat: -1
      });
      this.anims.create({
        key: 'alcaideRunning',
        frames: this.anims.generateFrameNumbers('alcaideRun', { start: 0, end: 14 }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
      key: 'portalAnimation',
      frames: this.anims.generateFrameNumbers('portalAnimation', { start: 0, end: 7 }),
      frameRate: 15,
      repeat: 0
  });
    this.anims.create({
      key: 'alcaideAttacking',
      frames: this.anims.generateFrameNumbers('AlcaideAttack', { start: 0, end: 14 }),
      frameRate: 15,
      repeat: -1
  });
    this.anims.create({
      key: 'playerRunning',
      frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 14 }),
      frameRate: 15,
      repeat: -1
    });
    this.anims.create({

      key: 'poliflying',
      frames: this.anims.generateFrameNumbers('poliVertical', { start: 0, end: 15 }),
      frameRate: 5,
      repeat: -1
    });
    this.anims.create({
      key: 'presoIdle',
      frames: this.anims.generateFrameNumbers('presoIdle', { start: 0, end: 30 }),
      frameRate: 10,
      repeat: -1
    });
    this.pointer = this.input.activePointer;
    this.player = new Player(this, this.gM,this.lvM);
    this.HookGun = new HookGun(this,this.lvM);
    this.enemy = new Enemy(this,this.player,this.gM);
    this.lvM.player=this.player;
    this.lvM.alcaide=this.enemy;
    this.camera = this.cameras.main
    this.lvM.HUD = this.Hud;
    this.HookGunProyectiles= this.physics.add.group();
    this.bombas = this.physics.add.group();
    this.extrasPolis = this.physics.add.group();
    this.keys= this.physics.add.group();
    this.Presos = this.physics.add.group();
    



}
Colliders(){
      
  this.physics.add.collider(this.player, this.background,this.player.ResetJumps,null,this.player);
 this.physics.add.collider(this.jetpack,this.background);
   this.physics.add.collider(this.antigravedad,this.background);
   this.physics.add.collider(this.enemy,this.background);
   this.physics.add.collider(this.keys,this.background);
  this.physics.add.collider(this.bombas,this.background);
   this.physics.add.collider(this.extrasPolis,this.background);
   this.physics.add.collider(this.Presos,this.background);
   this.physics.add.collider(this.HookGun,this.background);
   this.physics.add.collider(this.Presos,this.background);


}
Overlaps(){
  this.physics.add.overlap(this.player,this.bombas,this.PillarBomba,null,this);

  this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player);
  this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack);
  this.physics.add.overlap(this.player,this.antigravedad,this.player.changeModifierAntigravedad,null,this.player);
  this.physics.add.overlap(this.player,this.antigravedad,this.antigravedad.changeModifier,null,this.antigravedad);
  this.physics.add.overlap(this.player,this.keys,this.PillarLlave,null,this);
  this.physics.add.overlap(this.player,this.extrasPolis,this.PoliPilla,null,this);

   this.physics.add.collider(this.HookGunProyectiles,this.background,this.Enganchado,null,this);
  //this.physics.add.overlap(this.player,this.bombas,this.PillarBomba,null,this);
  this.physics.add.overlap(this.player,this.extrasPolis,this.PoliPilla,null,this);
  //this.physics.add.overlap(this.player,this.bombas,this.bombas.PickMe,null,this.bomba);
   this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickGun,null,this.HookGun);
   this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickMe,null,this.HookGun);
  this.physics.add.overlap(this.player,this.enemy,this.CatchPlayer,null,this);
  this.physics.add.overlap(this.player,this.enemy,this.Muerte2,null,this);
}
update(){
  if(this.gameOver) this.EndGame() ;
  // console.log(this.keyCount);
   let stuned=this.S.isDown;
   let release=this.R.isDown;
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

    this.camera.startFollow(this.player);
    this.camera.setFollowOffset(-100, 225);
    if(this.player.modifier== 'gancho'){
      this.miraSniper.visible=true;
      this.miraSniper.x=this.pointer.worldX;
      this.miraSniper.y=this.pointer.worldY;
    this.input.on('pointerdown',pointer=>{

      if(pointer.leftButtonDown() && (this.proyectil=== undefined || this.proyectil === null))
      {
        let varX= this.pointer.worldX-this.player.x;
        let varY = this.pointer.worldY-this.player.y;
        let modulo=Math.sqrt(Math.pow(varX,2)+Math.pow(varY,2));
        this.proyectil = new HookGunProyectile(this,this.lvM, (varX/modulo),(varY/modulo),this.player.x+20,this.player.y+20);
        this.HookGunProyectiles.add(this.proyectil);
      }
    
    });
  }
  else{
    this.miraSniper.visible=false;
  }
    if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
      this.player.LiberarPresos(true);
            }
            else if(Phaser.Input.Keyboard.JustUp(this.spacebar)){
      this.player.LiberarPresos(false);
            }

   

      if(Phaser.Input.Keyboard.JustUp(this.cursors.up))
      this.player.keyUp();

      if(Phaser.Input.Keyboard.JustDown(this.spacebar)){
this.player.LiberarPresos(true);
      }
      else if(Phaser.Input.Keyboard.JustUp(this.spacebar)){
this.player.LiberarPresos(false);
      }


    this.bombas.children.iterate(function (child) {

      if(child != undefined)
      child.Update();
  });
  this.extrasPolis.children.iterate(function (child) {

    if(child != undefined)
    child.Update();
});
if(this.Presos!=undefined&&this.Presos!=null)
this.Presos.children.iterate(function(child){
  if(child != undefined)
    child.Update();
});



if(this.proyectil!==null && this.proyectil!== undefined)
this.proyectil.Update();
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
    if(preso.active)
  preso.caught();
  }
  CatchPlayer(){
    this.gameOver=true;
    this.enemy.HitPlayer();
    this.player.dontMove();
    this.enemy.body.setVelocityX(0);
  }
  EndGame(){
    this.scene.start('MenuPowerUps',this.gM);

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

  Enganchado(proyc,back){
    if(proyc !==undefined)
    console.log(proyc.x);proyc.Collision();
  
  }
  NuevoProyectil(){
    this.proyectil=null;
  }
}