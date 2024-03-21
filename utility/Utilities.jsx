import { useEffect } from "react";

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