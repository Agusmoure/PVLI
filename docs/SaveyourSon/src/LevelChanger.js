export default class LevelChanger extends Phaser.GameObjects.Sprite{

    constructor(scene,gameManager,levelManager,xPos,yPos){
    let x=40600;
    let y=200;
    super(scene,x,y,'door');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene=scene;
    this.lvM=levelManager;
    this.gM=gameManager;
    }
    ChangeLevel(){
        if(this.lvM!=null){
            this.gM.AddKeys(this.lvM.GetKey())
        }
        this.scene.start(this.gM.GetSuperNextScene(), this.gM);


    }
}