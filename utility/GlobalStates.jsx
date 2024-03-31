import { useEffect } from "react";
import useGlobalStore from "./useGlobalStore";

export default function GlobalStates(){
    const { setIsMobile } = useGlobalStore();

    useEffect(() => {
        const userAgent = navigator.userAgent;
        const isMobileDevice =
            /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        setIsMobile(isMobileDevice);
    }, [])

    return <></>
}