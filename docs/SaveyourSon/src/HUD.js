
export default class HUD extends Phaser.GameObjects.Container{
    constructor(scene,xInit, yInit,levelManager, end){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y);
        scene.add.existing(this);    
    scene.physics.add.existing(this);    
    this.lvM=levelManager;
    this.modifier='normal';
    this.escena = scene;
    this.largoEscena= end;

    this.avaliableModifierHUD = scene.add.sprite(100,100,'modifierNoDisponible').setScale(0.2);
    this.add(this.avaliableModifierHUD);
    this.jetpackHUD = scene.add.sprite(100,100,'jetpackHUD').setScale(0.2);
    this.add(this.jetpackHUD);

    this.bombaHUD = scene.add.sprite(100,100,'bomba');
    this.add(this.bombaHUD);

    this.playerHUD = scene.add.sprite(200,100,'iconoPlayer').setScale(0.3);
    this.add(this.playerHUD);
    
    this.hookGunHUD = scene.add.sprite(100,100,'hookHUD').setScale(0.2);
    this.add(this.hookGunHUD);

    this.muteHUD = scene.add.sprite(1100,-750,'playerHUD').setScale(0.1);
    this.muteHUD.setInteractive();
    this.add(this.muteHUD);

    this.pauseHUD = scene.add.sprite(1000,-750,'playerHUD').setScale(0.1);
    this.pauseHUD.setInteractive();
    this.add(this.pauseHUD);

    this.metaHUD = scene.add.sprite(100,100,'meta').setScale(0.1);
    this.add(this.metaHUD);

    this.ContornoModifier = scene.add.sprite(100,100,'interfazModifier').setScale(0.3);
    this.add(this.ContornoModifier);


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
     
        if(!this.lvM.PlayerModifierAvaliable())
        this.avaliableModifierHUD.y=100;
        else
        this.avaliableModifierHUD.y=300;

        this.AvanzarPlayerHUD();
    }


    SetModifier(modifier){
        if(modifier == 'normal'){
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 300;
            this.avaliableModifierHUD.y=300;
        }
        
        else if(modifier == 'antigravedad'){
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 300;
            this.avaliableModifierHUD.y=300;
        }
        
        else if(modifier == 'jetpack'){
            this.jetpackHUD.y=100;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 300;
            this.avaliableModifierHUD.y=300;
        }
       
        else if(modifier == 'gancho'){
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=100;
            this.bombaHUD.y = 300;
            this.avaliableModifierHUD.y=300;
        }
        else if(modifier == 'bomba'){
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 100;
            this.avaliableModifierHUD.y=300;
        }
       
    }

    AvanzarPlayerHUD(){

        this.playerHUD.x = 200+(((100*this.lvM.GetPlayerX())/this.largoEscena)*800)/100;
    }
}