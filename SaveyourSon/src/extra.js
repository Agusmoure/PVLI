export default class Extra extends Phaser.GameObjects.Sprite{
    constructor(scene,objetivo,levelManager,stunear){
    
        let x=500;
        let y=100;
        super(scene,x,y,'dude');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
    this.body.setCollideWorldBounds(true);
    this.police=false;
    this.active=false;
    this.timer=300;
    this.penalization=-50;
    this.stun=stunear;
    this.stunTime=100;
    this.tocado=false;
    this.finalizado=false;
    this.timerPenalizacion=100;
    this.speedY=100;
    this.speedX=100;
    this.objective=objetivo;
    this.distance=100;
    this.lvM=levelManager;
    }


    Update(){
        if(Math.abs(this.objective.x-this.x)<this.distance)
        this.active=true;
        if(this.active && this.timer>0 && Math.abs(this.objective.x-this.x)<this.distance){
            this.body.setVelocityX((Math.abs(this.objective.x-this.x)/(this.objective.x-this.x))*this.speedX);
        this.timer=this.timer-1;
        console.log(this.timer);
        }
        else
        this.body.setVelocityX(0);

        if(this.tocado && !this.finalizado && !this.stun){
            this.timerPenalizacion=this.timerPenalizacion-1;
            if(this.timerPenalizacion<0){
                if(this.police)
            this.lvM.SetPlayerX(-this.penalization);
            else
            this.lvM.RecoverAlcaide();
            this.finalizado=true;    
        }
        }
    }

    caught(){
        if(!this.tocado){
            if(!this.stun){
                if(this.police)
            this.lvM.SetPlayerX(this.penalization);
            }
            else{
                if(this.police)
            this.lvM.StunPlayer(this.stunTime);
            else
            this.lvM.StunAlcaide(this.stunTime);
        }
            this.tocado=true;
        }

    }
}