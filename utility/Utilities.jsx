import { useEffect } from "react";
import * as THREE from 'three'

export function getRandomVectorInsideSphere(radius) {
    const vector = new THREE.Vector3();
    vector.set(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
    vector.normalize().multiplyScalar(Math.random() * radius);
    return vector;
}

export default function Utilities({ screenshot = true }) {

    if (screenshot) {
        useEffect(() => {
            const handleKeyDown = (event) => {
                if (event.key === 's') {
                    Screenshot()
                }
            };

            window.addEventListener('keydown', handleKeyDown);

            return () => {
                window.removeEventListener('keydown', handleKeyDown);
            };
        }, []);
    }


    return <>
    </>
}

export function Screenshot(name = 'Screenshot.png') {
    const link = document.createElement('a')
    link.setAttribute('download', name)
    link.setAttribute('href', document.querySelector('canvas').toDataURL('image/png').replace('image/png', 'image/octet-stream'))
    link.click()
}