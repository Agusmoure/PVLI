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
        rigidbody.velocity = new Vector2(speedX * x, rigidbody.velocity.y);
	}
}
