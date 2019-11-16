import PowerUp from "./powerup.js";
export default class HookGun extends PowerUp{
    constructor(scene,levelManager){
        let x=700;
        let y=200;
        super(scene,x,y,'HookGun');
        this.picked=false;
        this.lvM=levelManager;
        this.xSpeed=0;
        this.ySpeed=0;
        scene.add.existing(this);    
    scene.physics.add.existing(this);      
    }
    PickGun(){
        this.picked=true;
    }
    Update(player){
        this.x=this.lvM.GetPlayerX();
        this.y=this.lvM.GetPlayerY();

    }
}