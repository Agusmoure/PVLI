export default class LevelManager{
    constructor(){
        this.keys=0;
        this.bomba=undefined;      //Un futuro array de booleanos que me sirve para controlar todas las bombas del nivel (si se han lanzado aun o no)
        this.player=undefined;
        this.alcaide=undefined;
        this.liberation=false;
        this.HUD = undefined;
    }


    //Preparo el array de booleans con tantos huecos como bobas haya en el nivel
    SetNumBombas(cantidad){
        this.bomba = new Array(cantidad);
        for(let i=0;i<cantidad;i++){
            this.bomba[i]=false;
        }      
    }

    //////GETERS
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
        this.bomba[num]=true;
    }
    //Metodo que recibe el indice de una bomba y le manda si esa bomba en el array ha sido pillada o no
    LanzarBomba(num){
        return this.bomba[num];

    }
    SetPlayerX(vel){
        this.player.SetVelX(vel);
    }
    SetPlayerY(vel){
        this.player.SetVelY(vel);
    }

    //Metodo que llama una bomba al explotar para mandar la repulsion al player
    ImpulsePlayer(velX,velY){
        this.player.Impulse(velX,velY);
    }

    //LLamo al player y le informo de la cantidad de tiempo que tiee que estar stuneado
    StunPlayer(time){
this.player.getStunned(time);
    }
    

    AddKey(){
        this.keys=this.keys+1;
        console.log(this.keys);
    }



    //Una bomba me manda su posición y si se encuentra cerca del alcaide le digo que tiene que ser stuneado
    bombExplosion(bombX,bombY){
        if((Math.abs(this.alcaide.x)-Math.abs(bombX))<200 && (Math.abs(this.alcaide.y)-Math.abs(bombY))<200)
        this.alcaide.getStunned(100);

    }
    //Penalizo al alcaide
    StunAlcaide(time){
this.alcaide.getStunned(time);
    }

    //Le aviso al alcaide de que tiene que sufrir un slow
    ChangeAlcaideSpeed(slow){
        this.alcaide.ChangeSpeed(slow);
    }

    PlayerModifierAvaliable(){
        return this.player.modifierDisponible;
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
    EstoyLibre(costeLiberar){
        if(this.liberation && (this.keys-costeLiberar)>=0){
            this.keys=this.keys-costeLiberar;
            return (true);
        }
        else
        return false;
    }


    //Llamo a la HUD para que sepa que modifier tiene actualmente el layer y se actualice
    SetPlayerModifier(modifier){
        this.HUD.SetModifier(modifier);
    }

    // Soy llamado por un portal que me pasa su posicion para pasarsela al player 
  TeleportPlayer(x,y){
      this.player.body.x=x;
      this.player.body.y=y;
  } 
}