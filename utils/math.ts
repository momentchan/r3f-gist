import * as THREE from 'three';

/**
 * Generate a random vector inside a sphere
 */
export function getRandomVectorInsideSphere(radius: number): THREE.Vector3 {
    const vector = new THREE.Vector3();
    vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    vector.normalize().multiplyScalar(Math.random() * radius);
    return vector;
}
