export default class Extra extends Phaser.GameObjects.Sprite{
    constructor(scene,oX,oY,movimiento,direction,amplitud,velocidad,levelManager,stunear,policia,tiempopenal,tiempovida){
    
        let x=oX;
        let y=oY;
        super(scene,x,y,'hitboxExtra');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    this.body.setCollideWorldBounds(true);
    this.iconoLLave = scene.add.sprite(oX,oY+50,'key').setScale(0.25);
    this.police=policia;
    this.movement=movimiento;
    this.active=false;
    this.timer=tiempovida;               //Tiempo de vida util del extra
    this.penalization=-100;
    this.stun=stunear;           //Si va a hacer stun o slow
    this.stunTime=tiempopenal;         //Tiempo que durara la penalizacion que realice a su objetivo  
    this.tocado=false;
    this.finalizado=false;       //Bandera que indica que su funcionamiento ha terminado
    this.timerPenalizacion=tiempopenal; 
     this.originX=oX;
     
     this.originY=oY;
     this.speedY=velocidad;
     this.speedX=velocidad;
     this.direccion = direction;
     // this.objective=objetivo; //Cosa a la que va a perseguir al empezar a moverse
     this.distance=amplitud;
     this.lvM=levelManager;
     this.coste=1; // las llaves que cuesta cada uno de los presos para que sean liberados
   // this.anims.play('alcaideRunning');
    this.imagen = scene.add.sprite(oX,oY,'alcaideRun');
    this.imagen.play('alcaideRunning');
    
    //  this.animPlaying=true;
     
    }
    
    
    Update(){
        this.imagen.x=this.x;
        this.imagen.y=this.y;
        this.iconoLLave.x=this.x;
        this.iconoLLave.y = this.y-50;
        this.iconoLLave.visible=false;
        //////////////////////////////////////////////Movimiento del policia dependiendo de si es horizontal o verrtical////////////////////////////////////////////////
        if( this.police && this.movement==='horizontal' && this.x<(this.originX+this.distance) && this.x>this.originX-this.distance && Math.abs(this.body.velocity.x)>this.speedX/2)
        this.body.setVelocityX(this.speedX);
        else  if(this.police && this.movement==='horizontal'){
            if(this.x>this.originX)
            this.speedX=Math.abs(this.speedX)*-1;
            else if(this.x<this.originX)
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
         if(!this.police && Math.abs(this.lvM.GetPlayerX()-this.x)<this.distance &&!this.active && this.lvM.EstoyLibre(this.coste)){
        this.active=true;
        if(this.stun)
            this.imagen.play('presoRunStun');
            else
            this.imagen.play('presoRunSlow');
         }
        if(!this.police && Math.abs(this.lvM.GetPlayerX()-this.x)<this.distance &&!this.active && !this.lvM.EstoyLibre(this.coste)){
        this.iconoLLave.visible=true;
        }
        //Se mueve si esta activo y no ha pasado demasiado tiempo
        if(this.active ){
            this.body.setVelocityX(this.speedX*this.direccion);//this.speedX*this.direccion);
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
        
        if(this.body.velocity.x>0){
        this.flipX=false;
        this.imagen.flipX=false;
        }
        else{
            this.imagen.flipX=true;
        this.flipX=true;
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


//Dependiendo de si es polica (y de si está volando o no y si hace stun o slow) o preso tendrá una animación u otra
    SetAnim(){
        if(this.police && this.movement === 'horizontal'){
            if(this.stun)
            this.imagen.play('poliWalkingstun');
            else
            this.imagen.play('poliWalkingslow');
        }
        else if(this.police && this.movement ==='vertical'){

         if(this.stun)
            this.imagen.play('poliflyingstun');
            else
            this.imagen.play('poliflyingslow');
        }
        else if(!this.police)
        {
            if(this.stun)
            this.imagen.play('presoIdleStun');
            else
            this.imagen.play('presoIdleSlow');
       // this.imagen.play('presoIdle'); 
        }
       }
}