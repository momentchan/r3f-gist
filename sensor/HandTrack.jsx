import * as handTrack from 'handtrackjs'
import { useEffect, useRef, useState } from 'react';

let model = null;

const modelParams = {
    flipHorizontal: true, // flip e.g for video
    maxNumBoxes: 20, // maximum number of boxes to detect
    iouThreshold: 0.5, // ioU threshold for non-max suppression
    scoreThreshold: 0.6, // confidence threshold for predictions.
};

export default function HandTrack() {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [isVideo, setIsVideo] = useState(false)

    useEffect(() => {
        // Load the model.
        handTrack.load(modelParams).then((lmodel) => {
            console.log('Model loaded.');
            model = lmodel;
            startVideo()
        });

        function startVideo() {
            handTrack.startVideo(videoRef.current).then(function (status) {
                console.log("video started", status);
                if (status) {
                    console.log("Video started. Now tracking");
                    setIsVideo(true)
                    runDetection();
                } else {
                    console.log("Please enable video");
                }
            });
        }

        function runDetection() {
            model.detect(videoRef.current).then((predictions) => {
                // console.log("Predictions: ", predictions);
                model.renderPredictions(predictions, canvasRef.current, canvasRef.current.getContext("2d"), videoRef.current);
                requestAnimationFrame(runDetection);
            });
        }

        return () => {
        };
    }, []);

    return <>
        <video ref={videoRef} autoPlay="autoplay" id="myvideo" style={{ display: 'none' }}></video>
        <canvas ref={canvasRef} id="canvas" className="canvasbox"></canvas>
    </>
}