
export default class HUD extends Phaser.GameObjects.Container{
    constructor(scene,xInit, yInit,levelManager, end, texto){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y);
        scene.add.existing(this);   
        
        scene.physics.add.existing(this);    
        this.lvM=levelManager;
        this.modifier='normal';
        this.escena = scene;
        this.largoEscena= end;
        this.fondoLLaveHUD = scene.add.sprite(0,-700,'interfazFondoLlave').setScale(3);
        this.add(this.fondoLLaveHUD);
        this.iconoLlave = scene.add.sprite(0,-720,'key');
        this.add(this.iconoLlave);

        this.textoLlaves = texto;
        this.add(this.textoLlaves);
        this.textoLlaves.x=-5;
        this.textoLlaves.y=-665;
        
        this.barra = scene.add.sprite(550,100,'barraProgreso').setScale(3.5);
        this.add(this.barra);
            this.ContornoModifier = scene.add.sprite(0,100,'interfazModifier').setScale(3);
            this.add(this.ContornoModifier);

        this.jetpackHUD = scene.add.sprite(0,100,'jetpackHUD').setScale(0.2);
        this.add(this.jetpackHUD);

        this.antigravedadHUD = scene.add.sprite(10,90,'antigravedadHUD').setScale(0.5);
        this.add(this.antigravedadHUD);
        
        this.bombaHUD = scene.add.sprite(0,100,'bomba');
        this.add(this.bombaHUD);
        
        this.playerHUD = scene.add.sprite(200,100,'iconoPlayer').setScale(0.3);
        this.add(this.playerHUD);
        
        this.hookGunHUD = scene.add.sprite(0,100,'hookHUD').setScale(0.2);
        this.add(this.hookGunHUD);
        
        this.avaliableModifierHUD = scene.add.sprite(0,100,'modifierNoDisponible').setScale(0.2);
        this.add(this.avaliableModifierHUD);

    // this.muteHUD = scene.add.sprite(1100,-750,'playerHUD').setScale(0.1);
    // this.muteHUD.setInteractive();
    // this.add(this.muteHUD);

    // this.pauseHUD = scene.add.sprite(1000,-750,'playerHUD').setScale(0.1);
    // this.pauseHUD.setInteractive();
    // this.add(this.pauseHUD);

    this.metaHUD = scene.add.sprite(1000,100,'meta').setScale(0.1);
    this.add(this.metaHUD);


this.mouseClick=false;
this.pause = false;
    
    }
 
    preUpdate(time, delta){
        // this.muteHUD.on('pointerdown',pointer => {
        //     if(!this.mouseClick){
        //     console.log("Muteado");
        //         this.mouseClick=true;
        // }
            
        //     });
        //     this.muteHUD.on('pointerup',pointer => {
        //         if(this.mouseClick){
        //             this.mouseClick=false;
        //         }
        //         });

        //         this.pauseHUD.on('pointerdown',pointer => {
        //             if(!this.mouseClick){
                        
        //                 this.escena.Pausar();
        //             console.log("Pausa");
        //                 this.mouseClick=true;
        //         }
                    
        //             });
        //             this.pauseHUD.on('pointerup',pointer => {
        //                 if(this.mouseClick){
        //                     this.mouseClick=false;
        //                 }
        //                 });


        this.x= this.lvM.GetPlayerX()-500+100;//El 500 es para que se situe con respecto al player y el + 100 debido al offset de la camara
        this.y=this.lvM.GetPlayerY()+300-125; // Igual que con la posicion x
        //this.getAt(0).x = this.getAt(0).x+1;
     
        if(!this.lvM.PlayerModifierAvaliable())
        this.avaliableModifierHUD.y=100;
        else
        this.avaliableModifierHUD.y=300;

        this.textoLlaves.setText(this.lvM.keys);
        this.AvanzarPlayerHUD();
    }


    SetModifier(modifier){
        if(modifier == 'normal'){
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 300;
            this.antigravedadHUD.y=300;
            this.avaliableModifierHUD.y=300;
        }
        
        else if(modifier == 'antigravedad'){
            this.antigravedadHUD.y=100;
            this.jetpackHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 300;
            this.avaliableModifierHUD.y=300;
        }
        
        else if(modifier == 'jetpack'){
            this.jetpackHUD.y=100;
            this.antigravedadHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 300;
            this.avaliableModifierHUD.y=300;
        }
       
        else if(modifier == 'gancho'){
            this.jetpackHUD.y=300;
            this.antigravedadHUD.y=300;
            this.hookGunHUD.y=100;
            this.bombaHUD.y = 300;
            this.avaliableModifierHUD.y=300;
        }
        else if(modifier == 'bomba'){
            this.jetpackHUD.y=300;
            this.antigravedadHUD.y=300;
            this.hookGunHUD.y=300;
            this.bombaHUD.y = 100;
            this.avaliableModifierHUD.y=300;
        }
       
    }

    AvanzarPlayerHUD(){

        this.playerHUD.x = 200+(((100*this.lvM.GetPlayerX())/this.largoEscena)*800)/100;
    }
}