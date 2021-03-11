//                                                    src/viewsCommon/Gallery.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - take in gallery metadata and build slideshow components
//  - handle slideshow state
//  - call ResizingThumbGallery


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO
// 1. on deploy, setup getting img src from data path/thumb members
// 
// CURRENTLY:
// use galleryMetadata index to index-match to thumbnailSrcArray, holding img srcs in array

// IN THE FUTURE:
// use galleryMetadata object's path/thumb members to pull images from 3rd party host


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. types & config data
// 3. components & assets
// 4. styles
// 5. lazy imports

import React, { Suspense, lazy, useState, useRef, useContext, MutableRefObject, forwardRef, useEffect } from 'react';

import { 
  OuterGalleryProps, LightboxRef, LightboxProps,    // main component prop types
  TimeoutState, ArrowDirection, KeyMapValueTypes    // component state types
 } from '../model/Gallery';

import { mobileBreakpoint } from "./Layout";

import { TabAccessContext } from '../util/TabAccessContext';
import useWindowDimensions from '../util/UseWindowDimensions';

import galleryStyles from '../assets/style/Gallery.module.sass';

const ResizingThumbGallery = lazy(() => import('./ResizingThumbGallery'));


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

// Lightbox: FC
// function: take in slidehsow navigation state and controls
//           manage user input with slideshow navigation/interaction
//           big mouseover event listener tracking if mouse position is left/right of center
//      why: separate concern - the Lightbox is its own whole sphere under the Gallery's leash
const Lightbox = forwardRef<LightboxRef, LightboxProps>(({ 
  currentImg, returnNextImg, returnPrevImg,
  toNextImg, toPrevImg, closeLightbox,
  imgArray, galleryMetadata,
  tabIndex
}, lightboxRef) => {
  
  useEffect(() => {
    if (tabIndex !== -1) {
      const lightboxDiv = lightboxRef as MutableRefObject<HTMLDivElement>;
      lightboxDiv.current.focus();
    }
  }, [tabIndex, lightboxRef]);

  const isLightboxHidden = currentImg === null;

  const { windowHeight, windowWidth } = useWindowDimensions();
  const midBoundary = windowWidth / 2;

  const [leftArrowStatus, setLeftArrow] = useState<TimeoutState>({
    timerGoing: false,
    active: false
  });
  const [rightArrowStatus, setRightArrow] = useState<TimeoutState>({
    timerGoing: false,
    active: false
  });
  
  const activateArrow = (direction: ArrowDirection) => {
    // if one arrow becomes activated by user moving mouse over center of page,
    // set up the arrow on the opposite side to be deactivated

    let setReferencedArrow: React.Dispatch<React.SetStateAction<TimeoutState>>;
    let referencedArrowStatus: TimeoutState;
    let setOpposedArrow: React.Dispatch<React.SetStateAction<TimeoutState>>;
    let opposedArrowStatus: TimeoutState;

    switch (direction) {
      case "left":
        setReferencedArrow = setLeftArrow;
        referencedArrowStatus = leftArrowStatus;
        setOpposedArrow = setRightArrow;
        opposedArrowStatus = rightArrowStatus;
        break;
      case "right":
        setReferencedArrow = setRightArrow;
        referencedArrowStatus = rightArrowStatus;
        setOpposedArrow = setLeftArrow;
        opposedArrowStatus = leftArrowStatus;
        break;
    }

    // start a timer that, after interval, returns the arrow's timerGoing member to false
    const refreshTimer = () => {
      const timer = setTimeout(
        (() => setReferencedArrow({ timerGoing: false, active: false })
      ),850);
      setReferencedArrow({ timerGoing: timer, active: true })
    }

    // clear opposed timer if there is one
    if (opposedArrowStatus.timerGoing !== false) {
      clearTimeout(opposedArrowStatus.timerGoing as NodeJS.Timeout);
      setOpposedArrow({ timerGoing: false, active: false });
    }

    // set current arrow timer, or reset it if there already is one
    if (referencedArrowStatus.timerGoing !== false) {
      clearTimeout(referencedArrowStatus.timerGoing as NodeJS.Timeout);
    }
    refreshTimer();
  };

  // switch which arrows are activated on mouseX
  const handleMouseOver = (event: React.MouseEvent) => {
    if (event.clientX <= midBoundary) {
      activateArrow("left");
    } else {
      activateArrow("right");
    }
  };

  const lightboxCloseEl = useRef<HTMLDivElement>(null!);


  // Check mouse position
  // if inside close button bounded rectangle, close lightbox
  // else change slide
  const handleLightboxClick = (event: React.MouseEvent) => {
    
    const viewIsMobile = windowWidth <= mobileBreakpoint;

    const desktopFairGameBounds = {
      top: windowHeight * 0.03,
      left: 24,
      bottom: windowHeight * 0.96,
      right: windowWidth - 24
    };
    const mobileFairGameBounds = {
      top: 0,
      left: 0,
      bottom: windowHeight,
      right: windowWidth
    };
    const fairGameBounds = viewIsMobile ? mobileFairGameBounds : desktopFairGameBounds;

    const mouseOutX = event.clientX < fairGameBounds.left || event.clientX > fairGameBounds.right;
    const mouseOutY = event.clientY < fairGameBounds.top || event.clientY > fairGameBounds.bottom;
    const mouseOutOfBounds = mouseOutX || mouseOutY;

    const closeRect = lightboxCloseEl.current.getBoundingClientRect();
    const mouseXIntersect = event.clientX >= closeRect.left && event.clientX <= closeRect.right;
    const mouseYIntersect = event.clientY >= closeRect.top && event.clientY <= closeRect.bottom;
    const mouseIntersectClose = mouseXIntersect && mouseYIntersect;

    if (mouseOutOfBounds || mouseIntersectClose) {
      closeLightbox();
      
      // if desktopView
    } else {
      const desktopNavBounds = {
        left: (midBoundary - 1),
        right: midBoundary
      };
      const mobileNavBounds = {
        left: (0.3 * windowWidth),
        right: (0.7 * windowWidth)
      };
      const navBounds = !viewIsMobile ? desktopNavBounds : mobileNavBounds;
      const clickNavLeft = event.clientX <= navBounds.left;
      const clickNavRight = event.clientX >= navBounds.right;
      if (clickNavLeft) {
        toPrevImg();
      } else if (clickNavRight) {
        toNextImg();
      }
    }

  }


  // don't render metainfo if there is no metainfo
  // for: /sketch page gallery
  const dontRenderMeta = galleryMetadata[0].title === "";

  // handler for navigation elements
  const ifInputMatchEnterOrKeyThen = ( input: string, key: KeyMapValueTypes, callback: VoidFunction) => {
    if (["Enter", key].includes(input)) {
      callback();
    }
  }

  return (
    <div>
      <div 
        className={`${galleryStyles.lightboxRoot} ${isLightboxHidden ? galleryStyles.hidden : ''}`}
        ref={lightboxRef}
        onMouseMove={handleMouseOver}
        onClick={handleLightboxClick}
        tabIndex={tabIndex}
        onKeyDown = {event => {
          switch (event.key) {
            case "Escape":
                closeLightbox();
              break;
            case " ":
            case "ArrowRight":
                toNextImg();
              break;
            case "ArrowLeft":
                toPrevImg();
              break;
          }
        }}
      >
        <div className={galleryStyles.carouselWrapper}>
          <div className={galleryStyles.carousel}>
            {/* later derive SRC of this image from galleryMetadata[currentImg].path */}
            {galleryMetadata.map(data => {
              // query the item in the stack -
              //    are you the current image?
              //    are you the previous image?
              //    are you the next image?
              // based on the answer, give the div the appropriate classname for styling
              const isThisImgActive = data.id === currentImg;
              const isThisPrevOfActive = data.id === returnPrevImg(currentImg);
              const isThisNextOfActive = data.id === returnNextImg(currentImg);
              
              let imgClassModifier: string;

              if (isThisImgActive) {
                imgClassModifier = galleryStyles.activeImg;
              } else if (isThisPrevOfActive) {
                imgClassModifier = galleryStyles.prevImg;
              } else if (isThisNextOfActive) {
                imgClassModifier = galleryStyles.nextImg;
              } else {
                imgClassModifier = ''
              }

              return (
                <div 
                  className={`${galleryStyles.lightboxImgContainer} ${imgClassModifier}`}
                  key={data.id}
                >
                  <img 
                    className={galleryStyles.lightboxImg}
                    src={imgArray[data.id]}
                    alt={data.alt}
                  />
                  {
                    dontRenderMeta ? <></> 
                    :
                    <div className={`${galleryStyles.imgMetaContainer}`}>
                      <h1>{data.title}</h1>
                      <p>{data.description}</p>
                    </div>
                  }
                </div>
              )
            })}
              
          </div>
        </div>
        
        {/* left arrow */}
        <div 
          className={`${galleryStyles.lightboxLeft} ${leftArrowStatus.timerGoing ? galleryStyles.active : ''}`} 
          onClick={toPrevImg}
          tabIndex={tabIndex}
          onKeyDown = {(event) => ifInputMatchEnterOrKeyThen(event.key, "ArrowLeft", toPrevImg)}
        > 
          <span className={galleryStyles.arrow}>
            &lt;
          </span>
        </div>

        {/* right arrow */}
        <div 
          className={`${galleryStyles.lightboxRight} ${rightArrowStatus.timerGoing ? galleryStyles.active : ''}`}
          onClick={toNextImg}
          tabIndex={tabIndex}
          onKeyDown = {(event) => ifInputMatchEnterOrKeyThen(event.key, "ArrowRight", toNextImg)}
        > 
          <span className={galleryStyles.arrow}>
            &gt;
          </span>
        </div>

        <div 
          className={`${galleryStyles.lightboxClose} ${isLightboxHidden ? galleryStyles.hidden : ''}`}
          ref={lightboxCloseEl}
          tabIndex={tabIndex}
          onKeyDown = {event => ifInputMatchEnterOrKeyThen(event.key, "Escape", closeLightbox)}
        >
            <span style={{userSelect: 'none'}}> X </span>
        </div>
      </div>
    </div>
  )
})


