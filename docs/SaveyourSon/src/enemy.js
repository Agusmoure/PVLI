export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene,jugador,gameManager){
    
        let x=50;
        let y=150;

        super(scene,x,y,'alcaideRun');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        this.oX=0;
        this.oY=0;
        this.escena = scene;
        this.aire=false;
        this.vehicle=false;
        this.modifier='normal';
        this.penalization=10;
        this.stunTime=0;
        this.speedY=100;
        this.gM=gameManager;
        this.speedX=250-(gameManager.GetSpeedPenalizations()*this.penalization);
        this.player=jugador;
        this.anims.play('alcaideRunning');
        const config = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: false,
            delay: 0
        };
        this.touchedSound = scene.sound.add('AlcaideTouched',config);
    }

    followPlayer(){

        //Si no estoy stuneado sigo al player dependiendo de donde esté
        if(this.stunTime<1){
        if(this.player.x<this.x){
        if(Math.abs(Math.abs(this.player.x)-Math.abs(this.x))<500)
        this.body.setVelocityX(-this.speedX);
        else
        this.body.setVelocityX(-this.speedX*1.5);  //Para que si lo sacas de pantalla no tarde mucho en volver
        }
        else{
            if(Math.abs(Math.abs(this.player.x)-Math.abs(this.x))<500)
        this.body.setVelocityX(this.speedX);
        else
        this.body.setVelocityX(this.speedX*1.5);
        }
        if(this.player.y<this.y)
        this.body.setVelocityY(-this.speedY);
        else
        this.body.setVelocityY(this.speedY);
        }
        else{
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.stunTime=this.stunTime-1;
            
        }
       
    }

    //Metodo que se llama cuando el alcaide ha pillado al player
    HitPlayer(){
        this.escena.Restart()
    }

    //Pongo mi velocidad a 0
    Stun(){
        this.speedX=0;
        this.touchedSound.play();
    }
    //Recupero mi velocidad y le pregunto al gameManager por todas las penalizaciones que ha comprado el player
    Recover(){
        this.speedX=250-(this.gM.GetSpeedPenalizations()*this.penalization);
    }
    //Aplico a mi velocidad el modificador que me ha llegado
    ChangeSpeed(slow){
        if(slow<0)
        this.touchedSound.play();
      this.speedX=this.speedX+slow;

    }
    //Acumulo/guardo e stun
    getStunned(time){
this.stunTime=time;
    }


    Update(stuned, recover){
        this.followPlayer();
        if(stuned)
        this.Stun();
        if(recover)
        this.Recover(); 

    }

    //Vuelvo a mi posición del comienzo del nivel
    Restart(){
        this.x = this.oX;
        this.y = this.oY;
        this.anims.play('alcaideRunning');

    }
}