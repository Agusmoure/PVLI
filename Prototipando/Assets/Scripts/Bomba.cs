using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Bomba : MonoBehaviour {


    public float fuerza;
	// Use this for initialization
	void Start () {
		
	}
	
	// Update is called once per frame
	void Update () {
		
	}

    private void OnTriggerEnter2D(Collider2D other)
    {
        if (other.gameObject.CompareTag("Player")){

            Debug.Log("Hola");
            Jetpack jet = other.gameObject.GetComponent<Jetpack>();
            jet.Boom(new Vector2(other.gameObject.transform.position.x -transform.position.x, other.gameObject.transform.position.y -transform.position.y).normalized, fuerza);

        }
    }

    
}
