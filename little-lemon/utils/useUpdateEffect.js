import { useRef, useEffect } from "react";

const useUpdateEffect = (effect, dependencies = []) => {
    const firstLoad = useRef(true);

    useEffect(() => {
        if (firstLoad.current) {
            firstLoad.current = false;
        } else {
            return effect();
        }

    }, dependencies)
}


export default useUpdateEffect;