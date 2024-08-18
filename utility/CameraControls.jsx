import { OrbitControls, TrackballControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useRef } from "react";

// Smooth Zoom-in OrbitControl
export default function CameraControls(props) {
    const orbitControlRef = useRef();
    const trackballControlRef = useRef();

    useFrame(() => {
        if (orbitControlRef.current && trackballControlRef.current) {
            const target = orbitControlRef.current.target;
            orbitControlRef.current.update();
            trackballControlRef.current.target.set(target.x, target.y, target.z);
            trackballControlRef.current.update()
        }
    })
    return <>
        <OrbitControls ref={orbitControlRef} enableDamping={true} enableZoom={false} {...props} />
        <TrackballControls ref={trackballControlRef} noRotate={true} noPan={true} noZoom={false} {...props} />
    </>
}