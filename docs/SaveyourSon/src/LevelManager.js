export default class LevelManager{
    constructor(){
        this.keys=0;//En esta variable guardaremos las llaves que el jugador tiene para comprar mejoras
        this.bomba=undefined;
        this.bombWall=undefined
        this.player=undefined;
        this.alcaide=undefined;
        this.liberation=false;
    //    // this.scene=0;//en esta escena guardaremos la escena en la que nos encontramos 
    //     //this.speedImprovmentsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la velocidad del jugador
    //     this.speedPenalizationBought=5;//En esta variable se guardará cuantas veces hemos reducido la velocidad del alcaide
    //     this.jetpacksImprovementsBought=0;//En esta variable se guardará cuantas veces hemos ampliado la resistencia del jetpack
    //     this.bombImprovmentBought=0;//En esta variable se guardará cuantas veces hemos ampliado la fuerza de la bomba
    //     this.catapultImprovmentBought=0;//En esta variable se guardará cuantas veces hemos ampliado la fuerza de la catapulta
    }

    SetNumBombas(cantidad){
        this.bomba = new Array(cantidad);
        this.bomba[0]=false;
        this.bomba[1]=false;
        this.bomba[2]=false;
    }
    GetPlayerX(){
        return this.player.body.x;
    }
    GetPlayerY(){
        return this.player.body.y;
    }
    GetPlayerVelX(){
return this.player.GetVelX();
    }
    GetKey(){
        return this.keys;
    }
    SetBomba(num)
    {
       // console.log(num);
        this.bomba[num]=true;
    }
    LanzarBomba(num){
return this.bomba[num];
    }
    SetPlayerX(vel){
        this.player.SetVelX(vel);
    }
    SetPlayerY(vel){
        this.player.SetVelY(vel);
    }

    ImpulsePlayer(velX,velY){
        this.player.Impulse(velX,velY);
    }

    BombExploded(posX,posY){

        this.bombWall.Destroy(posX,posY);
    }

    StunPlayer(time){
this.player.getStunned(time);
    }
    
    AddKey(){
        this.keys=this.keys+1;
        console.log(this.keys);
    }


    //Penalizo al alcaide
    StunAlcaide(time){
this.alcaide.getStunned(time);
    }
    ChangeAlcaideSpeed(slow){
        this.alcaide.ChangeSpeed(slow);
    }

    //Que vuelva a su estaod normal
    RecoverAlcaide(){
        this.alcaide.Recover();
    }

    //Indico si es posible ser liberado
    LiberarPreso(valor){
this.liberation=valor;
    }

    //Si el preso puede liberarse y ademas tengo llaves suficientes le digo que puede
    EstoyLibre(valor){
        if(this.liberation && (this.keys-valor)>=0){
            this.keys=this.keys-valor;
            return (true);
        }
        else
        return false;
    }

   
}