import Player from "./player.js";
import JetPack from "./jetpack.js";
import Enemy from "./enemy.js";
import Antigravedad from "./antigravedad.js";
import Key from "./Key.js";
import Bomba from "./bomb.js";
import GameManager from "./GameManager.js";
import Game from "./game.js";
import LevelManager from "./LevelManager.js";

export default class Level3 extends Phaser.Scene {
    constructor(){
        console.log("Holiwi");
        super('Level3')
        this.lvM = new LevelManager();
    }
    preload() {
        console.log("Hola Buenas");

      this.load.image('sky', '/SaveyourSon/assets/sky.png');
      this.load.image('ground', '/SaveyourSon/assets/platform.png');
      this.load.image('key','/SaveyourSon/assets/Key.png');
      this.load.image('star', '/SaveyourSon/assets/star.png');
      this.load.image('bomb', '/SaveyourSon/assets/bomb.png');
      this.load.image('bomba','/SaveyourSon/assets/bomba.png');
      this.load.spritesheet('dude', '/SaveyourSon/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
      this.load.spritesheet('explosion', 
      '/SaveyourSon/assets/explosion.png',
          { frameWidth: 64, frameHeight: 64 }
      );
      //  this.load.tilemapTiledJSON('level1Tilemap', 'level1.json');
       // this.load.image('patronesTilemap', 'assets/patrones.png');
       console.log("LEVEL3");
        
      }
      
      create(data) {
        this.anims.create({
          key: 'explode',
          frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 4 }),
          frameRate: 10,
          repeat: 0
      });
        this.gM=data;

        // this.map = this.make.tilemap({ 
        //   key: 'level1Tilemap', 
        //   tileWidth: 32, 
        //   tileHeight: 32 
        // });
        // this.map.addTilesetImage('patrones', 'patronesTilemap');
        this.camera = this.cameras.main
        this.add.image(10, 10, 'sky').setScale(3.5);
        this.player = new Player(this, this.gM);
        this.jetpack = new JetPack(this);
        this.enemy = new Enemy(this,this.player,this.gM);
    
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
        this.physics.add.collider(this.enemy,this.platforms);
    
        // this.physics.add.collider(this.enemy,this.player);
        // this.physics.add.collider(this.enemy,this.player,this.CatchPlayer,null,this.enemy);
    
        
        //Puedo hacer llamadas a varios métodos en un mismo evento overlap
        console.log(this.player.speedY);
      
        
        this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player);
        this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack);   
        //this.physics.add.overlap(this.player,this.enemy,this.player.caught,null,this.jetpack);
        this.physics.add.overlap(this.player,this.enemy,this.CatchPlayer,null,this);
        this.physics.add.overlap(this.player,this.enemy,this.Muerte2,null,this);
    
    
        
    
    
        this.cursors = this.input.keyboard.createCursorKeys();
      }
    
      update(time, delta) {   
        console.log(this.gM.GetSpeedImprovments())
        if(this.gameOver) return ;
        let stuned=this.S.isDown;
        let release=this.R.isDown;
        if(this.keyCount>=4){
          stuned=true;
          this.keyCount=0;
          this.scene.start('MenuPowerUps', this.gM);

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