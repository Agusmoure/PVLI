using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class magnetpickme : MonoBehaviour {

	// Use this for initialization
	void Start () {
        transform.GetChild(0).transform.gameObject.SetActive(false);
	}
	
	// Update is called once per frame
	void Update () {
        if(Input.GetKeyDown(KeyCode.Space))
        transform.GetChild(0).transform.gameObject.SetActive(true);
    }
}
