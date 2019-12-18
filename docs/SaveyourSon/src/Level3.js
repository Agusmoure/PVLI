//importamos todo aquello que es necesario
import JetPack from "./jetpack.js";
import Antigravedad from "./antigravedad.js";
import Key from "./Key.js";
import Bomba from "./bomb.js";
import Preso from "./preso.js";
import Poli from "./poli.js";
import HookGun from "./HookGun.js";
import HookGunProyectile from "./HookGunProyectile.js"
import Game from "./game.js"
import fondo from "./fondo.js"
import NoPowerUp from "./NoPowerUp.js";
import LevelChanger from "./LevelChanger.js"

export default class Level3 extends Game {

  constructor() {
    super( 'Level3');

  }
  //Preload de este nivel
  preload() {
    //llamamos al preload del padre
super.preload();
this.load.image('fondo3','./SaveyourSon/assets/Level3.jpg')
this.load.tilemapTiledJSON('Nivel3', './SaveyourSon/assets/Nivel3.json');
this.load.image('patronesTilemap', './SaveyourSon/assets/patrones.png');
  }
  
  create(data) {
    //seteamos el game manager y el tamaño del fondo 3
    this.gM=data;
    this.fondo=new fondo(this,'fondo3');
//generamos el mapa
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
    //metemos el create del padre
    super.create();
    this.door= new LevelChanger(this,this.gM,this.lvM,58600,500).setScale(0.5);
//Gracias a tilemap creamos todos los elementos que hay en él
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
      //creamos los modifiers
    this.jetpack = new JetPack(this,24800,1000);
    this.antigravedad = new Antigravedad(this,13100,-130).setScale(0.35);
    this.HookGun = new HookGun(this,this.lvM,34500,800);
    this.HookGunProyectiles=new HookGunProyectile(this,this.lvM,0,0,-99999999,99999999)
    this.backtoNormal = new NoPowerUp(this,49600,1250,this.lvM);
    //seteamos las variables concretas
    this.player.changeModifierJetPack();
    this.player.x=500;
    this.player.y=100;
    this.player.oX=500;
    this.player.oY=100;
    this.enemy.x=0;
    this.enemy.y=0;
    this.enemy.oX=0;
    this.enemy.oY=0;
    this.keyCount=0;    
//Llamamos a los metodos collider y ovelaps del padre
    super.Colliders();
    super.Overlaps();

  }
//metodo update de esta escena
  update(time, delta) { 
    //llama al metodo update del padre
    super.update(); 
  }
  NoPower(player, noPowerUp){       //Devuelvo al player al estado de normal
    player.changeModifierNormal();
    noPowerUp.PickMe();
  }
//metodo que reinicia la posicion del player, del enemy y vuelve a poner los modifiers en su lugar
  Restart(){
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