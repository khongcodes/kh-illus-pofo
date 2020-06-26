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