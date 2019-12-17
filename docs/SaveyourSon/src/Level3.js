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
import Preso from "./preso.js";
import Poli from "./poli.js";
import HookGun from "./HookGun.js";
import HookGunProyectile from "./HookGunProyectile.js"
import MovableWall from "./movableWall.js";
import BombWall from "./bombWall.js";
import HUD from "./HUD.js";
import Game from "./game.js"
import fondo from "./fondo.js"
import NoPowerUp from "./NoPowerUp.js";
import LevelChanger from "./LevelChanger.js"


export default class Level3 extends Game {

  constructor() {
    super(/*{ key: 'main' }*/  'Level3');
    this.gM=new GameManager();

  }
  preload() {
super.preload();
this.load.image('fondo3','./SaveyourSon/assets/Level3.jpg')
this.load.image('door','./SaveyourSon/assets/ExitDoor.png');

this.load.tilemapTiledJSON('Nivel3', './SaveyourSon/assets/Nivel3.json');
this.load.image('patronesTilemap', './SaveyourSon/assets/patrones.png');
  }
  
  create(data) {
    //this.gM=data;
    this.fondo=new fondo(this,'fondo3')/*.setScale(0.2)*/;

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
    this.door= new LevelChanger(this,this.gM,this.lvM,58600,500).setScale(0.5);

    this.llaves = this.map.getObjectLayer('Llaves');
    this.llaves.objects.forEach(object => { 
      this.llave = new Key(this,object.x,object.y-1000,this.lvM).setScale(0.25);
      this.keys.add(this.llave);
    });
    this.poliHorizontal = this.map.getObjectLayer('PoliHorizontalSlow');
    this.poliHorizontal.objects.forEach(object => { 
      this.policia = new Poli(this,object.x,object.y-1000,'horizontal',100,200,this.lvM,false,125);
      this.policia.SetAnim();
      this.extrasPolis.add(this.policia);
    });
    this.poliHorizontalStun = this.map.getObjectLayer('PoliHorizontalStun');
    this.poliHorizontalStun.objects.forEach(object => { 
      this.policia = new Poli(this,object.x,object.y-1000,'horizontal',75,125,this.lvM,true,40);
      this.policia.SetAnim();
      this.extrasPolis.add(this.policia);
    });
  
    this.poliVertical = this.map.getObjectLayer('PoliVerticalSlow');
    this.poliVertical.objects.forEach(object => { 
      this.policia = new Poli(this,object.x,object.y-1000,'vertical',100,200,this.lvM,false,125);
      this.policia.SetAnim();
      this.extrasPolis.add(this.policia);
    });
    this.poliVerticalStun = this.map.getObjectLayer('PoliVerticalStun');
    this.poliVerticalStun.objects.forEach(object => { 
     // (scene,oX,oY,movimiento,amplitud,velocidad,levelManager,stunear,tiempopenal)
      this.policia = new Poli(this,object.x,object.y-1000,'vertical',75,125,this.lvM,true,40);
      this.policia.SetAnim();
      this.extrasPolis.add(this.policia);
    });
  
      this.presosMapa = this.map.getObjectLayer('PresosStun');
      this.presosMapa.objects.forEach(object => { 
        this.preso = new Preso(this,object.x,object.y-1000,100,200,this.lvM,true,200,200);
        this.preso.SetAnim();
        this.Presos.add(this.preso);
      });
      
      this.presosSlowMapa = this.map.getObjectLayer('PresosSlow');
      this.presosSlowMapa.objects.forEach(object => { 
        this.presoslow = new Preso(this,object.x,object.y-1000,100,200,this.lvM,false,200,200);
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
    this.jetpack = new JetPack(this,24800,1000);
    this.antigravedad = new Antigravedad(this,13100,-130).setScale(0.35);
    this.HookGun = new HookGun(this,this.lvM,34500,800);
this.noPowerUp = new NoPowerUp(this,49600,1250,this.lvM);
    
    this.player.changeModifierJetPack();
    this.player.x=500;
    this.player.y=0;
    this.player.oX=500;
    this.player.oY=0;
    this.enemy.x=0;
    this.enemy.y=0;
    this.enemy.oX=0;
    this.enemy.oY=0;



    this.keyCount=0;
    
    //this.background2.setScale(0.1);

    
    this.extrasPolis.children.iterate(function (child) {

      if(child != undefined)
      child.SetAnim();  
  });
    this.preso = new Extra(this,500,100,'horizontal',-1,50,100,this.lvM,true,false,300,300);
    //this.Presos = this.physics.add.group();
    this.Presos.add(this.preso);
    this.Presos.children.iterate(function (child) {
      if(child != undefined)
      child.SetAnim();  
  });    

    super.Colliders();
    this.physics.add.collider(this.background,this.door);
        super.Overlaps();
        this.physics.add.overlap(this.player,this.door,this.door.ChangeLevel,null,this);
    this.physics.add.overlap(this.player,this.extrasPolis,this.PoliPilla,null,this);
    this.physics.add.overlap(this.enemy,this.Presos,this.PresoPilla,null,this);
    this.physics.add.overlap(this.player,this.noPowerUp,this.NoPower,null,this);

  }

  update(time, delta) {  
    this.fondo.Update(this.player);
    super.update(); 
  }
  NoPower(player, noPowerUp){       //Devuelvo al player al estado de normal
    player.changeModifierNormal();
    noPowerUp.PickMe();
  }

  Restart(){
    // this.backtoNormal.destroy();
    // this.backtoNormal = new NoPowerUp(this,30400,900,this.lvM);
    // this.physics.add.collider(this.backtoNormal,this.background);
    // this.physics.add.overlap(this.player,this.backtoNormal,this.NoPower,null,this);
    this.HookGun.destroy();
    this.HookGun = new HookGun(this,this.lvM,34500,800);
    this.physics.add.overlap(this.player,this.HookGun,this.player.changeModifierGancho,null,this.player);
    this.physics.add.overlap(this.player,this.HookGun,this.HookGun.changeModifier,null,this.HookGun);
    this.physics.add.collider(this.HookGun,this.background);

    this.jetpack.destroy();
    this.jetpack = new JetPack(this,24800,1000);
    this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player);
    this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack);
    this.physics.add.collider(this.jetpack,this.background);

    this.antigravedad.destroy();
    this.antigravedad = new Antigravedad(this,13100,-130).setScale(0.35);
    this.physics.add.overlap(this.player,this.antigravedad,this.player.changeModifierAntigravedad,null,this.player);
    this.physics.add.overlap(this.player,this.antigravedad,this.antigravedad.changeModifier,null,this.antigravedad);
    this.physics.add.collider(this.antigravedad,this.background);

    this.enemy.Restart();
    this.player.Restart('jetpack');
  }
}