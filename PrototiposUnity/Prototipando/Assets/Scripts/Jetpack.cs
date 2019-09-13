using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Jetpack : MonoBehaviour {
    public bool impulse;
    public float impulseForce,maxSpeed, speed;
    Rigidbody2D rigi;
	// Use this for initialization
	void Start () {
        rigi = GetComponent<Rigidbody2D>();
	}
	
	// Update is called once per frame
	void FixedUpdate () {
        if(Input.GetAxis("Vertical")>0)
        if (impulse&&rigi.velocity.y<maxSpeed)
        {
            rigi.AddForce(new Vector2(0, impulseForce), ForceMode2D.Impulse);
        }
        else
        {
            rigi.velocity = new Vector2 (rigi.velocity.x,speed);
        }
	}
}
