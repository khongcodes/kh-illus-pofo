//                                               src/util/UseWindowDimensions.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Get window dimensions for other components
//  - Used in Lightbox part of Gallery component

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages

import { useState, useEffect } from 'react';

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

function getWindowDimensions() {
  const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
  return {
    windowWidth,
    windowHeight
  };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return windowDimensions;
}