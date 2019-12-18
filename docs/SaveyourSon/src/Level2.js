//realizmaos todos los imports
import JetPack from "./jetpack.js";
import Antigravedad from "./antigravedad.js";
import Key from "./Key.js";
import Bomba from "./bomb.js";
import GameManager from "./GameManager.js";
import Game from "./game.js";
import LevelManager from "./LevelManager.js";
import Poli from "./poli.js";
import Preso from "./preso.js"
import HookGun from "./HookGun.js";
import HookGunProyectile from "./HookGunProyectile.js"
import fondo from "./fondo.js"
import NoPowerUp from "./NoPowerUp.js";
import LevelChanger from "./LevelChanger.js"


export default class Level2 extends Game {

  constructor() {
    super('Level2');
  }
    //Preload de esta escena
  preload() {
      //llamos al preload de game.js
  super.preload();
//Hacemos load de las imagenes que unicamente requiere este nivel y del tilemap de este nivel
    this.load.image('fondo2','./SaveyourSon/assets/Level2.png');
  this.load.tilemapTiledJSON('Nivel2', './SaveyourSon/assets/Nivel2.json');
  this.load.image('patronesTilemap', './SaveyourSon/assets/patrones.png');
}
//Create de esta escena
create(data) {
  this.gM=data;
  //Creamos el fondo para que este al fondo de todo
  this.fondo=new fondo(this,'fondo2').setScale(1.5);
//Creamos el Tilemap
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
      //llamamos al metodo create del padre
  super.create();
//seteamos una serie de variables de este nivel y los modifiers
    this.player.changeModifierJetPack();
    this.player.x=500;
    this.player.y=400;
    this.player.oX=200;
    this.player.oY=400;
    this.enemy.x=0;
    this.enemy.y=500;
    this.enemy.oX=0;
    this.enemy.oY=500;

    this.lvM.HUD = this.Hud;
    this.jetpack = new JetPack(this,-1000,-1000);
    this.antigravedad = new Antigravedad(this,-1000,-1000);

    this.lvM.SetNumBombas(3);

    this.HookGun = new HookGun(this,this.lvM,-999999900,100);

    this.keyCount=0;
    this.door= new LevelChanger(this,this.gM,this.lvM,41600,100).setScale(0.5);
//con el tilemap y las posiciones que en él hemos guardado creamos las llaves, bombas, enemigos, presos

this.llaves = this.map.getObjectLayer('LLaves');
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
    
    this.proyectil=undefined;
    this.backtoNormal2 = new NoPowerUp(this,10120,550,this.lvM);
  this.backtoNormal = new NoPowerUp(this,30500,1300,this.lvM);
  this.gancho =new HookGun(this,this.lvM,19600,1350).setScale(0.2);
  

    this.HookGunProyectile=new HookGunProyectile(this,LevelManager,0,0,-89999,-89999);
this.HookGunProyectiles.add(this.HookGunProyectile);
//metodos collider y overlap del padre
   super.Colliders();
   super.Overlaps();
   this.physics.add.collider(this.gancho,this.background);
   this.physics.add.collider(this.backtoNormal2,this.background);
    this.physics.add.overlap(this.player,this.backtoNormal2,this.NoPower,null,this);
  //   this.physics.add.overlap(this.player,this.gancho,this.GetGancho,null,this);
  }
//metodo update
  update(time, delta) {
    super.update();
  }
  NoPower(player, noPowerUp){       //Devuelvo al player al estado de normal
    player.changeModifierNormal();
    this.bombas.children.iterate(function (child) {
      if(child != undefined)
      child.Restart();
    });
  }
//cambia el modifier a gancho y destruye el gancho
  GetGancho(player,gancho){
    player.changeModifierGancho();
  gancho.PickMe();
  }

//reinicia el nivel
  Restart(){
    this.gancho.destroy();
    this.gancho = new HookGun(this,this.lvM,19600,1350);
    this.physics.add.overlap(this.player,this.gancho,this.player.changeModifierGancho,null,this.player);
    this.physics.add.overlap(this.player,this.gancho,this.gancho.changeModifier,null,this.gancho);
    this.physics.add.collider(this.gancho,this.background);
    this.enemy.Restart();
    this.player.Restart('jetpack');
    this.bombas.children.iterate(function (child) {
      if(child != undefined)
      child.Restart();
  });

  }
}