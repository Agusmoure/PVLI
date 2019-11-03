import PowerUp from "./powerup.js";
export default class Bomba extends PowerUp{
    constructor(scene,xInit, yInit,lvManager){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,'bomba');
        scene.add.existing(this);    
    scene.physics.add.existing(this);
    this.repulsion = 1000;      
    this.recogida=false;
    this.lanzada = false;
    this.temp =0;
    this.lvM=lvManager;
    
    }


    Update(){
if(this.recogida===true && !this.lvM.LanzarBomba()){
this.x=this.lvM.GetPlayerX();
this.y=this.lvM.GetPlayerY();
}
else if(this.recogida===true && this.lvM.LanzarBomba() && !this.lanzada){
    this.Lanzamiento(this.lvM.GetPlayerVelX());
    this.lanzada=true;
}
else if(this.lanzada){
this.temp=this.temp+10;

if(this.temp>1000){
    if(this.lvM.GetPlayerX()<this.x && Math.abs(this.lvM.GetPlayerX()-this.x)<200)
    this.lvM.SetPlayerX(-500+Math.abs(this.lvM.GetPlayerX()-this.x));
    else if(this.lvM.GetPlayerX()>this.x && Math.abs(this.lvM.GetPlayerX()-this.x)<200)
    this.lvM.SetPlayerX(500-Math.abs(this.lvM.GetPlayerX()-this.x));
this.destroy();
}
}
    }
    PickMe(){
        this.recogida=true;
        console.log(this.recogida);
        
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
      
}