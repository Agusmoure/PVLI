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
    //this.gM=new GameManager();
  }
  preload() {
super.preload();
this.load.image('fondo3','./SaveyourSon/assets/Level3.jpg')

this.load.tilemapTiledJSON('Nivel3', './SaveyourSon/assets/Nivel3.json');
this.load.image('patronesTilemap', './SaveyourSon/assets/patrones.png');
  }
  
  create(data) {
    this.gM=data;
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

    this.llaves = this.map.getObjectLayer('Llaves');
    this.llaves.objects.forEach(object => { 
      this.llave = new Key(this,object.x,object.y-1000,this.lvM).setScale(0.25);
      this.keys.add(this.llave);
    });
    this.polisVerticalesStun =this.map.getObjectLayer('PoliQuietoSlow');
    this.polisVerticalesStun.objects.forEach(object => { 
      this.NUEVOPOLI = new Extra(this,object.x,object.y-1000,'vertical',0,20,50,this.lvM,false,true,100,300);
   
      this.extrasPolis.add(this.NUEVOPOLI);
    });
    this.polisVerticalesStun =this.map.getObjectLayer('PoliVerticalSlow');
    this.polisVerticalesStun.objects.forEach(object => { 
      this.NUEVOPOLI = new Extra(this,object.x,object.y-1000,'vertical',0,20,50,this.lvM,false,true,100,300);
   
      this.extrasPolis.add(this.NUEVOPOLI);
    });
    
this.contador=0;
    this.BombasMap =this.map.getObjectLayer('Bombas');
    this.BombasMap.objects.forEach(object => { 
      this.bomba = new Bomba(this,object.x,object.y-1000,this.lvM,this.contador);
      this.contador++;
   
      this.bombas.add(this.bomba);
    });
    this.lvM.SetNumBombas(this.contador);
    this.jetpack = new JetPack(this);
    this.antigravedad = new Antigravedad(this);
    
    this.player.changeModifierJetPack();


    this.HookGun = new HookGun(this,this.lvM);

    this.keyCount=0;
    
    //this.background2.setScale(0.1);
    
  
   
  


    //EXTRAS
    this.poli=new Extra (this,2850,-300,'vertical',0,100,200,this.lvM,true,true,100,300);
    this.poli2=new Extra (this,3850,-500,'vertical',0,100,200,this.lvM,false,true,100,300);
    this.poli3=new Extra (this,4000,75,'vertical',0,100,190,this.lvM,false,true,100,300);
    this.poli4=new Extra (this,4200,75,'vertical',0,100,195,this.lvM,false,true,100,300);
    this.poli5=new Extra (this,4400,75,'vertical',0,100,200,this.lvM,false,true,100,300);
    
    this.poli6=new Extra (this,5100,0,'vertical',0,75,100,this.lvM,false,true,100,300);
    this.poli7=new Extra (this,5100,-500,'vertical',0,75,100,this.lvM,false,true,100,300);
    this.poli8=new Extra (this,5250,-200,'vertical',0,75,100,this.lvM,false,true,100,300);
    this.poli9=new Extra (this,5250,100,'vertical',0,75,100,this.lvM,false,true,100,300);
    this.poli10=new Extra (this,5250,-500,'vertical',0,75,100,this.lvM,false,true,100,300);
    this.poli11=new Extra (this,5400,0,'vertical',0,75,100,this.lvM,false,true,100,300);
    this.poli12=new Extra (this,5400,-500,'vertical',0,75,100,this.lvM,false,true,100,300);
  
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
    this.poli45=new Extra (this,3100,-200,'vertical',0,75,150,this.lvM,true,true,30,300);
    this.poli46=new Extra (this,3150,-600,'horizontal',0,75,0,this.lvM,false,true,30,300);
    this.poli47=new Extra (this,6100,-350,'vertical',0,75,150,this.lvM,true,true,30,300);
    this.poli48=new Extra (this,6400,-350,'vertical',0,75,150,this.lvM,true,true,30,300);
    this.poli49=new Extra (this,6000,0,'horizontal',0,75,100,this.lvM,false,true,30,300);
    this.poli50=new Extra (this,6500,0,'horizontal',0,75,100,this.lvM,false,true,30,300);
    this.poli51=new Extra (this,7625,0,'horizontal',0,75,0,this.lvM,false,true,30,300);
    this.poli52=new Extra (this,8200,-400,'vertical',0,150,175,this.lvM,true,true,30,300);
    this.poli53=new Extra (this,8300,0,'horizontal',0,75,0,this.lvM,false,true,30,300);
    this.poli54=new Extra (this,9075,-700,'horizontal',0,75,0,this.lvM,false,true,30,300);
    this.poli55=new Extra (this,9075,-700,'horizontal',0,75,0,this.lvM,false,true,30,300);
    this.poli56=new Extra (this,9900,0,'horizontal',0,75,100,this.lvM,true,true,30,300);
    this.poli57=new Extra (this,10200,-500,'horizontal',0,75,0,this.lvM,false,true,30,300);
    this.poli58=new Extra (this,10700,-600,'vertical',0,75,100,this.lvM,false,true,30,300);
    this.poli59=new Extra (this,12600,-300,'vertical',0,50,50,this.lvM,false,true,30,300);
    this.poli60=new Extra (this,14000,1000,'horizontal',0,75,100,this.lvM,false,true,30,300);
    this.poli61=new Extra (this,14500,500,'vertical',0,50,50,this.lvM,false,true,30,300);
    this.poli62=new Extra (this,15700,1000,'vertical',0,50,50,this.lvM,false,true,30,300);
    this.poli63=new Extra (this,16500,900,'vertical',0,100,50,this.lvM,false,true,30,300);
    this.poli64=new Extra (this,17000,1000,'horizontal',0,75,100,this.lvM,false,true,30,300);
    this.poli65=new Extra (this,18050,900,'vertical',0,100,100,this.lvM,false,true,30,300);
    this.poli66=new Extra (this,19350,900,'vertical',0,100,100,this.lvM,false,true,30,300);
    this.poli67=new Extra (this,20500,1000,'horizontal',0,75,100,this.lvM,false,true,30,300);
    this.poli68=new Extra (this,20200,1000,'horizontal',0,75,100,this.lvM,false,true,30,300);
    this.poli69=new Extra (this,20200,550,'vertical',0,100,100,this.lvM,false,true,30,300);
    this.poli70=new Extra (this,20500,550,'vertical',0,100,100,this.lvM,false,true,30,300);
    this.poli71=new Extra (this,20800,800,'horizontal',0,75,100,this.lvM,false,true,30,300);
    this.poli72=new Extra (this,20800,400,'horizontal',0,75,100,this.lvM,false,true,30,300);
    this.poli73=new Extra (this,24500,800,'horizontal',0,100,100,this.lvM,false,true,30,300);
    this.poli74=new Extra (this,27000,800,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli75=new Extra (this,27500,800,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli76=new Extra (this,28300,800,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli77=new Extra (this,28400,1200,'vertical',0,100,100,this.lvM,false,true,30,300);
    this.poli78=new Extra (this,28950,800,'vertical',0,100,100,this.lvM,false,true,30,300);
    this.poli79=new Extra (this,30600,800,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli80=new Extra (this,31100,950,'vertical',0,100,100,this.lvM,false,true,30,300);
    this.poli81=new Extra (this,31600,950,'vertical',0,100,100,this.lvM,false,true,30,300);
    this.poli82=new Extra (this,32800,800,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli83=new Extra (this,34500,1100,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli84=new Extra (this,34900,1100,'horizontal',0,100,100,this.lvM,false,true,30,300);
    this.poli85=new Extra (this,35200,1100,'horizontal',0,100,100,this.lvM,false,true,30,300);
    this.poli86=new Extra (this,36700,1100,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli87=new Extra (this,37400,770,'vertical',0,100,100,this.lvM,true,true,30,300);
    this.poli88=new Extra (this,42050,800,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli89=new Extra (this,44000,1150,'vertical',0,100,100,this.lvM,true,true,30,300);
    this.poli90=new Extra (this,45000,1150,'vertical',0,100,100,this.lvM,true,true,30,300);
    this.poli91=new Extra (this,47500,800,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli92=new Extra (this,51500,500,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli93=new Extra (this,52100,800,'vertical',0,100,100,this.lvM,true,true,30,300);
    this.poli94=new Extra (this,52800,800,'horizontal',0,100,100,this.lvM,true,true,30,300);
    this.poli95=new Extra (this,56800,800,'horizontal',0,100,100,this.lvM,false,true,30,300);
    this.poli96=new Extra (this,56800,1000,'horizontal',0,100,100,this.lvM,false,true,30,300);


    this.extrasPolis =this.physics.add.group();
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
    this.extrasPolis.add(this.poli45);
    this.extrasPolis.add(this.poli46);
    this.extrasPolis.add(this.poli47);
    this.extrasPolis.add(this.poli48);
    this.extrasPolis.add(this.poli49);
    this.extrasPolis.add(this.poli50);
    this.extrasPolis.add(this.poli51);
    this.extrasPolis.add(this.poli52);
    this.extrasPolis.add(this.poli53);
    this.extrasPolis.add(this.poli54);
    this.extrasPolis.add(this.poli55);
    this.extrasPolis.add(this.poli56);
    this.extrasPolis.add(this.poli57);
    this.extrasPolis.add(this.poli58);
    this.extrasPolis.add(this.poli59);
    this.extrasPolis.add(this.poli60);
    this.extrasPolis.add(this.poli61);
    this.extrasPolis.add(this.poli62);
    this.extrasPolis.add(this.poli63);
    this.extrasPolis.add(this.poli64);
    this.extrasPolis.add(this.poli65);
    this.extrasPolis.add(this.poli66);
    this.extrasPolis.add(this.poli67);
    this.extrasPolis.add(this.poli68);
    this.extrasPolis.add(this.poli60);
    this.extrasPolis.add(this.poli70);
    this.extrasPolis.add(this.poli71);
    this.extrasPolis.add(this.poli72);
    this.extrasPolis.add(this.poli73);
    this.extrasPolis.add(this.poli74);
    this.extrasPolis.add(this.poli75);
    this.extrasPolis.add(this.poli76);
    this.extrasPolis.add(this.poli77);
    this.extrasPolis.add(this.poli78);
    this.extrasPolis.add(this.poli79);
    this.extrasPolis.add(this.poli80);
    this.extrasPolis.add(this.poli81);
    this.extrasPolis.add(this.poli82);
    this.extrasPolis.add(this.poli83);
    this.extrasPolis.add(this.poli84);
    this.extrasPolis.add(this.poli85);
    this.extrasPolis.add(this.poli86);
    this.extrasPolis.add(this.poli87);
    this.extrasPolis.add(this.poli88);
    this.extrasPolis.add(this.poli89);
    this.extrasPolis.add(this.poli90);
    this.extrasPolis.add(this.poli91);
    this.extrasPolis.add(this.poli92);
    this.extrasPolis.add(this.poli93);
    this.extrasPolis.add(this.poli94);
    this.extrasPolis.add(this.poli95);
    this.extrasPolis.add(this.poli96);
    
    this.extrasPolis.children.iterate(function (child) {

      if(child != undefined)
      child.SetAnim();  
  });
    this.preso = new Extra(this,500,100,'horizontal',-1,50,100,this.lvM,true,false,300,300);
    this.Presos = this.physics.add.group();
    this.Presos.add(this.preso);
    this.Presos.children.iterate(function (child) {
      if(child != undefined)
      child.SetAnim();  
  });    

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