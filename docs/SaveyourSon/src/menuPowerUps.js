
export default class MenuPowerUps extends Phaser.Scene {

    constructor() {
      super(/*{ key: 'main' }*/ 'MenuPowerUps');
    this.fuelPrice=10;
    this.speedImprovementPrice=5;
    this.speedPenalizationPrice=5;
    this.releaseDtoPrsionerPrice=6;
    }

    preload() {

        this.load.image('sky', './SaveyourSon/assets/sky.png');
        this.load.image('botonCompra','./SaveyourSon/assets/boton_Compra_verde.png');
        this.load.image('botonMejora','./SaveyourSon/assets/Mejoras_Verde.png');
        this.load.image('arrow','./SaveyourSon/assets/Arrow.png')
        this.load.image('FondoLlaveHUD','./SaveyourSon/assets/FondoLlaveHUD.png');
        this.load.image('Llave','./SaveyourSon/assets/Key.png');
       // this.load.image('nextLevel','');
        this.load.bitmapFont('font', './SaveyourSon/assets/carrier_command.png', './SaveyourSon/assets/carrier_command.xml');      


    }

    create(data) {
        this.gM=data;
        
        this.mouseClick=false;
        this.add.image(10, 10, 'sky').setScale(3.5);
        this.add.image(100,100,'FondoLlaveHUD').setScale(3);
        this.add.image(100,90,'Llave').setScale(1);
        this.textoLLaves= this.add.text(95,135,'0');
        this.textoLLaves.setAlign('center');
        this.textoLLaves.setFont('Arial Black');
        this.textoLLaves.setFontSize(40);
        this.Mejora = this.add.sprite(470,300,'botonMejora');
        this.Mejora.setScale(0.25);
        this.buttonSpeedImprovement = this.add.sprite(850,296,'botonCompra').setInteractive();
        this.buttonSpeedImprovement.setScale(0.115);
        this.Mejora2 = this.add.sprite(470,500,'botonMejora');
        this.Mejora2.setScale(0.25);
        this.buttonSpeedPenalization = this.add.sprite(850,496,'botonCompra').setInteractive();
        this.buttonSpeedPenalization.setScale(0.115);
        this.arrow = this.add.sprite(1200,950,'arrow').setInteractive();
        this.arrow.setScale(2);
        this.Mejora3 = this.add.sprite(470,700,'botonMejora');
        this.Mejora3.setScale(0.25);
        this.buttonfuel= this.add.sprite(850,696,'botonCompra').setInteractive();
        this.buttonfuel.setScale(0.115);
        this.add.bitmapText(721, 285, 'font', 'comprar');
        this.add.bitmapText(721, 485, 'font', 'comprar');
        this.add.bitmapText(721, 685, 'font', 'comprar');
        this.add.bitmapText(290, 285, 'font', 'mas velocidad').setScale(0.5);
        this.add.bitmapText(290, 485, 'font', 'Alcaide mas\n\n   lento').setScale(0.5);
        this.add.bitmapText(290, 685, 'font', 'Mejora Jetpack').setScale(0.5);

    }


    preupdate(time, delta) {
        this.textoLLaves.setText(this.gM.keys);
        
this.arrow.on('pointerdown',pointer => {
if(!this.mouseClick){
    this.scene.start(this.gM.GetSuperNextScene(), this.gM);
}
this.mouseClick=true;
});

this.Mejora.on('pointerup',pointer => {
    if(this.mouseClick){
        console.log('adios');
    }
    this.mouseClick=false;
    });


    this.buttonSpeedImprovement.on('pointerdown',pointer => {
        if(!this.mouseClick){
            if(this.gM.GetKey()>=this.speedImprovementPrice){
            this.gM.AddSpeedImprovment(1);
            console.log("before"+this.gM.GetKey()+" "+this.gM.GetSpeedImprovments());
            this.gM.AddKeys(-this.speedImprovementPrice);
            console.log("after"+this.gM.GetKey());
            }

        }
        this.mouseClick=true;
        });
        
    this.buttonSpeedImprovement.on('pointerup',pointer => {
            this.mouseClick=false;
            });


     this.buttonSpeedPenalization.on('pointerdown',pointer => {
                if(!this.mouseClick){
                    if(this.gM.GetKey()>=this.speedPenalizationPrice){
                    this.gM. AddSpeedPenalization(1);
                    console.log("before"+this.gM.GetKey()+" "+this.gM.GetSpeedPenalizations());
                    this.gM.AddKeys(-this.speedPenalizationPrice);
                    console.log("after"+this.gM.GetKey());
                    }
        
                }
                this.mouseClick=true;
                });
                
    this.buttonSpeedPenalization.on('pointerup',pointer => {
                    this.mouseClick=false;
                    });
                    this.buttonfuel.on('pointerdown',pointer => {
                        if(!this.mouseClick){
                            if(this.gM.GetKey()>=this.fuelPrice){
                            this.gM. AddJetPackImprovment(1);
                            console.log("before"+this.gM.GetKey()+" "+this.gM.GetJetpackImprovements());
                            this.gM.AddKeys(-this.fuelPrice);
                            console.log("after"+this.gM.GetKey());
                            }
                
                        }
                        this.mouseClick=true;
                        });
                        
            this.buttonfuel.on('pointerup',pointer => {
                            this.mouseClick=false;
                            });
                
                }
        }
