import Player from "./player.js";
import JetPack from "./jetpack.js";
import Enemy from "./enemy.js";

export default class Game extends Phaser.Scene {
  constructor() {
    super({ key: 'main' });
  }
  preload() {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('ground', 'assets/platform.png');

    this.load.image('star', 'assets/star.png');
    this.load.image('bomb', 'assets/bomb.png');
    this.load.spritesheet('dude', 'assets/dude.png', { frameWidth: 32, frameHeight: 48 });
    
  }
  
  create() {
    this.add.image(10, 10, 'sky').setScale(3.5);
    this.player = new Player(this);
    this.jetpack = new JetPack(this);
    this.enemy = new Enemy(this,this.player);

   //Creo plataformas random
    this.platforms = this.physics.add.staticGroup();
   this. platforms.create(400, 568, 'ground').setScale(2).refreshBody();
    this.platforms.create(600, 400, 'ground');
    this.platforms.create(50, 250, 'ground');
    this.platforms.create(750, 220, 'ground');
    
    

    this.physics.add.collider(this.player, this.platforms);
    this.physics.add.collider(this.jetpack,this.platforms);
    this.physics.add.collider(this.enemy,this.platforms);
    
    //Puedo hacer llamadas a varios métodos en un mismo evento overlap
    console.log(this.player.speedY);
  
    
    this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player)
    this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack)


    this.cursors = this.input.keyboard.createCursorKeys();
  }

  update(time, delta) {   
    
    this.enemy.followPlayer();

    if (this.cursors.right.isDown){
      this.player.moveRight();
    }
    else if(this.cursors.left.isDown){
      this.player.moveLeft();
    }
    else{
      this.player.dontMove();
    }

    if(this.cursors.up.isDown){
      this.player.moveUp();
    }
    
  }

  arriba(){
    this.player.changeModifier();
    this.jetpack.changeModifier();
  }
}