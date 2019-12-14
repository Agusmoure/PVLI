import Player from "./player.js";
import JetPack from "./jetpack.js";
import Enemy from "./enemy.js";
import Antigravedad from "./antigravedad.js";
import Key from "./Key.js";
import Bomba from "./bomb.js";
import GameManager from "./GameManager.js";
import Game from "./Game.js";
import LevelManager from "./LevelManager.js";
import Extra from "./extra.js";
import HookGun from "./HookGun.js";
//import HookGunProyectile from "./HookGunProyectile.js"
import MovableWall from "./movableWall.js";
import BombWall from "./bombWall.js";
import HUD from "./HUD.js";
import HookGunProyectile from "./HookGunProyectile.js"

export default class Level2 extends Game {

  constructor() {
    super(/*{ key: 'main' }*/ 'Level2');
    this.gameOver=false;
    this.gM= new GameManager();
   // this.lvM = new LevelManager();
  }
  preload() {
  super.preload();
  this.load.tilemapTiledJSON('Nivel2', '/SaveyourSon/assets/Nivel2.json');
  this.load.image('patronesTilemap', '/SaveyourSon/assets/patrones.png');
  }

  create() {
    this.map = this.make.tilemap({ 
      key: 'Nivel2', 
        tileWidth: 64, 
        tileHeight: 64 
    });
    this.keys= this.physics.add.group();
    this.llaves = this.map.getObjectLayer('LLaves');
    
    this.llaves.objects.forEach(object => { 
      this.llave = new Key(this,object.x,object.y-1000,this.lvM).setScale(0.25);
      this.keys.add(this.llave);
    });
    let t = this.map.addTilesetImage('Tileset', 'patronesTilemap');
    this.background= this.map.createStaticLayer('Nivel2', t);
    this.background.x=0;
    this.background.y=-1000;
    this.background.setCollisionBetween(0, 10);
    super.create();
    this.lvM.HUD = this.Hud;
    this.jetpack = new JetPack(this);
    this.antigravedad = new Antigravedad(this);

    this.lvM.SetNumBombas(3);
    this.key= new Key(this,700,300,this.lvM).setScale(0.25);
    this.key1= new Key(this,900,0,this.lvM).setScale(0.25);
    this.key2= new Key(this,100,300,this.lvM).setScale(0.25);
    this.key3= new Key(this,600,300,this.lvM).setScale(0.25);
    this.key4= new Key(this,1000,300,this.lvM).setScale(0.25);
    this.key5= new Key(this,5700,150,this.lvM).setScale(0.25); // definitiva
    this.key6= new Key(this,12500,500,this.lvM).setScale(0.25); // definitiva
    this.key7= new Key(this,16000,500,this.lvM).setScale(0.25); // definitiva
    this.key8= new Key(this,26500,150,this.lvM).setScale(0.25); // definitiva
    this.key8= new Key(this,34600,500,this.lvM).setScale(0.25); // definitiva
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

    this.HookGun = new HookGun(this,this.lvM);

    this.keyCount=0;
    this.bombas = this.physics.add.group();
    this.bomba = new Bomba(this,400,200,this.lvM,0);
    this.bomba2 = new Bomba(this,700,200,this.lvM,1);
    this.bombas.add(this.bomba)
    this.bombas.add(this.bomba2);


    //EXTRAS
    this.poli=new Extra (this,500,100,'horizontal',0,50,100,this.lvM,true,true,100,300);
    this.poli2=new Extra (this,800,100,'vertical',0,50,100,this.lvM,true,true,200,300);
    this.poli3= new Extra(this,2800,300,'vertical',0,50,100,this.lvM,true,true,200,300);
    this.poli4= new Extra(this,2800,610,'vertical',0,50,100,this.lvM,true,true,200,300);
    this.poli5= new Extra(this,4700,300,'vertical',0,300,300,this.lvM,true,true,200,300);
    this.poli6= new Extra(this,8400,400,'vertical',0,150,300,this.lvM,true,true,200,300);
    this.poli7= new Extra(this,12300,1300,'horizontal',0,0,0,this.lvM,true,true,200,300);
    this.poli8= new Extra(this,14520,650,'horizontal',0,100,200,this.lvM,true,true,200,300);
    this.poli9= new Extra(this,16000,1000,'vertical',0,10,50,this.lvM,true,true,200,300);
    this.poli10= new Extra(this,18600,1000,'vertical',0,50,100,this.lvM,true,true,200,300);
    this.poli11= new Extra(this,22410,1000,'horizontal',0,50,100,this.lvM,true,true,200,300);
    this.poli12= new Extra(this,25850,1150,'vertical',0,150,200,this.lvM,true,true,200,300);
    this.poli13= new Extra(this,27800,1250,'vertical',0,75,200,this.lvM,true,true,200,300);
    this.poli14= new Extra(this,27150,1250,'vertical',0,75,210,this.lvM,true,true,200,300);
    this.poli15= new Extra(this,27500,1250,'vertical',0,75,205,this.lvM,true,true,200,300);
    this.poli16= new Extra(this,30100,750,'vertical',0,25,100,this.lvM,true,true,200,300);
    this.poli16= new Extra(this,30100,750,'vertical',0,25,100,this.lvM,true,true,200,300);
    this.poli17= new Extra(this,34650,1800,'vertical',0,25,100,this.lvM,true,true,200,300);
    this.poli17= new Extra(this,35175,1800,'horizontal',0,0,0,this.lvM,true,true,200,300);
    this.poli18= new Extra(this,37075,1920,'vertical',0,25,100,this.lvM,true,true,200,300);
    this.poli19= new Extra(this,38670,1920,'horizontal',0,0,0,this.lvM,true,true,200,300);
    this.poli20= new Extra(this,17650,1000,'horizontal',0,0,0,this.lvM,true,true,200,300);



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
  //   this.extrasPolis.children.iterate(function (child) {

  //     if(child != undefined)
  //     child.SetAnim();  
  // });

    this.Presos = this.physics.add.group();
    this.presosMapa = this.map.getObjectLayer('Presos');
    
    this.presosMapa.objects.forEach(object => { 
      this.preso = new Extra(this,object.x,object.y-1000,'horizontal',-1,100,100,this.lvM,true,false,200,200).setScale(0.25);
      this.preso.SetAnim();
      this.Presos.add(this.preso);
    });
    
    // this.preso = new Extra(this,500,100,'horizontal',-1,50,100,this.lvM,true,false,300,300);
    // this.Presos.add(this.preso);
    this.proyectil=undefined;
    this.HookGunProyectile=new HookGunProyectile(this,LevelManager,0,0,-89999,-89999);
this.HookGunProyectiles= this.physics.add.group();
this.HookGunProyectiles.add(this.HookGunProyectile);
   //Creo plataformas random




    

    //Paredes destructibles
    this.bombWall = new BombWall(this,750,700);
    this.lvM.bombWalls= new Array();
    this.lvM.bombWalls[0]= this.bombWall;

    //Suelo para el alcaide
    //this.floor = this.physics.add.staticGroup();
    //this.physics.add.collider(this.enemy, this.floor);




   super.Colliders();
    this.physics.add.collider(this.bombas,this.bombWall);
    this.physics.add.collider(this.player,this.bombWall);


    // this.physics.add.collider(this.enemy,this.player);
    // this.physics.add.collider(this.enemy,this.player,this.CatchPlayer,null,this.enemy);


    //Puedo hacer llamadas a varios métodos en un mismo evento overlap
    super.Overlaps()
    //Dependiendo de si es un preso o un policia hay que hacerlo con el alcaide o el player pero solo con uno, para que un preso no estu
   
    this.physics.add.overlap(this.enemy,this.Presos,this.PresoPilla,null,this);




  }

  update(time, delta) {
    super.update();
  }
}