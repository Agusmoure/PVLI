import Player from "./player.js";
import JetPack from "./jetpack.js";
import Enemy from "./enemy.js";
import Antigravedad from "./antigravedad.js";
import Key from "./Key.js";
import Bomba from "./bomb.js";
import GameManager from "./GameManager.js";
import Game from "./game.js";
import LevelManager from "./LevelManager.js";
import HUD from "./HUD.js";


export default class Level1 extends Phaser.Scene {
    constructor(){
        super('Level1')
        this.lvM = new LevelManager();
        this.gM=new GameManager();
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
      //this.load.image('explosion','/SaveyourSon/assets/explosion.png');
      this.load.spritesheet('dude', '/SaveyourSon/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
  
      this.load.tilemapTiledJSON('Nivel1', '/SaveyourSon/assets/Nivel1.json');
       this.load.image('patronesTilemap', '/SaveyourSon/assets/patrones.png');
        
      }
      
      create() {
        //creamos el HUD y establecemos que el juego no esta pausado
        this.Hud = new HUD(this,0,0,this.lvM);
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
        key: 'alcaideRunning',
        frames: this.anims.generateFrameNumbers('alcaideRun', { start: 0, end: 14 }),
        frameRate: 15,
        repeat: -1
    });
    this.anims.create({
      key: 'playerRunning',
      frames: this.anims.generateFrameNumbers('playerRun', { start: 0, end: 14 }),
      frameRate: 15,
      repeat: -1
    });
    //Creamos el Tilemap
        this.map = this.make.tilemap({ 
          key: 'Nivel1', 
            tileWidth: 64, 
            tileHeight: 64 
        });
      
        this.pointer = this.input.activePointer;
        
        let t = this.map.addTilesetImage('Tileset', 'patronesTilemap');
        this.background= this.map.createStaticLayer('Nivel1', t);
        this.background.x=0;
        this.background.y=-400;
        this.background.setCollisionBetween(0, 10);
    
        this.camera = this.cameras.main
        this.player = new Player(this, this.gM,this.lvM);
        this.jetpack = new JetPack(this,7000,150);
        this.antigravedad = new Antigravedad(this,7800,150);
        this.enemy = new Enemy(this,this.player,this.gM);
        //seteamos las variables del lvM
        this.lvM.player=this.player;
        this.lvM.alcaide=this.enemy;
        this.lvM.SetNumBombas(3);
        this.lvM.HUD = this.Hud;
        //Creamos los distintos objetos del mapa
        this.key= new Key(this,700,300,this.lvM).setScale(0.25);
        this.key1= new Key(this,900,0,this.lvM).setScale(0.25);
        this.key2= new Key(this,100,300,this.lvM).setScale(0.25);
        this.key3= new Key(this,600,300,this.lvM).setScale(0.25);
        this.key4= new Key(this,1000,300,this.lvM).setScale(0.25);
        this.keys= this.physics.add.group();
        this.keys.add(this.key);
        this.keys.add(this.key1);
        this.keys.add(this.key2);
        this.keys.add(this.key3);
        this.keys.add(this.key4);
        this.keyCount=0;        
        this.bombas = this.physics.add.group();
        this.bomba = new Bomba(this,4000,200,this.lvM,0);
        this.bomba2 = new Bomba(this,950,200,this.lvM,1);
        this.bombas.add(this.bomba)
        this.bombas.add(this.bomba2);
    
    
        //EXTRAS
        // this.poli=new Extra(this,this.enemy,this.lvM,true,true,100,300);
        // this.poli2=new Extra(this,this.enemy,this.lvM,true,true,200,300);
        // this.poli2.x=400;
        // this.extrasPolis = this.physics.add.group();
        // this.extrasPolis.add(this.poli);
        // this.extrasPolis.add(this.poli2);
        
        // this.preso = new Extra(this,-1,this.lvM,true,false,300,300);
        // this.Presos = this.physics.add.group();
        // this.Presos.add(this.preso);
        
    
        //INPUT
        this.pointer = this.input.activePointer;
        this.spacebar = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        this.S = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.S);
        this.R = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R);
        this.cursors = this.input.keyboard.createCursorKeys();
    
        //Plataformas moviles
       // this.movablePlatform = new MovableWall(this,700,800,200,200);
        
    
        //Paredes destructibles
        // this.bombWall = new BombWall(this,750,700);
        // this.lvM.bombWall= this.bombWall;
        
        //Establecemos los colliders
        this.physics.add.collider(this.player, this.background,this.player.ResetJumps,null,this.player);
        this.physics.add.collider(this.jetpack,this.background);
        this.physics.add.collider(this.antigravedad,this.background);
        this.physics.add.collider(this.enemy,this.background);
        this.physics.add.collider(this.keys,this.background);
        // this.physics.add.collider(this.Presos,this.background);
        this.physics.add.collider(this.bombas,this.background);
        // this.physics.add.collider(this.extrasPolis,this.background);
        // this.physics.add.collider(this.HookGun,this.background);
        // this.physics.add.collider(this.movablePlatform,this.player);
        // this.physics.add.collider(this.bombas,this.bombWall);
        // this.physics.add.collider(this.player,this.bombWall);
        this.physics.add.collider(this.player,this.background);
        //Creamos los triggers y que pasará al meterse en dicho trigger
        //Puedo hacer llamadas a varios métodos en un mismo evento overlap
        this.physics.add.overlap(this.player,this.bombas,this.PillarBomba,null,this);
        this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player);
        this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack);
        this.physics.add.overlap(this.player,this.antigravedad,this.player.changeModifierAntigravedad,null,this.player);
        this.physics.add.overlap(this.player,this.antigravedad,this.antigravedad.changeModifier,null,this.antigravedad);
        this.physics.add.overlap(this.player,this.keys,this.PillarLlave,null,this);
        this.physics.add.overlap(this.player,this.bomba,this.PillarBomba,null,this);
        this.physics.add.overlap(this.player,this.bomba,this.bomba.PickMe,null,this.bomba);
        //this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickGun,null,this.HookGun);
        this.physics.add.overlap(this.player,this.enemy,this.CatchPlayer,null,this);
        this.physics.add.overlap(this.player,this.enemy,this.Muerte2,null,this);
        //Dependiendo de si es un preso o un policia hay que hacerlo con el alcaide o el player pero solo con uno, para que un preso no estu
        // this.physics.add.overlap(this.player,this.extrasPolis,this.PoliPilla,null,this);
        // this.physics.add.overlap(this.enemy,this.Presos,this.PresoPilla,null,this);
          }
    
      update(time, delta) {   
        if(this.gameOver) return ;
        let stuned=this.S.isDown;
        let release=this.R.isDown;
        if(this.keyCount>=3){
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