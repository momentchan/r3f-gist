import { useFrame } from "@react-three/fiber"

export default function TrackUser({ tracker }) {

    useFrame(() => {
        console.log(tracker.current.getPredictions());
    })

    return <>

    </>
}