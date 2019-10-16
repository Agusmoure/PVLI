export default class JetPack extends Phaser.GameObjects.Sprite{
    constructor(scene){
        
    
        let x=100;
        let y=100;
        super(scene,x,y,'jetpack');
    
        this.sprite = undefined;
    }



}