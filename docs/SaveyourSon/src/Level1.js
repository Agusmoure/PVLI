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
import Extra from "./extra.js";


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
        

       //SONIDOS
      this.load.audio('explosion','/SaveyourSon/assets/Sonidos/Explosion.wav');
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
        this.background.y=0;
        this.background.setCollisionBetween(0, 10);
    
        this.camera = this.cameras.main
        this.player = new Player(this, this.gM,this.lvM);
        this.jetpack = new JetPack(this,7000,150);
        this.antigravedad = new Antigravedad(this,7800,150);
        this.enemy = new Enemy(this,this.player,this.gM);
        //seteamos las variables del lvM
        this.lvM.player=this.player;
        this.lvM.alcaide=this.enemy;
        //this.lvM.SetNumBombas(3);
        this.lvM.bombWalls = new Array();
        this.lvM.HUD = this.Hud;
        this.player.changeModifierNormal();
        //Creamos los distintos objetos del mapa
        this.key= new Key(this,700,300,this.lvM).setScale(0.25);
        this.key1= new Key(this,900,0,this.lvM).setScale(0.25);
        this.key2= new Key(this,100,300,this.lvM).setScale(0.25);
        this.key3= new Key(this,600,300,this.lvM).setScale(0.25);
        this.key4= new Key(this,1000,300,this.lvM).setScale(0.25);
        this.key5= new Key(this,1900,300,this.lvM).setScale(0.25);
        this.key6= new Key(this,2480,300,this.lvM).setScale(0.25);
        this.key7= new Key(this,3200,200,this.lvM).setScale(0.25);
        this.key8= new Key(this,3300,300,this.lvM).setScale(0.25);
        this.key9= new Key(this,3500,400,this.lvM).setScale(0.25);
        this.keyA= new Key(this,4500,300,this.lvM).setScale(0.25);
        this.keyB= new Key(this,5000,300,this.lvM).setScale(0.25);
        this.keyC= new Key(this,5470,300,this.lvM).setScale(0.25);
        this.keyD= new Key(this,5900,300,this.lvM).setScale(0.25);
        this.keyE= new Key(this,7300,300,this.lvM).setScale(0.25);
        this.keyF= new Key(this,7500,300,this.lvM).setScale(0.25);
        this.key10= new Key(this,7600,300,this.lvM).setScale(0.25);
        this.key11= new Key(this,9100,300,this.lvM).setScale(0.25);
        this.key12= new Key(this,9600,300,this.lvM).setScale(0.25);
        this.key13= new Key(this,9700,300,this.lvM).setScale(0.25);
        this.key14= new Key(this,9800,300,this.lvM).setScale(0.25);
        this.key15= new Key(this,10000,300,this.lvM).setScale(0.25);
        this.key16= new Key(this,10100,300,this.lvM).setScale(0.25);
        this.key17= new Key(this,10200,300,this.lvM).setScale(0.25);
        this.key18= new Key(this,10300,300,this.lvM).setScale(0.25);
        this.key19= new Key(this,10400,300,this.lvM).setScale(0.25);
        this.key1A= new Key(this,10500,300,this.lvM).setScale(0.25);
        this.key1B= new Key(this,11000,300,this.lvM).setScale(0.25);
        this.key1C= new Key(this,11500,300,this.lvM).setScale(0.25);
        this.key1D= new Key(this,11925,300,this.lvM).setScale(0.25);
        this.key1E= new Key(this,12000,300,this.lvM).setScale(0.25);
        this.key1F= new Key(this,12100,300,this.lvM).setScale(0.25);
        this.key20= new Key(this,12200,300,this.lvM).setScale(0.25);
        this.key21= new Key(this,12300,300,this.lvM).setScale(0.25);
        this.key22= new Key(this,12950,300,this.lvM).setScale(0.25);
        this.key23= new Key(this,13000,300,this.lvM).setScale(0.25);
        this.key24= new Key(this,13100,300,this.lvM).setScale(0.25);
        this.key25= new Key(this,13200,300,this.lvM).setScale(0.25);
        this.key26= new Key(this,13300,300,this.lvM).setScale(0.25);
        this.key27= new Key(this,14000,300,this.lvM).setScale(0.25);
        this.key28= new Key(this,14100,300,this.lvM).setScale(0.25);
        this.key29= new Key(this,14200,300,this.lvM).setScale(0.25);
        this.key2A= new Key(this,16100,300,this.lvM).setScale(0.25);
        this.key2B= new Key(this,16150,300,this.lvM).setScale(0.25);
        this.key2C= new Key(this,16200,300,this.lvM).setScale(0.25);


        this.keys= this.physics.add.group();
        this.keys.add(this.key);
        this.keys.add(this.key1);
        this.keys.add(this.key2);
        this.keys.add(this.key3);
        this.keys.add(this.key4);
        this.keys.add(this.key5);
        this.keys.add(this.key6);
        this.keys.add(this.key7);
        this.keys.add(this.key8);
        this.keys.add(this.key9);
        this.keys.add(this.keyA);
        this.keys.add(this.keyB);
        this.keys.add(this.keyC);
        this.keys.add(this.keyD);
        this.keys.add(this.keyE);
        this.keys.add(this.keyF);
        this.keys.add(this.key10);
        this.keys.add(this.key11);
        this.keys.add(this.key12);
        this.keys.add(this.key13);
        this.keys.add(this.key14);
        this.keys.add(this.key15);
        this.keys.add(this.key16);
        this.keys.add(this.key17);
        this.keys.add(this.key18);
        this.keys.add(this.key19);
        this.keys.add(this.key1A);
        this.keys.add(this.key1B);
        this.keys.add(this.key1C);
        this.keys.add(this.key1D);
        this.keys.add(this.key1E);
        this.keys.add(this.key1F);
        this.keys.add(this.key20);
        this.keys.add(this.key21);
        this.keys.add(this.key22);
        this.keys.add(this.key23);
        this.keys.add(this.key24);
        this.keys.add(this.key25);
        this.keys.add(this.key26);
        this.keys.add(this.key27);
        this.keys.add(this.key28);
        this.keys.add(this.key29);
        this.keys.add(this.key2A);
        this.keys.add(this.key2B);
        this.keys.add(this.key2C);



        this.keyCount=0;        
    //     this.bombas = this.physics.add.group();
    //     this.bomba = new Bomba(this,400,200,this.lvM,0);
    // this.bomba2 = new Bomba(this,700,200,this.lvM,1);
    //     this.bombas.add(this.bomba)
    //     this.bombas.add(this.bomba2);
    
    
    //EXTRAS
    this.poli =new Extra (this,200,100,'vertical',0,100,200,this.lvM,true,true,100,300);
    this.poli1 =new Extra (this,1800,800,'vertical',0,75,200,this.lvM,true,true,100,300);
    this.poli2 =new Extra (this,2800,800,'horizontal',0,75,100,this.lvM,false,true,100,300);
    this.poli3 =new Extra (this,3200,800,'horizontal',0,75,100,this.lvM,false,true,100,300);
    this.poli4 =new Extra (this,4540,800,'horizontal',0,20,100,this.lvM,false,true,100,300);
    this.extrasPolis = this.physics.add.group();
    this.extrasPolis.add(this.poli);
    this.extrasPolis.add(this.poli1);
    this.extrasPolis.add(this.poli2);
    this.extrasPolis.add(this.poli3);
    this.extrasPolis.add(this.poli4);

        // this.poli=new Extra(this,this.enemy,this.lvM,true,true,100,300);
        // this.poli2=new Extra(this,this.enemy,this.lvM,true,true,200,300);
        // this.poli3=new Extra(this,this.enemy,this.lvM,true,true,500,300);
        // this.poli4=new Extra(this,this.enemy,this.lvM,true,true,600,300);
        // this.poli5=new Extra(this,this.enemy,this.lvM,true,true,900,300);
        // this.poli6=new Extra(this,this.enemy,this.lvM,true,true,1000,300);
        // this.poli7=new Extra(this,this.enemy,this.lvM,true,true,1300,300);
        // this.poli8=new Extra(this,this.enemy,this.lvM,true,true,1800,300);
        // this.poli9=new Extra(this,this.enemy,this.lvM,true,true,2000,300);
        // this.poliA=new Extra(this,this.enemy,this.lvM,true,true,2200,300);
        // this.poliB=new Extra(this,this.enemy,this.lvM,true,true,2500,300);
        // this.poliC=new Extra(this,this.enemy,this.lvM,true,true,2700,300);
        // this.poliD=new Extra(this,this.enemy,this.lvM,true,true,2900,300);
        // this.poliE=new Extra(this,this.enemy,this.lvM,true,true,3000,300);
        // this.poliF=new Extra(this,this.enemy,this.lvM,true,true,3200,300);
        // this.poli10=new Extra(this,this.enemy,this.lvM,true,true,3300,300);
        // this.poli11=new Extra(this,this.enemy,this.lvM,true,true,3700,300);
        // this.poli12=new Extra(this,this.enemy,this.lvM,true,true,3800,300);
        // this.poli13=new Extra(this,this.enemy,this.lvM,true,true,3900,300);
        // this.poli14=new Extra(this,this.enemy,this.lvM,true,true,4200,300);
        // this.poli15=new Extra(this,this.enemy,this.lvM,true,true,4100,300);
        // this.poli16=new Extra(this,this.enemy,this.lvM,true,true,4500,300);
        // this.poli17=new Extra(this,this.enemy,this.lvM,true,true,4700,300);
        // this.poli18=new Extra(this,this.enemy,this.lvM,true,true,4900,300);
        // this.poli19=new Extra(this,this.enemy,this.lvM,true,true,5200,300);
        // this.poli1A=new Extra(this,this.enemy,this.lvM,true,true,5300,300);
        // this.poli1B=new Extra(this,this.enemy,this.lvM,true,true,5500,300);
        // this.poli1C=new Extra(this,this.enemy,this.lvM,true,true,5700,300);
        // this.poli1D=new Extra(this,this.enemy,this.lvM,true,true,6000,300);
        // this.poli1E=new Extra(this,this.enemy,this.lvM,true,true,6200,300);
        // this.poli1F=new Extra(this,this.enemy,this.lvM,true,true,6300,300);
        // this.poli20=new Extra(this,this.enemy,this.lvM,true,true,6500,300);
        // this.poli21=new Extra(this,this.enemy,this.lvM,true,true,6700,300);

        // this.poli2.x=400;
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
       // this.physics.add.collider(this.bombas,this.background);
         this.physics.add.collider(this.extrasPolis,this.background);
        // this.physics.add.collider(this.HookGun,this.background);
        // this.physics.add.collider(this.movablePlatform,this.player);
        // this.physics.add.collider(this.bombas,this.bombWall);
        // this.physics.add.collider(this.player,this.bombWall);
        this.physics.add.collider(this.player,this.background);
        //Creamos los triggers y que pasará al meterse en dicho trigger
        //Puedo hacer llamadas a varios métodos en un mismo evento overlap
        // this.physics.add.overlap(this.player,this.bombas,this.PillarBomba,null,this);
        this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player);
        this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack);
        this.physics.add.overlap(this.player,this.antigravedad,this.player.changeModifierAntigravedad,null,this.player);
        this.physics.add.overlap(this.player,this.antigravedad,this.antigravedad.changeModifier,null,this.antigravedad);
        this.physics.add.overlap(this.player,this.keys,this.PillarLlave,null,this);
        
        
        //this.physics.add.overlap(this.player,this.HookGun,this.HookGun.PickGun,null,this.HookGun);
        this.physics.add.overlap(this.player,this.enemy,this.CatchPlayer,null,this);
        this.physics.add.overlap(this.player,this.enemy,this.Muerte2,null,this);
        //Dependiendo de si es un preso o un policia hay que hacerlo con el alcaide o el player pero solo con uno, para que un preso no estu
         this.physics.add.overlap(this.player,this.extrasPolis,this.PoliPilla,null,this);
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
       

          this.extrasPolis.children.iterate(function (child) {

            if(child != undefined)
            child.Update();  
        });
        this.camera.startFollow(this.player);


       // this.bombas.children.iterate(function (child) {

      //     if(child != undefined)
      //     child.Update();  
      // });
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