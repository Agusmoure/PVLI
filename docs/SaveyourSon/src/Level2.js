import Player from "./player.js";
import JetPack from "./jetpack.js";
import Enemy from "./enemy.js";
import Antigravedad from "./antigravedad.js";
import Key from "./Key.js";
import Bomba from "./bomb.js";
import GameManager from "./GameManager.js";
import Game from "./game.js";
import LevelManager from "./LevelManager.js";
import Extra from "./extra.js";
import HookGun from "./HookGun.js";
import MovableWall from "./movableWall.js";
import BombWall from "./bombWall.js";
import HUD from "./HUD.js";
import HookGunProyectile from "./HookGunProyectile.js"
import fondo from "./fondo.js"


export default class Level2 extends Game {

  constructor() {
    super( 'Level2');
  }
  preload() {
  super.preload();
  this.load.image('fondo2','./SaveyourSon/assets/Level2.jpg')
  this.load.tilemapTiledJSON('Nivel2', './SaveyourSon/assets/Nivel2.json');
  this.load.image('patronesTilemap', './SaveyourSon/assets/patrones.png');
}

create(data) {
  this.gM=data;
  this.fondo=new fondo(this,'fondo2').setScale(1.5);
  this.map = this.make.tilemap({ 
    key: 'Nivel2', 
      tileWidth: 64, 
      tileHeight: 64 
  }); 
  let t = this.map.addTilesetImage('Tileset', 'patronesTilemap');
  this.background= this.map.createStaticLayer('Nivel2', t);
  this.background.x=0;
  this.background.y=-1000;
  this.background.setCollisionBetween(0, 10);
  super.create();

    this.llaves = this.map.getObjectLayer('LLaves');
    this.llaves.objects.forEach(object => { 
      this.llave = new Key(this,object.x,object.y-1000,this.lvM).setScale(0.25);
      this.keys.add(this.llave);
    });
    this.player.changeModifierJetPack();
    this.lvM.HUD = this.Hud;
    this.jetpack = new JetPack(this);
    this.antigravedad = new Antigravedad(this);

    this.lvM.SetNumBombas(3);

    this.HookGun = new HookGun(this,this.lvM);

    this.keyCount=0;
    this.bomba = new Bomba(this,400,200,this.lvM,0);
    this.bomba2 = new Bomba(this,700,200,this.lvM,1);
    this.bombas.add(this.bomba)
    this.bombas.add(this.bomba2);


    //EXTRAS
    //this.poli=new Extra (this,500,100,'horizontal',0,50,100,this.lvM,true,true,100,300);
    // this.poli2=new Extra (this,800,100,'vertical',0,50,100,this.lvM,true,true,200,300);
    // this.poli3= new Extra(this,2800,300,'vertical',0,50,100,this.lvM,true,true,200,300);
    // this.poli4= new Extra(this,2800,610,'vertical',0,50,100,this.lvM,true,true,200,300);
    // this.poli5= new Extra(this,4700,300,'vertical',0,300,300,this.lvM,true,true,200,300);
    // this.poli6= new Extra(this,8400,400,'vertical',0,150,300,this.lvM,true,true,200,300);
    // this.poli7= new Extra(this,12300,1300,'horizontal',0,0,0,this.lvM,true,true,200,300);
    // this.poli8= new Extra(this,14520,650,'horizontal',0,100,200,this.lvM,true,true,200,300);
    // this.poli9= new Extra(this,16000,1000,'vertical',0,10,50,this.lvM,true,true,200,300);
    // this.poli10= new Extra(this,18600,1000,'vertical',0,50,100,this.lvM,true,true,200,300);
    // this.poli11= new Extra(this,22410,1000,'horizontal',0,50,100,this.lvM,true,true,200,300);
    // this.poli12= new Extra(this,25850,1150,'vertical',0,150,200,this.lvM,true,true,200,300);
    // this.poli13= new Extra(this,27800,1250,'vertical',0,75,200,this.lvM,true,true,200,300);
    // this.poli14= new Extra(this,27150,1250,'vertical',0,75,210,this.lvM,true,true,200,300);
    // this.poli15= new Extra(this,27500,1250,'vertical',0,75,205,this.lvM,true,true,200,300);
    // this.poli16= new Extra(this,30100,750,'vertical',0,25,100,this.lvM,true,true,200,300);
    // this.poli16= new Extra(this,30100,750,'vertical',0,25,100,this.lvM,true,true,200,300);
    // this.poli17= new Extra(this,34650,1800,'vertical',0,25,100,this.lvM,true,true,200,300);
    // this.poli17= new Extra(this,35175,1800,'horizontal',0,0,0,this.lvM,true,true,200,300);
    // this.poli18= new Extra(this,37075,1920,'vertical',0,25,100,this.lvM,true,true,200,300);
    // this.poli19= new Extra(this,38670,1920,'horizontal',0,0,0,this.lvM,true,true,200,300);
    // this.poli20= new Extra(this,17650,1000,'horizontal',0,0,0,this.lvM,true,true,200,300);


    // //this.extrasPolis.add(this.poli);
    // this.extrasPolis.add(this.poli2);
    // this.extrasPolis.add(this.poli3);
    // this.extrasPolis.add(this.poli4);
    // this.extrasPolis.add(this.poli5);
    // this.extrasPolis.add(this.poli6);
    // this.extrasPolis.add(this.poli7);
    // this.extrasPolis.add(this.poli8);
    // this.extrasPolis.add(this.poli9);
    // this.extrasPolis.add(this.poli10);
    // this.extrasPolis.add(this.poli11);
    // this.extrasPolis.add(this.poli12);
    // this.extrasPolis.add(this.poli13);
    // this.extrasPolis.add(this.poli14);
    // this.extrasPolis.add(this.poli15);
    // this.extrasPolis.add(this.poli16);
    // this.extrasPolis.add(this.poli17);
    // this.extrasPolis.add(this.poli18);
    // this.extrasPolis.add(this.poli19);
    // this.extrasPolis.add(this.poli20);
    this.extrasPolis.children.iterate(function (child) {

      if(child != undefined)
      child.SetAnim();  
  });

  this.poliHorizontal = this.map.getObjectLayer('PoliHorizontalSlow');
  this.poliHorizontal.objects.forEach(object => { 
    this.policia = new Extra(this,object.x,object.y-1000,'horizontal',-1,100,200,this.lvM,false,true,125,200);
    this.policia.SetAnim();
    this.extrasPolis.add(this.policia);
  });
  this.poliHorizontalStun = this.map.getObjectLayer('PoliHorizontalStun');
  this.poliHorizontalStun.objects.forEach(object => { 
    this.policia = new Extra(this,object.x,object.y-1000,'horizontal',-1,75,125,this.lvM,true,true,40,200);
    this.policia.SetAnim();
    this.extrasPolis.add(this.policia);
  });

  this.poliVertical = this.map.getObjectLayer('PoliVerticalSlow');
  this.poliVertical.objects.forEach(object => { 
    this.policia = new Extra(this,object.x,object.y-1000,'vertical',-1,100,200,this.lvM,false,true,125,200);
    this.policia.SetAnim();
    this.extrasPolis.add(this.policia);
  });
  this.poliVerticalStun = this.map.getObjectLayer('PoliVerticalStun');
  this.poliVerticalStun.objects.forEach(object => { 
    this.policia = new Extra(this,object.x,object.y-1000,'vertical',-1,75,125,this.lvM,true,true,40,200);
    this.policia.SetAnim();
    this.extrasPolis.add(this.policia);
  });

    this.presosMapa = this.map.getObjectLayer('PresosStun');
    this.presosMapa.objects.forEach(object => { 
      this.preso = new Extra(this,object.x,object.y-1000,'horizontal',-1,100,200,this.lvM,true,false,200,200);
      this.preso.SetAnim();
      this.Presos.add(this.preso);
    });
    
    this.presosSlowMapa = this.map.getObjectLayer('PresosSlow');
    this.presosSlowMapa.objects.forEach(object => { 
      this.presoslow = new Extra(this,object.x,object.y-1000,'horizontal',-1,100,200,this.lvM,false,false,200,200);
      this.presoslow.SetAnim();
      this.Presos.add(this.presoslow);
    });

    this.contador=0;
    this.BombasMap =this.map.getObjectLayer('Bombas');
    this.BombasMap.objects.forEach(object => { 
      this.bomba = new Bomba(this,object.x,object.y-1000,this.lvM,this.contador);
      this.contador++;
   
      this.bombas.add(this.bomba);
    });
    this.lvM.SetNumBombas(this.contador);
    
    this.proyectil=undefined;
  

    this.HookGunProyectile=new HookGunProyectile(this,LevelManager,0,0,-89999,-89999);
this.HookGunProyectiles.add(this.HookGunProyectile);
   //Creo plataformas random
    //Paredes destructibles

    //Suelo para el alcaide
    //this.floor = this.physics.add.staticGroup();
    //this.physics.add.collider(this.enemy, this.floor);




   super.Colliders();
    

    //Puedo hacer llamadas a varios métodos en un mismo evento overlap
    super.Overlaps()
    //Dependiendo de si es un preso o un policia hay que hacerlo con el alcaide o el player pero solo con uno, para que un preso no estu
   
    this.physics.add.overlap(this.enemy,this.Presos,this.PresoPilla,null,this);
  }

  update(time, delta) {
    this.fondo.Update(this.player);
    super.update();
  }
}