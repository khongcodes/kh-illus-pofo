import React, { useState, useRef } from 'react';

import { GalleryItemShape } from '../model/GalleryShape';

import galleryStyles from '../style/Gallery.module.sass';

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
  
  const nextArrow = useRef<HTMLDivElement>(null);
  const prevArrow = useRef<HTMLDivElement>(null);

  const midBoundary = window.innerWidth / 2;
  // const handleMouseOver = () => ();
  // 

  return (
    // if !isLightboxHidden
    // onMouseMove = {isLightboxHiden ? ( () => {} ) : handleMouseOver}
    <div 
      className={`${galleryStyles.lightboxRoot} ${isLightboxHidden ? galleryStyles.hidden : ''}`}
      // onMouseMove={}
    >
      {/* <div className={galleryStyles.carouselWrapper}>
        <div className={galleryStyles.carousel}> */}
          {/* later derive SRC of this image from galleryMetadata[currentImg].path */}
          {/* {galleryMetadata.map(data => {
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
      </div> */}
      
      <div 
        className={galleryStyles.lightboxLeft} 
        onClick={() => {
          if (prevArrow && prevArrow.current) {
            prevArrow.current.classList.add(galleryStyles.active);
            toPrevImg();
          }
        }}
        ref={prevArrow}
      > 
        <span className={galleryStyles.arrow}>
          &lt;
        </span>
      </div>

      <div className={galleryStyles.lightboxRight} onClick={toNextImg}> 
        <span className={galleryStyles.arrow}>
          &gt;
        </span>
      </div>
      
      <div className={galleryStyles.lightboxClose} onClick={closeLightbox}>
        <span style={{userSelect: 'none'}}> X </span>
      </div>

      <div className={galleryStyles.lightboxEdge} onClick={closeLightbox} />
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
  }
  const openLightbox = (index: number): void => {;
    // create gap replacing righthand scrollbar to prevent disruption of body on modal open
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    
    document.body.style.overflowY="hidden";
    setCurrentImg(index);
  }

  return (
    <>
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

      <div id={galleryStyles.galleryRootContainer}>
        {
          galleryMetadata.map((item: GalleryItemShape, index: number): JSX.Element => (
            <div 
              className = {galleryStyles.thumbSquareSizer}
              onClick = {() => {
                openLightbox(index)
              }}
              key = {index}
            >
              <div className={galleryStyles.thumbContainer}>
                {/* later derive SRC of this image from item.thumb */}
                <img className={galleryStyles.thumbImg} src={thumbnailSrcArray[index]}/>
              </div>
            </div>
          ))        
        }    
      </div>
    </>
  )
}

export default Gallery