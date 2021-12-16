import React, { useEffect, useState } from 'react';

function useDeviceWidth(){
    const [windowWidth, setWindowWidth] = useState(0);

    useEffect(()=>{
        getWidth();
        window.addEventListener('resize', getWidth);
        return()=> window.addEventListener('resize', getWidth ); 
    },[]);

    const getWidth = () => { 
        const width = window.innerWidth;
        setWindowWidth(width);
    }

    return windowWidth;
}
export default useDeviceWidth;
