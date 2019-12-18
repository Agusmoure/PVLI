export default class LevelChanger extends Phaser.GameObjects.Sprite{

    constructor(scene,gameManager,levelManager,xPos,yPos){
    let x=xPos;
    let y=yPos;
    super(scene,x,y,'door');
    scene.add.existing(this);
    scene.physics.add.existing(this);
    this.scene=scene;
    this.lvM=levelManager;
    this.gM=gameManager;
    }
    //metodo que cambia de nivel
    ChangeLevel(){
        if(this.lvM!=undefined&&this.lvM!=null){
            this.gM.AddKeys(this.lvM.GetKey())
        }
        this.scene.start(this.gM.GetSuperNextScene(), this.gM);


    }
}