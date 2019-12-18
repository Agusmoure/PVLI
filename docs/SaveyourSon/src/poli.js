export default class Poli extends Phaser.GameObjects.Sprite{
    constructor(scene,oX,oY,movimiento,amplitud,velocidad,levelManager,stunear,tiempopenal){
    
        let x=oX;
        let y=oY;
        super(scene,x,y,'hitboxExtra');    // le pongo como imagen un archivo que solo tiene alpha(es todo transparente) para que con ello pueda calcular las colisiones
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
   
    this.movement=movimiento;
    this.active=false;
    this.penalization=-100;
    this.stun=stunear;           //Si va a hacer stun o slow
    this.stunTime=tiempopenal;         //Tiempo que durara la penalizacion que realice a su objetivo  
    this.tocado=false;              //Bandera que indica que he tocado al player
    this.finalizado=false;       //Bandera que indica que su funcionamiento ha terminado
    this.timerPenalizacion=tiempopenal; 
     this.originX=oX;
     
     this.originY=oY;
     this.speedY=velocidad;
     this.speedX=velocidad;
     this.distance=amplitud;
     this.lvM=levelManager;
    this.imagen = scene.add.sprite(oX,oY,'alcaideRun');
    this.imagen.play('alcaideRunning');
    
    /*Carlos somos uno de los grupos que tuvimos problemas para renderizar las animaciones, debido a que solo se renderizaba el primer
    frame, te preguntamos para encontrar el error pero no lo conseguimos arreglar. La solución fue añadirle otro sprite a esta clase, y hacer que ese sprite renderice la animacion
    Nos comentaste que te escribieramos un comentario como este para recordarte que, sabemos que no es la forma correcta de animar pero que nos diste el visto bueno para
    seguir así*/
     
    }
    
    
    Update(){
        //Todo el rato pongo la imagen que se anima en mi posición
        this.imagen.x=this.x;
        this.imagen.y=this.y;
        //Movimiento del policia dependiendo de si es horizontal o verrtical
        //Hago una cosa u otra dependiendo de si soy vertical u horizontal
        // Me muevo en una direccion hasta que la distancia entre mi posicion inicial y yo sea mayor que this.distance,en cuyo caso cambio de sentido
        if( this.movement==='horizontal' && this.x<(this.originX+this.distance) && this.x>this.originX-this.distance && Math.abs(this.body.velocity.x)>this.speedX/2)
        this.body.setVelocityX(this.speedX);
        else  if(this.movement==='horizontal'){
            if(this.x>this.originX)
            this.speedX=Math.abs(this.speedX)*-1;
            else if(this.x<this.originX)
            this.speedX=Math.abs(this.speedX);
            this.body.setVelocityX(this.speedX);
        }
        
    if(this.movement==='vertical' && this.y<(this.originY+this.distance) && this.y>this.originY-this.distance)
        this.body.setVelocityY(this.speedY);
        else  if( this.movement==='vertical'){
        if(this.y>this.originY)
        this.speedY=Math.abs(this.speedY)*-1;
        else
        this.speedY=Math.abs(this.speedY);
        this.body.setVelocityY(this.speedY);
    }
        //Control de la penalizacion dependiendo de si es stun o slow y si es poli o preso
        if(this.tocado && !this.finalizado && !this.stun){
            this.timerPenalizacion=this.timerPenalizacion-1;
            if(this.timerPenalizacion<0){
                this.lvM.SetPlayerX(-this.penalization);
            this.finalizado=false;
            this.tocado = false;        
            }
        }
        
        //Hago flip o no dependiendo de la direccion a la que me esté moviendo
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
        if(!this.tocado){  // Solo me ejecuto la primera vez que toco al player
            if(!this.stun){
            this.lvM.SetPlayerX(this.penalization);
            }
            else{
            this.lvM.StunPlayer(this.stunTime);
        }
            this.tocado=true;
            this.timerPenalizacion=100;
        }

    }


//Ejecuto una animacion u otra dependiendo de si me muevo de forma vertical u horizontal
//Y de un color u otro dependiendo de si hago stun o slow
    SetAnim(){
        if(this.movement === 'horizontal'){
            if(this.stun)
            this.imagen.play('poliWalkingstun');
            else
            this.imagen.play('poliWalkingslow');
        }
        else if(this.movement ==='vertical'){

         if(this.stun)
            this.imagen.play('poliflyingstun');
            else
            this.imagen.play('poliflyingslow');
        }
       }
}