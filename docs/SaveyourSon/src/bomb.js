import PowerUp from "./powerup.js";
export default class Bomba extends PowerUp{
    constructor(scene,xInit, yInit,lvManager,number){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y,'bomba');
        scene.add.existing(this);    
    scene.physics.add.existing(this);
    this.repulsion = 1000;      //Fuerza que le voy a mandar al player en caso de que explote cerca de él
    this.recogida=false;        //Flag que indica que el player me ha tocado
    this.lanzada = false;       //Flag que indca que el player ya me ha usado
    this.boom=false;            //Flag que indica que he explotado  mi ejecucion se acabó
    this.temp =0;
    this.lvM=lvManager;
    this.index = number;

    const config = {
        mute: false,
        volume: 1,
        rate: 1,
        detune: 0,
        seek: 0,
        loop: false,
        delay: 0
    };
    this.explosion = scene.sound.add('explosion',config);
    
    }


    Update(){
    
        
        //Si estoy en la mano del player
        if(this.recogida===true && !this.lvM.LanzarBomba(this.index)){
            this.x=this.lvM.GetPlayerX();
            this.y=this.lvM.GetPlayerY();
        }
        
        //Compruebo si tengo que ser lanzada
        else if(this.recogida===true && this.lvM.LanzarBomba(this.index) && !this.lanzada){
    this.Lanzamiento(this.lvM.GetPlayerVelX());
    this.lanzada=true;
}

//Temporizador para explotar
else if(this.lanzada){
    this.temp=this.temp+10;
    
    //El temporizador de la explosion acabó y aun no he explotado, hay que explotar hay que mandar el impulso al jugador
    if(this.temp>1000 && !this.boom){
    //Me quedo con la distancia de mi al player
    let distanciaX= Math.abs(this.lvM.GetPlayerX()-this.x);
    let distanciaY= Math.abs(this.lvM.GetPlayerY()-this.y);
    
    //Le mando el impulso al player dependiendo de si esta a mi izquierda o a mi derecha
    //Si la fuerza de impulso es un valor Q. Utilizo trigonometría para sacar Qx u Qy y pasarselas al player
    if(this.lvM.GetPlayerX()<this.x && Math.abs(this.lvM.GetPlayerX()-this.x)<200)  
    this.lvM.ImpulsePlayer(-this.repulsion*(distanciaX/(Math.sqrt(Math.pow(distanciaX,2)+Math.pow(distanciaY,2)))),this.repulsion*(distanciaY/(Math.sqrt(Math.pow(distanciaY,2)+Math.pow(distanciaX,2)))) );
    else if(this.lvM.GetPlayerX()>this.x && Math.abs(this.lvM.GetPlayerX()-this.x)<200)
    this.lvM.ImpulsePlayer(this.repulsion*(distanciaX/(Math.sqrt(Math.pow(distanciaX,2)+Math.pow(distanciaY,2)))),this.repulsion*(distanciaY/(Math.sqrt(Math.pow(distanciaY,2)+Math.pow(distanciaX,2)))) );
    
    this.boom=true;
    this.lvM.bombExplosion(this.x,this.y);     //Aviso al level manager de la posicion  en la que exploté por si el alcaide está cerca y tiene que ser stuneado
    this.anims.play('explode');
    this.explosion.play();
    this.on('animationcomplete',this.Explode,this); //En el momento de que la animacion de mi explosion llamo a explode para que termine mi ejecucion
}
}

//Si el player me ha pillado, pero no he sido lazada y el player me dice que ya no tiene una bomba me destruyo
if(this.recogida && !this.lanzada && this.lvM.player.modifier !=='bomba')
this.Explode();
}
PickMe(){
    this.recogida=true;  
    console.log('recogida');  
}
//He sido lanzada y dependiendo de la direccion que me llegue, soy lanzada hacia una posicion u otra
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

Restart(){
    if(this.recogida)
        this.Explode();
}

//Como bomba termina mi ejecucion
      Explode(){         
          this.destroy();
          console.log('boom');
    }
}