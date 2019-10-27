import PowerUp from "./powerup.js";
export default class Bomba extends PowerUp{
    constructor(scene,xInit, yInit,player){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,'bomba');
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    this.recogida=false;
    this.lanzada = false;
    this.temp =0;
    
    }


    Update(x,y){
if(this.recogida && !this.lanzada){
this.x=x;
this.y=y;
}
// else if(this.lanzada){
// this.temp=this.temp+10;
// console.log(this.temp);
// if(this.temp>1000){
//     console.log('w  	kncljewn    cvjbw   ejeb    w');
// this.destroy();
// }
// }
    }
    PickMe(){
        this.recogida=true;
        
    }
    Lanzamiento(sentido){
        this.x=this.x;
        this.y=this.y;
        this.recogida=false;
        this.body.setVelocityY(-400);
        if(sentido)
        this.body.setVelocityX(300);
        else
        this.body.setVelocityX(-300);
        this.lanzada=true;
    }
      
}