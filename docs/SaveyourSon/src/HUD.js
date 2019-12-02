
export default class HUD extends Phaser.GameObjects.Container{
    constructor(scene,xInit, yInit,levelManager){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y);
        scene.add.existing(this);    
    scene.physics.add.existing(this);    
    this.lvM=levelManager;
    this.modifier='normal';
    this.escena = scene;

    this.jetpackHUD = scene.add.sprite(100,100,'jetpackHUD').setScale(0.1);
    this.add(this.jetpackHUD);

    this.bombaHUD = scene.add.sprite(100,100,'bomba');
    this.add(this.bombaHUD);

    this.playerHUD = scene.add.sprite(100,100,'playerHUD').setScale(0.1);
    this.add(this.playerHUD);
    
    this.hookGunHUD = scene.add.sprite(100,100,'hookHUD').setScale(0.1);
    this.add(this.hookGunHUD);

    this.muteHUD = scene.add.sprite(1100,-750,'playerHUD').setScale(0.1);
    this.muteHUD.setInteractive();
    this.add(this.muteHUD);

    this.pauseHUD = scene.add.sprite(1000,-750,'playerHUD').setScale(0.1);
    this.pauseHUD.setInteractive();
    this.add(this.pauseHUD);

this.mouseClick=false;
this.pause = false;
    
    }
 
    preUpdate(time, delta){
        this.muteHUD.on('pointerdown',pointer => {
            if(!this.mouseClick){
            console.log("Muteado");
                this.mouseClick=true;
        }
            
            });
            this.muteHUD.on('pointerup',pointer => {
                if(this.mouseClick){
                    this.mouseClick=false;
                }
                });

                this.pauseHUD.on('pointerdown',pointer => {
                    if(!this.mouseClick){
                        
                        this.escena.Pausar();
                    console.log("Pausa");
                        this.mouseClick=true;
                }
                    
                    });
                    this.pauseHUD.on('pointerup',pointer => {
                        if(this.mouseClick){
                            this.mouseClick=false;
                        }
                        });


        this.x= this.lvM.GetPlayerX()-500;
        this.y=this.lvM.GetPlayerY()+300;
        //this.getAt(0).x = this.getAt(0).x+1;
     
        this.AvanzarPlayerHUD();
    }


    SetModifier(modifier){
        if(modifier == 'normal'){
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 300;
        }
        
        else if(modifier == 'antigravedad'){
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 300;
        }
        
        else if(modifier == 'jetpack'){
            this.jetpackHUD.y=100;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 300;
        }
       
        else if(modifier == 'gancho'){
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=100;
            this.bombaHUD.y = 300;
        }
        else if(modifier == 'bomba'){
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 100;
        }
       
    }

    AvanzarPlayerHUD(){
        this.playerHUD.x = this.playerHUD.x+1;
    }
}