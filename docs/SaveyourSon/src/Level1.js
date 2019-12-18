//realizamos los imports necesarios para el nivel
import JetPack from "./jetpack.js";
import Antigravedad from "./antigravedad.js";
import Key from "./Key.js";
import Bomba from "./bomb.js";
import GameManager from "./GameManager.js";
import Game from "./game.js";
import LevelChanger from "./LevelChanger.js"
import Poli from "./poli.js";
import Preso from "./preso.js";
import HookGun from "./HookGun.js";
import fondo from "./fondo.js"
import NoPowerUp from "./NoPowerUp.js";

//constructor de lvl1 en la que creamos el GM que nos acompañará a lo largo del juego
export default class Level1 extends Game {
    constructor(){
        super('Level1')
        this.gM=new GameManager();
    }
    //Preload de esta escena
    preload() {
      //llamos al preload de game.js
    super.preload();
//Hacemos load de las imagenes que unicamente requiere este nivel y del tilemap de este nivel
      this.load.image('fondo','./SaveyourSon/assets/Level1.jpg');
    this.load.tilemapTiledJSON('Nivel1', './SaveyourSon/assets/Nivel1.json');
    this.load.image('patronesTilemap', './SaveyourSon/assets/patrones.png');
      }
      //Create de esta escena
    create() {
      //Creamos el fondo para que este al fondo de todo
      this.fondo=new fondo(this,'fondo').setScale(1.7);
//Creamos el Tilemap
this.map = this.make.tilemap({ 
  key: 'Nivel1', 
  tileWidth: 64, 
  tileHeight: 64 
});
let t = this.map.addTilesetImage('Tileset', 'patronesTilemap');
this.background= this.map.createStaticLayer('Nivel1', t);
this.background.x=0;
this.background.y=0;
this.background.setCollisionBetween(0, 10);
      //llamamos al metodo create del padre
super.create()
//seteamos una serie de variables de este nivel
this.player.x=500;
this.player.y=900;
this.player.oX=500;
this.player.oY=900;
this.enemy.x=0;
this.enemy.y=900;
this.enemy.oX=0;
this.enemy.oY=900;
    //Creamos la puerta
this.door= new LevelChanger(this,this.gM,this.lvM,40600,100).setScale(0.5);

this.player.changeModifierNormal();
//con el tilemap y las posiciones que en él hemos guardado creamos las llaves, bombas, enemigos, presos
this.llaves = this.map.getObjectLayer('LLaves');
this.llaves.objects.forEach(object => { 
  this.llave = new Key(this,object.x,object.y,this.lvM).setScale(0.25);
  this.keys.add(this.llave);
  });
this.keyCount=0;        
this.bombas = this.physics.add.group();
this.bombitas=this.map.getObjectLayer('Bombas');
let x=0;
this.bombitas.objects.forEach(object => { 
  this.bombita = new Bomba(this,object.x,object.y,this.lvM,x);
  x++;
  this.bombas.add(this.bombita);
});

this.lvM.SetNumBombas(x);
this.poliHorizontal = this.map.getObjectLayer('PoliHorizontalSlow');
this.poliHorizontal.objects.forEach(object => { 
  this.policia = new Poli(this,object.x,object.y,'horizontal',100,200,this.lvM,false,125);
  this.policia.SetAnim();
  this.extrasPolis.add(this.policia);
});
this.poliHorizontalStun = this.map.getObjectLayer('PoliHorizontalStun');
this.poliHorizontalStun.objects.forEach(object => { 
  this.policia = new Poli(this,object.x,object.y,'horizontal',75,125,this.lvM,true,40);
  this.policia.SetAnim();
  this.extrasPolis.add(this.policia);
});

this.poliVertical = this.map.getObjectLayer('PoliVerticalSlow');
this.poliVertical.objects.forEach(object => { 
  this.policia = new Poli(this,object.x,object.y,'vertical',100,200,this.lvM,false,125);
  this.policia.SetAnim();
  this.extrasPolis.add(this.policia);
});
this.poliVerticalStun = this.map.getObjectLayer('PoliVerticalStun');
this.poliVerticalStun.objects.forEach(object => { 
  this.policia = new Poli(this,object.x,object.y,'vertical',75,125,this.lvM,true,40);
  this.policia.SetAnim();
  this.extrasPolis.add(this.policia);
});

  this.presosMapa = this.map.getObjectLayer('PresosStun');
  this.presosMapa.objects.forEach(object => { 
    this.preso = new Preso(this,object.x,object.y,100,200,this.lvM,true,200,200);
    this.preso.SetAnim();
    this.Presos.add(this.preso);
  });
  
  this.presosSlowMapa = this.map.getObjectLayer('PresosSlow');
  this.presosSlowMapa.objects.forEach(object => { 
    this.presoslow = new Preso(this,object.x,object.y,100,200,this.lvM,false,200,200);
    this.presoslow.SetAnim();
    this.Presos.add(this.presoslow);
  });
  //Creamos los modifier de este nivel
this.HookGun=new HookGun(this,this.lvM).setScale(0.2);
this.backtoNormal = new NoPowerUp(this,30400,900,this.lvM);
this.jetpack = new JetPack(this,8500,700).setScale(0.15);
this.antigravedad = new Antigravedad(this,18000,150).setScale(0.35);
        //llamamos al metodo Collider y Overlap del padre
    super.Colliders();
        super.Overlaps();
      
          }
    //metodo Update
      update(time, delta) {
        //llama al metodo Update del padre   
        super.update();
        
      }

      NoPower(player, noPowerUp){       //Devuelvo al player al estado de normal

        player.changeModifierNormal();
        this.bombas.children.iterate(function (child) {
          if(child != undefined)
          child.Restart();
      });
        
      }

      Restart(){
        this.jetpack.destroy();
        this.jetpack = new JetPack(this,8500,700).setScale(0.15);
        this.physics.add.overlap(this.player,this.jetpack,this.player.changeModifierJetPack,null,this.player);
        this.physics.add.overlap(this.player,this.jetpack,this.jetpack.changeModifier,null,this.jetpack);
        this.physics.add.collider(this.jetpack,this.background);

        this.antigravedad.destroy();
this.antigravedad = new Antigravedad(this,18000,150).setScale(0.35);
this.physics.add.overlap(this.player,this.antigravedad,this.player.changeModifierAntigravedad,null,this.player);
        this.physics.add.overlap(this.player,this.antigravedad,this.antigravedad.changeModifier,null,this.antigravedad);
        this.physics.add.collider(this.antigravedad,this.background);
        this.bombas.children.iterate(function (child) {
          if(child != undefined)
          child.Restart();
      });

        this.enemy.Restart();
        this.player.Restart('normal');
      }
    }