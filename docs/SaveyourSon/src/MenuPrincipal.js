import LevelManager from "./LevelManager.js";
import GameManager from "./GameManager.js";


export default class MenuPrincipal extends Phaser.Scene {
    constructor(){
        super('MenuPrincipal')
        this.lvM = new LevelManager();
        this.gM=new GameManager();
    }

    preload(){
        this.load.image('botonPlay', './SaveyourSon/assets/MenuPrincipal/BotonPlay.png');
    }

    create(data) {
        this.gM=data;
        this.play= this.add.sprite(850,696,'botonPlay').setInteractive();

    }


    update(time, delta) {  

        this.play.on('pointerdown',pointer => {
            if(!this.mouseClick){
                this.scene.start('Level1', this.gM);
            }


        });
    }
}