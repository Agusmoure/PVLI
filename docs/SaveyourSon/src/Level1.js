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
        this.jetpack = new JetPack(this,7000,150);
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
        this.bomba = new Bomba(this,400,1000,this.lvM,0);
        this.bomba2 = new Bomba(this,700,1000,this.lvM,1);
        this.bombas.add(this.bomba)
        this.bombas.add(this.bomba2);
        this.contador=0;
this.bombitas=this.map.getObjectLayer('Bombas');
this.bombitas.objects.forEach(object => { 
 
  this.bombita = new Bomba(this,object.x,object.y,this.lvM,this.contador);
  this.contador++;
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

    //EXTRAS
    //this.poliprueba=new Extra (this,100,100,'horizontal',0,100,200,this.lvM,true,true,100,300);
    this.poli =new Extra (this,200,500,'horizontal',0,100,200,this.lvM,true,true,100,300); //.setScale(2);
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
    this.extrasPolis.children.iterate(function (child) {

      if(child != undefined)
      child.SetAnim();  
    
  });
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