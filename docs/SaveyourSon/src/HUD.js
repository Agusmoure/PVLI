
export default class HUD extends Phaser.Gamobject.Container{
    constructor(scene,xInit, yInit,levelManager){
        
    
        let x=xInit;
        let y=yInit;
        super(scene,x,y);
        scene.add.existing(this);    
    scene.physics.add.existing(this);    
    this.lvM=levelManager;
    this.modifier='normal';
    }
 
    preUpdate(time, delta){
        //this.getAt(0).x = this.getAt(0).x+1;
        this.modifier= this.lvM.GetPlayerModifier();
        switch(variable){
            case 'normal':
                break;
                case 'jetpack':
                break;
                case 'antigravedad':
                break;
                case 'gancho':
                break;

        }
        if(this.modifier == 'normal')
        for(let i=0;i<5;i++){
            this.getAt(i).visible = false;
        }
        else if(this.modifier == 'normal')
    }
}