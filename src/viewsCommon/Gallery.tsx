import React, { useState, CSSProperties } from 'react';

import { GalleryItemShape } from '../model/GalleryShape';
import useWindowDimensions from '../util/UseWindowDimensions';
import { mobileBreakpoint, maxWindowBreakpoint } from './Layout';

import galleryStyles from '../style/Gallery.module.sass';
import galleryThumbStyles from '../style/GalleryThumbnail.module.sass';

type GalleryProps = {
  thumbnailSrcArray: string[];
  imgArray: string[];
  galleryMetadata: GalleryItemShape[];
}
type LightboxProps = {
  currentImg: number | null;
  toNextImg: VoidFunction;
  toPrevImg: VoidFunction;
  returnNextImg: (imgIndex: number | null) => number | null;
  returnPrevImg: (imgIndex: number | null) => number | null;
  closeLightbox: VoidFunction;
  imgArray: string[];
  galleryMetadata: GalleryItemShape[];
}
type TimeoutState = {
  timerGoing: boolean | NodeJS.Timeout;
  active: boolean;
}
type ArrowDirection = "left" | "right";

type ImageOrientationTypes = "portrait" | "landscape" | "square" | "";
type ImageOrientations = ImageOrientationTypes[];

// CURRENTLY:
// use galleryMetadata index to index-match to thumbnailSrcArray, holding img srcs in array

// IN THE FUTURE:
// use galleryMetadata object's path/thumb members to pull images from 3rd party host



const Lightbox = ({ 
  currentImg, returnNextImg, returnPrevImg,
  toNextImg, toPrevImg, closeLightbox,
  imgArray, galleryMetadata 
}: LightboxProps) => {

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

    // set current arrow timer, reset if there already is one
    if (referencedArrowStatus.timerGoing === false) {
      refreshTimer();
    }
    else {
      clearTimeout(referencedArrowStatus.timerGoing as NodeJS.Timeout);
      refreshTimer();
    }
  };

  const handleMouseOver = (event: React.MouseEvent) => {
    if (event.clientX <= midBoundary) {
      activateArrow("left");
    } else {
      activateArrow("right");
    }
  };

  const handleSlideChange = (event: React.MouseEvent) => {
    if (event.clientX <= midBoundary) {
      toPrevImg();
    } else {
      toNextImg();
    }
  }

  return (
    // if !isLightboxHidden
    // onMouseMove = {isLightboxHiden ? ( () => {} ) : handleMouseOver}
    <div>
      
      <div 
        className={`${galleryStyles.lightboxRoot} ${isLightboxHidden ? galleryStyles.hidden : ''}`}
        onMouseMove={handleMouseOver}
        onClick={handleSlideChange}
      >
        <div className={galleryStyles.carouselWrapper}>
          <div className={galleryStyles.carousel}>
            {/* later derive SRC of this image from galleryMetadata[currentImg].path */}
            {galleryMetadata.map(data => {
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
                  onClick={(e) => console.log(e.target)}
                  key={data.id}
                >
                  <img 
                    className={galleryStyles.lightboxImg}
                    src={imgArray[data.id]}
                  />
                  <div className={`${galleryStyles.imgMetaContainer} ${isThisImgActive? galleryStyles.metaActive : ''}`}>
                    <h1>{data.title}</h1>
                    <p>{data.description}</p>
                  </div>
                </div>
              )
            })}
              
          </div>
        </div>
        
        <div 
          className={`${galleryStyles.lightboxLeft} ${leftArrowStatus.timerGoing ? galleryStyles.active : ''}`} 
          onClick={toPrevImg}
        > 
          <span className={galleryStyles.arrow}>
            &lt;
          </span>
        </div>

        <div 
          className={`${galleryStyles.lightboxRight} ${rightArrowStatus.timerGoing ? galleryStyles.active : ''}`}
          onClick={toNextImg}
        > 
          <span className={galleryStyles.arrow}>
            &gt;
          </span>
        </div>
      </div>


      <div 
        className={`${galleryStyles.lightboxClose} ${isLightboxHidden ? galleryStyles.hidden : ''}`}
        onClick={closeLightbox}
      >
          <span style={{userSelect: 'none'}}> X </span>
      </div>
    </div>
  )
}


const Gallery = ({ thumbnailSrcArray, imgArray, galleryMetadata }: GalleryProps) => {
  const [currentImg, setCurrentImg] = useState<number | null>(null);
  
  const firstImgIndex = 0;
  const lastImgIndex = imgArray.length-1;

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
  const closeLightbox = (): void => {
    document.body.style.overflowY="unset";
    document.body.style.paddingRight = `0px`;
    setCurrentImg(null);
  };
  const openLightbox = (index: number): void => {
    // create gap replacing righthand scrollbar to prevent disruption of body on modal open
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    
    document.body.style.overflowY="hidden";
    setCurrentImg(index);
  };

  const [imageOrientations, setImageOrientations] = useState(galleryMetadata.map(() => ""));

  const getImgOrientation = (img: HTMLImageElement, index: number): void => {
    const orientation = img.naturalHeight <= img.naturalWidth ? "landscape" : "portrait";
    setImageOrientations(Object.assign(imageOrientations, { [index]: orientation }))
  };

  const makeOrientationDependentStyleObj = (orientation: ImageOrientationTypes): CSSProperties => {
    if (windowWidth <= maxWindowBreakpoint) {
      switch (orientation) {
        case "landscape":
          return { "height": getThumbnailWindowRatio() * windowWidth };
        case "portrait":
          return { "width": getThumbnailWindowRatio() * windowWidth };
        default:
          return {}
      }
    } else {
      return {}
    }
  }

  const { windowHeight, windowWidth } = useWindowDimensions();
  const getThumbnailWindowRatio = (): number => (
    windowWidth >= mobileBreakpoint ? (360 / maxWindowBreakpoint) : (370 / mobileBreakpoint)
  );
  const thumbnailWindowRatio = 360 / 1440;
  
  console.log(windowWidth);
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
        />

      </div>

      <div id={galleryStyles.galleryRootContainer}>
        {
          galleryMetadata.map((item: GalleryItemShape, index: number): JSX.Element => {
            const orientationDependentStyling = makeOrientationDependentStyleObj(imageOrientations[index] as ImageOrientationTypes);

            return (
              <div 
                className = {galleryStyles.thumbSquareSizer}
                onClick = {() => {
                  openLightbox(index)
                }}
                key = {index}
              >
                {/* SOME KIND OF FUNCTION */}
                {/* on window resize */}
                {/* recalculate image size */}

                <div className={galleryStyles.thumbContainer}>
                  {/* later derive SRC of this image from item.thumb */}
                  <img 
                    className={`${galleryStyles.thumbImg} ${galleryThumbStyles[galleryMetadata[index].thumbStyle]}`} 
                    src={thumbnailSrcArray[index]}
                    onLoad={(event) => getImgOrientation(event.target as HTMLImageElement, index)}
                    style={orientationDependentStyling}
                  />
                </div>
              </div>
          )})
        }    
      </div>
    </>
  )
}

export default Gallery