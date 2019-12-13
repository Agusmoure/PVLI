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
import LevelChanger from "./LevelChanger.js"
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
      this.load.image('hookHUD','/SaveyourSon/assets/HookGun.png');
      this.load.image('playerHUD','/SaveyourSon/assets/botonNivel.png');
      this.load.image('door','/SaveyourSon/assets/ExitDoor.png');
      this.load.image('modifierNoDisponible','/SaveyourSon/assets/ModifierNoDisponible.png');
      this.load.image('meta','/SaveyourSon/assets/Meta.png');
      this.load.image('interfazModifier','/SaveyourSon/assets/InterfazModifier.png');
      this.load.image('iconoPlayer','/SaveyourSon/assets/IconoPlayer.png');
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
       this.load.audio('PlayerHit','/SaveyourSon/assets/Sonidos/PlayerAlSerPillado.wav');
       this.load.audio('Antigravedad', '/SaveyourSon/assets/Sonidos/Antigravedad.wav');
       this.load.audio('CojerLlave', '/SaveyourSon/assets/Sonidos/KeysCortado.wav');
       this.load.audio('Salto', '/SaveyourSon/assets/Sonidos/Salto.wav');
       this.load.audio('PlayerTouched', '/SaveyourSon/assets/Sonidos/PlayerTouched.wav');
       this.load.audio('AlcaideTouched', '/SaveyourSon/assets/Sonidos/AlcaideTouched.wav');
       this.load.audio('Jetpack', '/SaveyourSon/assets/Sonidos/Jetpack.wav');
       this.load.audio('JetpackNoFuel', '/SaveyourSon/assets/Sonidos/JetpackNoFuel.wav');
       this.load.audio('PickUpItem', '/SaveyourSon/assets/Sonidos/PickUpItem.wav');

      }
      create() {

        //creamos el HUD y establecemos que el juego no esta pausado
        this.Hud = new HUD(this,0,0,this.lvM,39800);
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
        this.door= new LevelChanger(this,this.gM,this.lvM,40600,200).setScale(0.5);
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
        this.key2D= new Key(this,17400,300,this.lvM).setScale(0.25);
        this.key2E= new Key(this,17500,300,this.lvM).setScale(0.25);
        this.key2F= new Key(this,17600,300,this.lvM).setScale(0.25);
        this.key30= new Key(this,17700,300,this.lvM).setScale(0.25);
        this.key31= new Key(this,18670,300,this.lvM).setScale(0.25);
        this.key32= new Key(this,18680,300,this.lvM).setScale(0.25);
        this.key33= new Key(this,19060,300,this.lvM).setScale(0.25);
        this.key34= new Key(this,19150,300,this.lvM).setScale(0.25);
        this.key35= new Key(this,19700,300,this.lvM).setScale(0.25);
        this.key36= new Key(this,19800,300,this.lvM).setScale(0.25);
        this.key37= new Key(this,19900,300,this.lvM).setScale(0.25);
        this.key38= new Key(this,20000,300,this.lvM).setScale(0.25);
        this.key39= new Key(this,20100,300,this.lvM).setScale(0.25);
        this.key3A= new Key(this,22300,500,this.lvM).setScale(0.25);
        this.key3B= new Key(this,22400,500,this.lvM).setScale(0.25);
        this.key3C= new Key(this,22500,500,this.lvM).setScale(0.25);
        this.key3D= new Key(this,22600,500,this.lvM).setScale(0.25);
        this.key3F= new Key(this,22700,500,this.lvM).setScale(0.25);
        this.key40= new Key(this,24045,500,this.lvM).setScale(0.25);
        this.key41= new Key(this,24145,500,this.lvM).setScale(0.25);
        this.key42= new Key(this,24320,500,this.lvM).setScale(0.25);
        this.key43= new Key(this,24420,500,this.lvM).setScale(0.25);
        this.key44= new Key(this,25810,500,this.lvM).setScale(0.25);
        this.key45= new Key(this,26050,500,this.lvM).setScale(0.25);
        this.key46= new Key(this,26280,500,this.lvM).setScale(0.25);
        this.key47= new Key(this,26580,500,this.lvM).setScale(0.25);
        this.key48= new Key(this,26850,500,this.lvM).setScale(0.25);
        this.key49= new Key(this,27055,500,this.lvM).setScale(0.25);
        this.key4A= new Key(this,27345,500,this.lvM).setScale(0.25);
        this.key4B= new Key(this,27600,500,this.lvM).setScale(0.25);
        this.key4C= new Key(this,27820,500,this.lvM).setScale(0.25);
        this.key4D= new Key(this,28600,500,this.lvM).setScale(0.25);
        this.key4E= new Key(this,28720,100,this.lvM).setScale(0.25);
        this.key4F= new Key(this,28820,100,this.lvM).setScale(0.25);
        this.key50= new Key(this,28975,100,this.lvM).setScale(0.25);
        this.key51= new Key(this,29075,100,this.lvM).setScale(0.25);
        this.key52= new Key(this,29230,100,this.lvM).setScale(0.25);
        this.key53= new Key(this,29330,100,this.lvM).setScale(0.25);
        this.key54= new Key(this,29480,100,this.lvM).setScale(0.25);
        this.key55= new Key(this,29585,100,this.lvM).setScale(0.25);
        this.key56= new Key(this,29740,100,this.lvM).setScale(0.25);
        this.key57= new Key(this,29840,100,this.lvM).setScale(0.25);
        this.key58= new Key(this,32160,100,this.lvM).setScale(0.25);
        this.key59= new Key(this,28820,100,this.lvM).setScale(0.25);
        this.key5A= new Key(this,28820,100,this.lvM).setScale(0.25);
        this.key5B= new Key(this,33040,100,this.lvM).setScale(0.25);
        this.key5C= new Key(this,33130,100,this.lvM).setScale(0.25);
        this.key5D= new Key(this,35520,100,this.lvM).setScale(0.25);
        this.key5E= new Key(this,35720,100,this.lvM).setScale(0.25);
        this.key5F= new Key(this,38720,100,this.lvM).setScale(0.25);

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
        this.keys.add(this.key2D);
        this.keys.add(this.key2E);
        this.keys.add(this.key2F);
        this.keys.add(this.key30);
        this.keys.add(this.key31);
        this.keys.add(this.key32);
        this.keys.add(this.key33);
        this.keys.add(this.key34);
        this.keys.add(this.key35);
        this.keys.add(this.key36);
        this.keys.add(this.key37);
        this.keys.add(this.key38);
        this.keys.add(this.key39);
        this.keys.add(this.key3A);
        this.keys.add(this.key3B);
        this.keys.add(this.key3C);
        this.keys.add(this.key3D);
        this.keys.add(this.key3F);
        this.keys.add(this.key40);
        this.keys.add(this.key41);
        this.keys.add(this.key42);
        this.keys.add(this.key43);
        this.keys.add(this.key44);
        this.keys.add(this.key45);
        this.keys.add(this.key46);
        this.keys.add(this.key47);
        this.keys.add(this.key48);
        this.keys.add(this.key49);
        this.keys.add(this.key4A);
        this.keys.add(this.key4B);
        this.keys.add(this.key4C);
        this.keys.add(this.key4D);
        this.keys.add(this.key4E);
        this.keys.add(this.key4F);
        this.keys.add(this.key50);
        this.keys.add(this.key51);
        this.keys.add(this.key52);
        this.keys.add(this.key53);
        this.keys.add(this.key54);
        this.keys.add(this.key55);
        this.keys.add(this.key56);
        this.keys.add(this.key57);
        this.keys.add(this.key58);
        this.keys.add(this.key59);
        this.keys.add(this.key5A);
        this.keys.add(this.key5B);
        this.keys.add(this.key5C);
        this.keys.add(this.key5D);
        this.keys.add(this.key5E);
        this.keys.add(this.key5F);


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
    this.poli5 =new Extra (this,6000,825,'vertical',0,100,150,this.lvM,false,true,100,300);
    this.poli6 =new Extra (this,6300,825,'vertical',0,100,160,this.lvM,false,true,100,300);
    this.poli7 =new Extra (this,6600,825,'vertical',0,100,140,this.lvM,false,true,100,300);
    this.poli8 =new Extra (this,7925,650,'vertical',0,5,50,this.lvM,false,true,100,300);
    this.poli9 =new Extra (this,9850,780,'vertical',0,25,75,this.lvM,false,true,100,300);
    this.poli10 =new Extra (this,12000,400,'vertical',0,100,75,this.lvM,false,true,100,300);
    this.poli11 =new Extra (this,13000,300,'vertical',0,100,75,this.lvM,false,true,100,300);
    this.poli12 =new Extra (this,14000,300,'horizontal',0,100,75,this.lvM,false,true,100,300);
    this.poli13 =new Extra (this,14500,300,'horizontal',0,100,75,this.lvM,false,true,100,300);
    this.poli14 =new Extra (this,15500,300,'horizontal',0,100,75,this.lvM,false,true,100,300);
    this.poli15 =new Extra (this,16300,300,'vertical',0,100,75,this.lvM,false,true,100,300);
    this.poli16 =new Extra (this,20000,400,'vertical',0,75,75,this.lvM,false,true,100,300);
    this.poli17 =new Extra (this,20000,675,'vertical',0,75,75,this.lvM,false,true,100,300);
    this.poli18 =new Extra (this,20750,300,'vertical',0,20,75,this.lvM,false,true,100,300);
    this.poli19 =new Extra (this,20750,820,'vertical',0,20,75,this.lvM,false,true,100,300);
    this.poli20 =new Extra (this,24300,300,'horizontal',0,100,75,this.lvM,false,true,100,300);
    this.poli21 =new Extra (this,30050,500,'vertical',0,10,75,this.lvM,false,true,100,300);
    this.poli22 =new Extra (this,30150,500,'vertical',0,10,75,this.lvM,false,true,100,300);
    this.poli23 =new Extra (this,30250,500,'vertical',0,10,75,this.lvM,false,true,100,300);
    this.poli24 =new Extra (this,31750,500,'horizontal',0,100,75,this.lvM,false,true,100,300);
    this.poli25 =new Extra (this,33600,500,'horizontal',0,100,75,this.lvM,false,true,100,300);
    this.poli26 =new Extra (this,33600,850,'vertical',0,50,120,this.lvM,false,true,100,300);
    this.poli27 =new Extra (this,35700,250,'vertical',0,50,120,this.lvM,false,true,100,300);
    this.poli28 =new Extra (this,37450,750,'vertical',0,20,120,this.lvM,false,true,100,300);
    this.poli29 =new Extra (this,38700,800,'vertical',0,20,120,this.lvM,false,true,100,300);
    this.poli30 =new Extra (this,39200,700,'vertical',0,20,120,this.lvM,false,true,100,300);
    this.poli31 =new Extra (this,39300,700,'vertical',0,20,120,this.lvM,false,true,100,300);
    this.poli32 =new Extra (this,26050,700,'vertical',0,5,60,this.lvM,false,true,100,300);
    this.poli33 =new Extra (this,26450,400,'vertical',0,5,60,this.lvM,false,true,100,300);
    this.poli34 =new Extra (this,26850,700,'horizontal',0,5,0,this.lvM,false,true,100,300);
    this.poli35 =new Extra (this,27200,400,'horizontal',0,5,0,this.lvM,false,true,100,300);
    this.poli36 =new Extra (this,27200,300,'vertical',0,5,20,this.lvM,false,true,100,300);
    this.poli37 =new Extra (this,28200,500,'vertical',0,100,100,this.lvM,false,true,100,300);
    this.extrasPolis = this.physics.add.group();
    this.extrasPolis.add(this.poli);
    this.extrasPolis.add(this.poli1);
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
        this.physics.add.collider(this.door,this.background);
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
        this.physics.add.overlap(this.player,this.door,this.door.ChangeLevel,null,this);

        
        
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
        
          if(Phaser.Input.Keyboard.JustUp(this.cursors.up))
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