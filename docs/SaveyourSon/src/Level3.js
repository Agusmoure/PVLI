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
import HookGunProyectile from "./HookGunProyectile.js"
import MovableWall from "./movableWall.js";
import BombWall from "./bombWall.js";
import HUD from "./HUD.js";
import Game from "./game.js"
import fondo from "./fondo.js"


export default class Level3 extends Game {

  constructor() {
    super(/*{ key: 'main' }*/  'Level3');
    this.gM=new GameManager();
  }
  preload() {
super.preload();
this.load.image('fondo','./SaveyourSon/assets/Level3.jpg')

this.load.tilemapTiledJSON('Nivel3', './SaveyourSon/assets/Nivel3.json');
this.load.image('patronesTilemap', './SaveyourSon/assets/patrones.png');
  }
  
  create() {
    this.fondo=new fondo(this)/*.setScale(0.2)*/;

    this.map = this.make.tilemap({ 
      key: 'Nivel3', 
        tileWidth: 64, 
        tileHeight: 64 
    });
    
    let t = this.map.addTilesetImage('Tileset', 'patronesTilemap');
    this.background= this.map.createStaticLayer('Tile Layer 1', t);
    this.background.x=0;
    this.background.y=-1000;
    this.background.setCollisionBetween(0, 10);
    super.create();

    this.jetpack = new JetPack(this);
    this.antigravedad = new Antigravedad(this);
    this.lvM.SetNumBombas(3);
    
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
    this.lvM.SetNumBombas(3);
  
    this.bombas = this.physics.add.group();
    this.bomba = new Bomba(this,400,100,this.lvM,0);
    this.bomba2 = new Bomba(this,700,100,this.lvM,1);
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
    



   //Creo plataformas ran
    //Suelo para el alcaide
    //this.floor = this.physics.add.staticGroup();
    //this.physics.add.collider(this.enemy, this.floor);

    
    
    super.Colliders();

    super.Overlaps();
    this.physics.add.overlap(this.player,this.extrasPolis,this.PoliPilla,null,this);
    this.physics.add.overlap(this.enemy,this.Presos,this.PresoPilla,null,this);
  }

  update(time, delta) {  
    this.fondo.Update(this.player);
    super.update(); 
  }
}