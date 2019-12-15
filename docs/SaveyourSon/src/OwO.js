import LevelManager from './LevelManager.js'
import Player from './player.js'
import HookGun from './HookGun.js'
import HookGunProyectile from './HookGunProyectile.js'
import GameManager from './GameManager.js'



export default class OwO extends Phaser.Scene {

  constructor() {
    super(/*{ key: 'OwO' }*/ 'OwO');
    this.gameOver=false;
    this.lvM = new LevelManager();
    this.gM=new GameManager();
  }
  preload() {

    this.load.image('sky', './SaveyourSon/assets/sky.png');
    this.load.image('ground', './SaveyourSon/assets/platform.png');
    this.load.spritesheet('dude', './SaveyourSon/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    
  }
  
  create() {


    this.camera = this.cameras.main
    this.add.image(10, 10, 'sky').setScale(3.5);
    this.player = new Player(this, this.gM,this.lvM);
    this.HookGun = new HookGun(this,this.lvM);
    this.HookGunProyectiles= this.physics.add.group();
    this.HookGunProyectile=new HookGunProyectile(this,LevelManager,0,0,-89999,-89999);
    this.HookGunProyectiles.add(this.HookGunProyectile);
    
this.lvM.player=this.player;
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
    
    

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.HookGun,this.platforms);

    // this.physics.add.collider(this.enemy,this.player);
    // this.physics.add.collider(this.enemy,this.player,this.CatchPlayer,null,this.enemy);

    
    //Puedo hacer llamadas a varios métodos en un mismo evento overlap
    this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickGun,null,this.HookGun);
    this.physics.add.overlap(this.HookGunProyectiles,this.platforms,this.Metodo,null,this);

  //  this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickMe,null,this.HookGun);


    


    this.cursors = this.input.keyboard.createCursorKeys();
    this.HookGunProyectile=null;
  }

  update(time, delta) {   
    if(this.gameOver) return ;
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

    this.camera.startFollow(this.player);
  if(this.pointer.isDown&&this.player.getModifier()=='gancho'&&this.HookGunProyectile==null){
      let xDir, yDir;
      if(this.pointer.x>=this.lvM.GetPlayerX())xDir=Math.abs(this.pointer.x-this.lvM.GetPlayerX());
       else xDir=-Math.abs(this.pointer.x-this.lvM.GetPlayerX());
      if(this.pointer.y>=this.lvM.GetPlayerY())yDir=Math.abs(this.pointer.y-this.lvM.GetPlayerY());
       else yDir=-Math.abs(this.pointer.y-this.lvM.GetPlayerY());

    this.HookGunProyectile=new HookGunProyectile(this, this.lvM,xDir,yDir,this.lvM.GetPlayerX(),this.lvM.GetPlayerY());
    this.HookGunProyectiles.add(this.HookGunProyectile);

  }
if(this.HookGunProyectile!=null){
    this.HookGunProyectile.Update();
}
  }
  Metodo(proyectile,platform){
      console.log("AwA");
      proyectile.Collision();
      this.HookGunProyectile=null;
  }
  }