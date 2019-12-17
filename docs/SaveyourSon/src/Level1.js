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
import HookGun from "./HookGun.js";
import fondo from "./fondo.js"


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
        this.jetpack = new JetPack(this,8500,150);
        this.antigravedad = new Antigravedad(this,18000,150);
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
        this.presosSlow = this.map.getObjectLayer('PresosSlow');
    
        this.presosSlow.objects.forEach(object => { 
          this.presosSlow = new Extra(this,object.x,object.y,'',-1,100,200,this.lvM,false,false,200,3);
          this.Presos.add(this.presosSlow);
        });
        this.presosStun = this.map.getObjectLayer('PresosStun');
    
        this.presosStun.objects.forEach(object => { 
          this.presosStun = new Extra(this,object.x,object.y,'',-1,100,200,this.lvM,true,false,200,3);
          this.Presos.add(this.presosStun);
        });

        this.Presos.children.iterate(function (child) {

          if(child != undefined)
          child.SetAnim();  
      });
      this.poliHorizontal = this.map.getObjectLayer('PoliHorizontalSlow');
      this.poliHorizontal.objects.forEach(object => { 
        this.policia = new Extra(this,object.x,object.y,'horizontal',-1,100,200,this.lvM,false,true,125,200);
        this.policia.SetAnim();
        this.extrasPolis.add(this.policia);
      });
      this.poliHorizontalStun = this.map.getObjectLayer('PoliHorizontalStun');
      this.poliHorizontalStun.objects.forEach(object => { 
        this.policia = new Extra(this,object.x,object.y,'horizontal',-1,75,125,this.lvM,true,true,40,200);
        this.policia.SetAnim();
        this.extrasPolis.add(this.policia);
      });
    this.poliVertical = this.map.getObjectLayer('PoliVerticalSlow');
      this.poliVertical.objects.forEach(object => { 
        this.policia = new Extra(this,object.x,object.y,'vertical',-1,100,200,this.lvM,false,true,125,200);
        this.policia.SetAnim();
        this.extrasPolis.add(this.policia);
      });
      this.poliVerticalStun = this.map.getObjectLayer('PoliVerticalStun');
      this.poliVerticalStun.objects.forEach(object => { 
        this.policia = new Extra(this,object.x,object.y,'vertical',-1,75,125,this.lvM,true,true,40,200);
        this.policia.SetAnim();
        this.extrasPolis.add(this.policia);
      });
  //   this.extrasPolis.children.iterate(function (child) {

  //     if(child != undefined)
  //     child.SetAnim();  
    
  // });
this.HookGun=new HookGun(this,this.lvM);
        
    super.Colliders();
    this.physics.add.collider(this.background,this.door);
        super.Overlaps();
        this.physics.add.overlap(this.player,this.door,this.door.ChangeLevel,null,this);


      
          }
    
      update(time, delta) {   
        super.update();
        this.fondo.Update(this.player);
      }
    }