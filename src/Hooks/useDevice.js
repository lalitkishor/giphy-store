import React, { useEffect, useState } from "react";

function useDevice() {
  const [isMobile, setIsMobile] = useState(false);
  const [isTab, setIsTab] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  useEffect(() => {
    updateDeviceType();
    window.addEventListener("resize", updateDeviceType);
    return () => {
      window.removeEventListener("resize", updateDeviceType);
    };
  }, []);

  const updateDeviceType = () => {
    const width = window.innerWidth;
    if (width <= 500) {
      setIsMobile(true);
      setIsTab(false);
      setIsDesktop(false);
    } else if (500 < width  && width <= 800) {
      setIsTab(true);
      setIsDesktop(false);
      setIsMobile(false);
    } else {
      setIsDesktop(true);
      setIsTab(false);
      setIsMobile(false);
    }
  };
  return { isMobile, isTab, isDesktop };
}

export default useDevice;
