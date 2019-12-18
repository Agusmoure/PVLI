export default class Preso extends Phaser.GameObjects.Sprite{
    constructor(scene,oX,oY,amplitud,velocidad,levelManager,stunear,tiempopenal){
    
        let x=oX;
        let y=oY;
        super(scene,x,y,'hitboxExtra');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    this.iconoLLave = scene.add.sprite(oX,oY+50,'key').setScale(0.25);
    this.active=false;
    this.penalization=-100;
    this.stun=stunear;           //Si va a hacer stun o slow
    this.stunTime=tiempopenal;         //Tiempo que durara la penalizacion que realice a su objetivo  
    this.tocado=false;           //Bandera que indica que he tocado al alcaide
    this.finalizado=false;       //Bandera que indica que su funcionamiento ha terminado
    this.timerPenalizacion=tiempopenal; 
     this.speedX=velocidad;
     this.distance=amplitud;
     this.lvM=levelManager;
     this.coste=10; // las llaves que cuesta cada uno de los presos para que sean liberado
    this.imagen = scene.add.sprite(oX,oY,'alcaideRun');
    this.imagen.play('alcaideRunning');     
    /*Carlos somos uno de los grupos que tuvimos problemas para renderizar las animaciones, debido a que solo se renderizaba el primer
    frame, te preguntamos para encontrar el error pero no lo conseguimos arreglar. La solución fue añadirle otro sprite a esta clase, y hacer que ese sprite renderice la animacion
    Nos comentaste que te escribieramos un comentario como este para recordarte que, sabemos que no es la forma correcta de animar pero que nos diste el visto bueno para
    seguir así*/
    }
    
    
    Update(){
        //Ponemos la imagen que va a realizar la animacion en todo momento en mi posicion
        this.imagen.x=this.x;
        this.imagen.y=this.y;
        //Ponemos el icono de la llave todo el rato en nuestra posición y hacemos que sea invisible 
        this.iconoLLave.x=this.x;
        this.iconoLLave.y = this.y-50;
        this.iconoLLave.visible=false;
    //Movimiento del preso que comienza si el jugador está cerca y tiene llaves
         if(Math.abs(this.lvM.GetPlayerX()-this.x)<this.distance &&!this.active && this.lvM.EstoyLibre(this.coste)){
        this.active=true;
        if(this.stun)
            this.imagen.play('presoRunStun');
            else
            this.imagen.play('presoRunSlow');
         }
        if(Math.abs(this.lvM.GetPlayerX()-this.x)<this.distance &&!this.active && !this.lvM.EstoyLibre(this.coste)){    
            //Pongo el iconito de la llave visible cuando el player se encuentra cerca para que sepa que puede liberarme
        this.iconoLLave.visible=true;
        }
        //Se mueve si esta activo 
        if(this.active ){
            this.body.setVelocityX(-this.speedX);
        }

        //Control de la penalizacion dependiendo de si es stun o slow
        if(this.tocado && !this.finalizado && !this.stun){             
            this.timerPenalizacion=this.timerPenalizacion-1;
            if(this.timerPenalizacion<0){//Si se ha acabado el tiempo que el alcaide deberia tener slow, le aviso para que vuelva a la normalidad
                this.lvM.RecoverAlcaide();
            this.finalizado=false;
            this.tocado = false;        
            }
        }
        
        //Hago flip o no dependiendo de la dirección a la que me mueva
        if(this.body.velocity.x>0){
        this.flipX=false;
        this.imagen.flipX=false;
        }
        else{
            this.imagen.flipX=true;
        this.flipX=true;
        }
    }

    //Cuando haya tocado a mi objetivo le mando la penalizacion y me pongo activo
    caught(){
        if(!this.tocado){   // Solo me ejecuto la primera vez que toco al alcaide
            if(!this.stun){
                this.lvM.ChangeAlcaideSpeed(this.penalization);
            }
            else{
            this.lvM.StunAlcaide(this.stunTime);
        }
            this.tocado=true;
            this.timerPenalizacion=100;
        }

    }


  //Ejecuto una animacion u otra dependiendo de si hago stun o slow
    SetAnim(){
            if(this.stun)
            this.imagen.play('presoIdleStun');
            else
            this.imagen.play('presoIdleSlow');

        
       }
}