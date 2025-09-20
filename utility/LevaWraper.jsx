import { useState, useEffect } from 'react';
import { Leva } from 'leva';
import { customTheme } from "./levaTheme.js";


export default function LevaWraper({ initialHidden = false }) {

    const [hidden, setHidden] = useState(initialHidden);

    useEffect(() => {
        const handleKeyPress = (event) => {
            if (event.code === 'KeyH') {
                setHidden(prev => !prev);
            }
        };

        window.addEventListener('keydown', handleKeyPress);
        return () => {
            window.removeEventListener('keydown', handleKeyPress);
        };
    }, []);
 
    return (
        <Leva theme={customTheme} hidden={hidden} />
    )
}