// Gallery: FC (main)
// function: intake image metaData and display a gallery and slideshow
//           contain state for slideshow - currentImg and open/closed
//      why: this component will be able to be called and create a gallery+slideshow 
//           on any page with any imagemetadata set
const Gallery = ({ imgArray, galleryMetadata }: OuterGalleryProps) => {
  // setup image array
  const [currentImg, setCurrentImg] = useState<number | null>(null);
  const firstImgIndex = 0;
  const lastImgIndex = imgArray.length-1;

  // methods for implementing ruby-like arrays -
  // negative indices revert to negative-from-end index being pulled
  const returnPrevImg = (imgIndex: number | null): number | null => {
    if (imgIndex !== null) {
      return (imgIndex !== firstImgIndex) ? imgIndex - 1 : lastImgIndex;
    } else {
      return imgIndex;
    }
  }
  const returnNextImg = (imgIndex: number | null): number | null => {
    if (imgIndex !== null) {
      return (imgIndex !== lastImgIndex) ? imgIndex + 1 : firstImgIndex;
    } else {
      return imgIndex;
    }
  }
  const toNextImg = (): void => {
    if (currentImg !== null) {
      setCurrentImg(returnNextImg(currentImg))
    }
  }
  const toPrevImg = (): void => {
    if (currentImg !== null) {
      setCurrentImg(returnPrevImg(currentImg))
    }
  }

  const tabAccessControl = useContext(TabAccessContext);
  const lightboxTabIndex = tabAccessControl.scheme[tabAccessControl.tabAccessMode].lightbox;

  const lightboxEl = useRef<HTMLDivElement | null>(null);

  // while lightbox is open, hide scrollbar and prevent scrolling
  // also create gap replacing righthand scrollbar to prevent disruption of body on modal open
  // then reset it
  const closeLightbox = (): void => {
    document.body.style.overflowY="unset";
    document.body.style.paddingRight = `0px`;
    tabAccessControl.switchTabAccessMode("lightbox");
    setCurrentImg(null);
  };
  const openLightbox = (index: number): void => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    document.body.style.overflowY = "hidden";

    tabAccessControl.switchTabAccessMode("lightbox");
    setCurrentImg(index);
  };
  
  return (
    <>
      <div>
        <Lightbox 
          currentImg = {currentImg}
          toNextImg = {toNextImg}
          toPrevImg = {toPrevImg}
          returnNextImg = {returnNextImg}
          returnPrevImg = {returnPrevImg}
          closeLightbox = {closeLightbox}
          imgArray = {imgArray}
          galleryMetadata = {galleryMetadata}
          tabIndex = {lightboxTabIndex}
          ref={lightboxEl}
        />
      </div>
      
      <Suspense fallback={<div/>}>
        <ResizingThumbGallery 
          imgArray = {imgArray}
          galleryMetadata = {galleryMetadata}
          openLightbox = {openLightbox}
        />
      </Suspense>

    </>
  )
}

export default Gallery