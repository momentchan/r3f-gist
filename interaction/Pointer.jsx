import { useFrame } from '@react-three/fiber'
import { BallCollider, RigidBody } from '@react-three/rapier'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Pointer({ vec = new THREE.Vector3() }) {
    const ref = useRef()
    useFrame(({ mouse, viewport }) =>
        ref.current?.setNextKinematicTranslation(vec.set((mouse.x * viewport.width) / 2, (mouse.y * viewport.height) / 2, 0)))

    return (
        <RigidBody position={[0, 0, 0]} type='kinematicPosition' colliders={false} ref={ref}>
            <BallCollider args={[1]} />
        </RigidBody>
    )
}