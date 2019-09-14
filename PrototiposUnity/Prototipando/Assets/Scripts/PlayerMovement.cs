using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour {
    public float speedX;
    Rigidbody2D rigidbody;
	// Use this for initialization
	void Start () {
        rigidbody = GetComponent<Rigidbody2D>();
	}
	
	// Update is called once per frame
	void FixedUpdate () {
        float x = Input.GetAxis("Horizontal");
        //Cambié el velocity a add force porque si no no `podia hacer el prototipo de la bomba que te impulsa
        rigidbody.AddForce  (new Vector2(speedX * x, rigidbody.velocity.y),ForceMode2D.Force);
	}
}
