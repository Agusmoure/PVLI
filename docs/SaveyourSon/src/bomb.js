import PowerUp from "./powerup.js";
export default class Bomba extends PowerUp{
    constructor(scene,xInit, yInit,lvManager,number){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,'bomba');
        scene.add.existing(this);    
    scene.physics.add.existing(this);
    this.repulsion = 1000;      
    this.recogida=false;
    this.lanzada = false;
    this.boom=false;
    this.temp =0;
    this.lvM=lvManager;
    this.index = number;
   
    
    }


    Update(){

        ////////////////////////////////////Si estoy en la mano del player////////////////////////////
if(this.recogida===true && !this.lvM.LanzarBomba(this.index)){
this.x=this.lvM.GetPlayerX();
this.y=this.lvM.GetPlayerY();
}

///////////////////////////////////////////Compruebo si tengo que ser lanzada/////////////////////////
else if(this.recogida===true && this.lvM.LanzarBomba(this.index) && !this.lanzada){
    this.Lanzamiento(this.lvM.GetPlayerVelX());
    this.lanzada=true;
}

//////////////////////////////////////////Temporizador para explotar////////////////////////////////////
else if(this.lanzada){
this.temp=this.temp+10;

///////////////////////////////////////////El temporizador de la explosion acabo y hay que mandar el impulso al jugador///////////////////////////////////////////
if(this.temp>1000 && !this.boom){
    let distanciaX= Math.abs(this.lvM.GetPlayerX()-this.x);
    let distanciaY= Math.abs(this.lvM.GetPlayerY()-this.y);
    if(this.lvM.GetPlayerX()<this.x && Math.abs(this.lvM.GetPlayerX()-this.x)<200){
    this.lvM.ImpulsePlayer(-this.repulsion*(distanciaX/(Math.sqrt(Math.pow(distanciaX,2)+Math.pow(distanciaY,2)))),this.repulsion*(distanciaY/(Math.sqrt(Math.pow(distanciaY,2)+Math.pow(distanciaX,2)))) );
    }
    else if(this.lvM.GetPlayerX()>this.x && Math.abs(this.lvM.GetPlayerX()-this.x)<200)
    this.lvM.ImpulsePlayer(this.repulsion*(distanciaX/(Math.sqrt(Math.pow(distanciaX,2)+Math.pow(distanciaY,2)))),this.repulsion*(distanciaY/(Math.sqrt(Math.pow(distanciaY,2)+Math.pow(distanciaX,2)))) );
    this.boom=true;
    this.lvM.BombExploded(this.x,this.y);
    this.anims.play('explode');
    this.on('animationcomplete',this.Explode,this);
}
}
}
PickMe(){
    this.recogida=true;      
}
Lanzamiento(sentido){
    this.x=this.x;
    this.y=this.y;
    this.recogida=false;
    this.body.setVelocityY(-400);
    if(sentido>0)
    this.body.setVelocityX(100);
    else
    this.body.setVelocityX(-100);
    this.lanzada=true;
}
      Explode(){         
          this.destroy();
    }
}