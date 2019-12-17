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
import Poli from "./poli.js";
import Preso from "./preso.js";
import HookGun from "./HookGun.js";
import fondo from "./fondo.js"
import NoPowerUp from "./NoPowerUp.js";


export default class Level1 extends Game {
    constructor(){
        super('Level1')
        this.gM=new GameManager();
    }
    preload() {
    super.preload();
    this.load.image('door','./SaveyourSon/assets/ExitDoor.png');
      this.load.image('fondo','./SaveyourSon/assets/Level1.jpg');
    this.load.tilemapTiledJSON('Nivel1', './SaveyourSon/assets/Nivel1.json');
    this.load.image('patronesTilemap', './SaveyourSon/assets/patrones.png');
      }
    create() {
      this.fondo=new fondo(this,'fondo').setScale(1.7);
super.create()
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
super.create();

this.player.x=500;
this.player.y=900;
this.player.oX=500;
this.player.oY=900;
this.enemy.x=0;
this.enemy.y=900;
this.enemy.oX=0;
this.enemy.oY=900;
    
        this.door= new LevelChanger(this,this.gM,this.lvM,40600,100).setScale(0.5);
        this.lvM.SetNumBombas(3);

        this.player.changeModifierNormal();
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
this.lvM.SetNumBombas(this.contador);
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
 // (scene,oX,oY,movimiento,amplitud,velocidad,levelManager,stunear,tiempopenal)
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

  //   this.extrasPolis.children.iterate(function (child) {

  //     if(child != undefined)
  //     child.SetAnim();  
    
  // });
this.HookGun=new HookGun(this,this.lvM);
this.backtoNormal = new NoPowerUp(this,30400,900,this.lvM);
this.jetpack = new JetPack(this,8500,700).setScale(0.15);
this.antigravedad = new Antigravedad(this,18000,150).setScale(0.35);
        
    super.Colliders();
    this.physics.add.collider(this.background,this.door);
        super.Overlaps();
        this.physics.add.collider(this.jetpack,this.background);
        this.physics.add.collider(this.backtoNormal,this.background);
        this.physics.add.overlap(this.player,this.backtoNormal,this.NoPower,null,this);
        this.physics.add.overlap(this.player,this.door,this.door.ChangeLevel,null,this);


      
          }
    
      update(time, delta) {   
        super.update();
        this.fondo.Update(this.player);
      }

      NoPower(player, noPowerUp){       //Devuelvo al player al estado de normal
        player.changeModifierNormal();
        //noPowerUp.PickMe();
      }

      Restart(){

        // this.backtoNormal.destroy();
        // this.backtoNormal = new NoPowerUp(this,30400,900,this.lvM);
        // this.physics.add.collider(this.backtoNormal,this.background);
        // this.physics.add.overlap(this.player,this.backtoNormal,this.NoPower,null,this);

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


        this.enemy.Restart();
        this.player.Restart('normal');
      }
    }