export default class Extra extends Phaser.GameObjects.Sprite{
    constructor(scene,direction,levelManager,stunear,policia,tiempopenal,tiempovida){
    
        let x=500;
        let y=100;
        super(scene,x,y,'dude');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    this.body.setCollideWorldBounds(true);
    this.police=true;
    this.movement='horizontal';
    this.active=false;
    this.timer=tiempovida;               //Tiempo de vida util del extra
    this.penalization=-100;
    this.stun=false;           //Si va a hacer stun o slow
    this.stunTime=tiempopenal;         //Tiempo que durara la penalizacion que realice a su objetivo  
    this.tocado=false;
    this.finalizado=false;       //Bandera que indica que su funcionamiento ha terminado
    this.timerPenalizacion=tiempopenal; 
     this.originX=500;
     this.originY=100;
    this.speedY=100;
    this.speedX=100;
   // this.objective=objetivo; //Cosa a la que va a perseguir al empezar a moverse
    this.distance=50;
    this.lvM=levelManager;
    this.coste=1; // las llaves que cuesta cada uno de los presos para que sean liberados

    }


    Update(){

        //////////////////////////////////////////////Movimiento del policia dependiendo de si es horizontal o verrtical////////////////////////////////////////////////
        if( this.police && this.movement==='horizontal' && this.x<(this.originX+this.distance) && this.x>this.originX-this.distance)
        this.body.setVelocityX(this.speedX);
        else  if(this.police && this.movement==='horizontal'){
        if(this.x>this.originX)
        this.speedX=Math.abs(this.speedX)*-1;
        else
        this.speedX=Math.abs(this.speedX);
        this.body.setVelocityX(this.speedX);
    }
        
    if( this.police && this.movement==='vertical' && this.y<(this.originY+this.distance) && this.y>this.originY-this.distance)
        this.body.setVelocityY(this.speedY);
        else  if(this.police && this.movement==='vertical'){
        if(this.y>this.originY)
        this.speedY=Math.abs(this.speedY)*-1;
        else
        this.speedY=Math.abs(this.speedY);
        this.body.setVelocityY(this.speedY);
    }


    ///////////////////////////////////////////////////Movimiento del preso que comienza si el jugador está cerca y tiene llaves/////////////////////////////////////////
         if(!this.police && Math.abs(this.lvM.GetPlayerX()-this.x)<this.distance && this.lvM.EstoyLibre(this.coste))
        this.active=true;
        //Se mueve si esta activo y no ha pasado demasiado tiempo
        if(this.active && this.timer>0 ){
            this.body.setVelocityX((Math.abs(this.objective.x-this.x)/(this.objective.x-this.x))*this.speedX);
            this.timer=this.timer-1;
        }

        //////////////////////////////////////////////Control de la penalizacion dependiendo de si es stun o slow y si es poli o preso////////////////////////////////////
        if(this.tocado && !this.finalizado && !this.stun){
            this.timerPenalizacion=this.timerPenalizacion-1;
            if(this.timerPenalizacion<0){
                if(this.police)
                this.lvM.SetPlayerX(-this.penalization);
                else
                this.lvM.RecoverAlcaide();
            this.finalizado=false;
            this.tocado = false;        
            }
        }
        
    }

    ///////////////////////////////////////////////////Cuando haya tocado a mi objetivo le mando la penalizacion y me pongo activo/////////////////////////////////////////
    caught(){
        if(!this.tocado){
            if(!this.stun){
                if(this.police)
            this.lvM.SetPlayerX(this.penalization);
            else
                this.lvM.ChangeAlcaideSpeed(this.penalization);
            }
            else{
                if(this.police)
            this.lvM.StunPlayer(this.stunTime);
            else
            this.lvM.StunAlcaide(this.stunTime);
        }
            this.tocado=true;
            this.timerPenalizacion=100;
        }

    }
}