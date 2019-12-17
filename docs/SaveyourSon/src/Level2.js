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
import NoPowerUp from "./NoPowerUp.js";
import LevelChanger from "./LevelChanger.js"


export default class Level2 extends Game {

  constructor() {
    super('Level2');
    this.gM= new GameManager();
  }
  preload() {
  super.preload();
    this.load.image('door','./SaveyourSon/assets/ExitDoor.png');
    // this.load.image('fondo2','./SaveyourSon/assets/Level2.jpg');
  this.load.tilemapTiledJSON('Nivel2', './SaveyourSon/assets/Nivel2.json');
  this.load.image('patronesTilemap', './SaveyourSon/assets/patrones.png');
}

create(/*data*/) {
  //this.gM=data;
  // this.fondo=new fondo(this,'fondo2').setScale(1.5);

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
    this.player.x=500;
    this.player.y=500;
    this.player.oX=500;
    this.player.oY=500;
    this.enemy.x=0;
    this.enemy.y=500;
    this.enemy.oX=0;
    this.enemy.oY=500;

    this.lvM.HUD = this.Hud;
    this.jetpack = new JetPack(this);
    this.antigravedad = new Antigravedad(this);

    this.lvM.SetNumBombas(3);

    this.HookGun = new HookGun(this,this.lvM,100,100);

    this.keyCount=0;
    this.door= new LevelChanger(this,this.gM,this.lvM,41600,100).setScale(0.5);




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
    this.backtoNormal2 = new NoPowerUp(this,10120,550,this.lvM);
  this.backtoNormal = new NoPowerUp(this,30500,1300,this.lvM);
  this.gancho =new HookGun(this,this.lvM,19600,1350);
  

    this.HookGunProyectile=new HookGunProyectile(this,LevelManager,0,0,-89999,-89999);
this.HookGunProyectiles.add(this.HookGunProyectile);

   super.Colliders();
   this.physics.add.collider(this.background,this.door);
   super.Overlaps();
   this.physics.add.overlap(this.player,this.door,this.door.ChangeLevel,null,this);
   this.physics.add.collider(this.gancho,this.background);
   this.physics.add.collider(this.backtoNormal,this.background);
   this.physics.add.overlap(this.player,this.backtoNormal,this.NoPower,null,this);
    this.physics.add.overlap(this.enemy,this.Presos,this.PresoPilla,null,this);
    this.physics.add.overlap(this.player,this.backtoNormal2,this.NoPower,null,this);
    this.physics.add.overlap(this.player,this.gancho,this.GetGancho,null,this);
  }

  update(time, delta) {
    //this.fondo.Update(this.player);
    super.update();
  }
  NoPower(player, noPowerUp){       //Devuelvo al player al estado de normal
    player.changeModifierNormal();
    noPowerUp.PickMe();
  }

  GetGancho(player,gancho){
    player.changeModifierGancho();
  gancho.PickMe();
  }


  Restart(){

    // this.backtoNormal.destroy();
    // this.backtoNormal = new NoPowerUp(this,30400,900,this.lvM);
    // this.physics.add.collider(this.backtoNormal,this.background);
    // this.physics.add.overlap(this.player,this.backtoNormal,this.NoPower,null,this);
    this.gancho.destroy();
    this.gancho = new HookGun(this,this.lvM,19600,1350);
    this.physics.add.overlap(this.player,this.gancho,this.player.changeModifierGancho,null,this.player);
    this.physics.add.overlap(this.player,this.gancho,this.gancho.changeModifier,null,this.gancho);
    this.physics.add.collider(this.gancho,this.background);
    this.enemy.Restart();
    this.player.Restart('jetpack');
  }
}