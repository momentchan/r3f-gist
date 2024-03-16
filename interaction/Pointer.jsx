import { useFrame, useThree } from '@react-three/fiber'
import { BallCollider, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Pointer({ vec = new THREE.Vector3(), scale = 1 }) {
    const camera = useThree((state) => state.camera)

    const ref = useRef()
    const mousePosition = new THREE.Vector3();

    useFrame(({ mouse, viewport }) => {
        mousePosition.set((mouse.x), (mouse.y), 0.5);
        mousePosition.unproject(camera);

        const direction = mousePosition.sub(camera.position).normalize(); // Direction from camera to mouse
        const distanceToPlane = -camera.position.dot(direction); // Distance to plane along direction
        const intersection = camera.position.clone().add(direction.multiplyScalar(distanceToPlane)); // Intersection point

        // Update the pointer position
        ref.current?.setNextKinematicTranslation(intersection);
    })

    return (
        <RigidBody position={[0, 0, 0]} type='kinematicPosition' colliders={false} ref={ref}>
            <BallCollider args={[scale]} />
        </RigidBody>
    )
}