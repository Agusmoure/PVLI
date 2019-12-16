export default class Enemy extends Phaser.GameObjects.Sprite{
    constructor(scene,jugador,gameManager){
    
        let x=50;
        let y=150;
        super(scene,x,y,'alcaideRun');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        
        //this.body.setCollideWorldBounds(true);
        this.aire=false;
        this.vehicle=false;
        this.modifier='normal';
        this.penalization=10;
        this.stunTime=0;
        this.speedY=100;
        this.gM=gameManager;
        this.speedX=250-(gameManager.GetSpeedPenalizations()*this.penalization);
        this.player=jugador;
        //this.play('alcaideRunning');
        this.anims.play('alcaideRunning');
        this.animPlaying=false;
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

        if(this.stunTime<1){
        if(this.player.x<this.x)
        this.body.setVelocityX(-this.speedX);
        else
        this.body.setVelocityX(this.speedX);
        if(this.player.y<this.y)
        this.body.setVelocityY(-this.speedY);
        else
        this.body.setVelocityY(this.speedY);

        // this.body.setVelocityX(this.speedX);
        // this.body.setVelocityX((Math.abs(this.player.x-this.x))/(this.player.x-this.x)*this.speedX);
        // this.body.setVelocityY((Math.abs(this.player.y-this.y))/(this.player.y-this.y)*this.speedY);
       //this.body.setVelocityX((this.player.x-this.x));
        }
        else{
            this.body.setVelocityX(0);
            this.body.setVelocityY(0);
            this.stunTime=this.stunTime-1;
            
        }
       
    }

    HitPlayer(){

        if(!this.animPlaying){
            this.anims.play('alcaideAttacking');
            this.animPlaying=true;
            // this.on('animationcomplete',()=>{super.anims.stop()});
            // this.anims.stop();
        }
    }

    Stun(){
        this.speedX=0;
        this.touchedSound.play();
    }
    Recover(){
        this.speedX=250-(this.gM.GetSpeedPenalizations()*this.penalization);
    }
    ChangeSpeed(slow){
        if(slow<0)
        this.touchedSound.play();
      this.speedX=this.speedX+slow;

    }
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
}