import { useFrame } from "@react-three/fiber"
import { useEffect } from "react";

/** A sample showing how to use handtrack */
export default function TrackUser({ tracker }) {


    useEffect(() => {

        const handleKeyPress = (event) => {
            if (event.key === 'p') {
                if (tracker.current) {
                    tracker.current.toggleCanvas()
                }
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);


    useFrame(() => {
        console.log(tracker.current.getPredictions());
    })

    return <>

    </>
}