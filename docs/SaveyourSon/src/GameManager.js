export default class GameManager{
    constructor(){
        this.keys=0;//En esta variable guardaremos las llaves que el jugador tiene para comprar mejoras
        this.scene=4;//en esta escena guardaremos la escena en la que nos encontramos 
        this.speedImprovmentsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la velocidad del jugador
        this.speedPenalizationBought=0;//En esta variable se guardará cuantas veces hemos reducido la velocidad del alcaide
        this.jetpacksImprovementsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la resistencia del jetpack
        this.maxImprovemnts=5;

        this.scenesForPlay=['Level1','MenuPowerUps','Level2','MenuPowerUps','Level3']
    }
    GetKey(){
        return this.keys;
    }
    GetCurrentScene(){
        return this.scene;
    }
    GetSpeedImprovments(){
        return this.speedImprovmentsBought;
    }
    GetSpeedPenalizations(){
        return this.speedPenalizationBought;
    }
    GetJetpackImprovements(){
        return this.jetpacksImprovementsBought;
    }
    GetBombImprovments(){
        return this.bombImprovmentBought;
    }
    GetCatapultImprovments(){
        return this.catapultImprovmentBought;
    }
    AddKeys(keysToAdd){
this.keys+=keysToAdd;
if(this.keys<0) this.keys=0;
    }
    GoNextScene(){
    this.scene+=1;
}
    AddSpeedImprovment(improvedSpeedBought){
        this.speedImprovmentsBought+=improvedSpeedBought;
    }
    AddSpeedPenalization(penalizatedSpeedBought){
        this.speedPenalizationBought+=penalizatedSpeedBought;
    }
    AddJetPackImprovment(improvementJetpackBought){
        this.jetpacksImprovementsBought+=improvementJetpackBought;
    }
    AddBombImprovement(bombsImprovement){
        this.bombImprovmentBought+=bombsImprovement;
    }
    AddCatapultImprovement(catapultsImprovent){
        this.catapultImprovmentBought+=catapultsImprovent;
    }
    GetSuperNextScene(){
        this.scene++;
        console.log(this.scenesForPlay[this.scene]);
        return this.scenesForPlay[this.scene];
    }
    GetMaxImprovements(){
        return this.maxImprovemnts;
    }
}