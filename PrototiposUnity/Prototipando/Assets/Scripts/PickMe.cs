using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PickMe : MonoBehaviour {

private void OnTriggerEnter2D(Collider2D collider)
    {
        Destroy(this.gameObject);
    }
}
