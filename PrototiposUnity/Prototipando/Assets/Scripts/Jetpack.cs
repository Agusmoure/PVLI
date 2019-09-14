using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Jetpack : MonoBehaviour {
    public bool impulse;
    bool volar;
    public float impulseForce,maxSpeed, speed;

    //Variable que utilice para lo de a bomba
    public float delay;
    float repulsion;
    Rigidbody2D rigi;
    Vector2 dire;
	// Use this for initialization
	void Start () {
        rigi = GetComponent<Rigidbody2D>();
        repulsion = 1;
	}

    // Update is called once per frame
    void FixedUpdate()
    {
        if (Input.GetAxis("Vertical") > 0)
            if (impulse && rigi.velocity.y < maxSpeed)
            {
                rigi.AddForce(new Vector2(0, impulseForce), ForceMode2D.Impulse);
            }
            else
            {
                rigi.velocity = new Vector2(rigi.velocity.x, speed);
            }




        //Chapuza que he hecho para que le repela
        if (volar)
        {
            rigi.AddForce(new Vector2(dire.x * repulsion, dire.y * repulsion), ForceMode2D.Impulse);
            volar = false;
        }

    }

    //Metodo que ajusta la direccion del impulso y la fuerza que tendrá
    public void Boom(Vector2 dir, float fuerza)
    {
        repulsion = fuerza;
        dire = dir;
        //Invoke("Impulso", delay);
        Invoke("Impulso", delay);
    }

    // delay que he puesto para ver que tal queda con un poco de retardo
    private void Impulso()
    {
        volar = true;
    }
}
