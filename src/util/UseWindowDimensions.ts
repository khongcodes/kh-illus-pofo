//                                                             src/views/Home.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Home page
//  - serve Illustration Gallery and Lightbox

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO
// 1. trim the fat on deploy

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. models & config data
// 3. components & assets
// 4. styles

import { useState, useEffect } from 'react';

// function getWindowDimensions() {
//   const { innerWidth: windowWidth, innerHeight: windowHeight } = window;
//   return {
//     windowWidth,
//     windowHeight
//   };
// }

function getWindowWidth() {
  const { innerWidth: windowWidth } = window;
  return { windowWidth };
}

export default function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowWidth());

  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowWidth());
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return windowDimensions;
}