import React, { useState, useEffect } from 'react';

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
  closeLightbox: VoidFunction;
  imgArray: string[];
  galleryMetadata: GalleryItemShape[];
}

// CURRENTLY:
// use galleryMetadata index to index-match to thumbnailSrcArray, holding img srcs in array

// IN THE FUTURE:
// use galleryMetadata object's path/thumb members to pull images from 3rd party host

const Lightbox = ({ currentImg, toNextImg, toPrevImg, closeLightbox, imgArray, galleryMetadata }: LightboxProps) => {
  
  // disable scroll on body while Lightbox modal is open
  useEffect(() => {
    document.body.style.overflow="hidden";
    return () => {document.body.style.overflow="unset"};
  }, [])

  const isLightboxHidden = currentImg === null;

  return (
    <div className={`${galleryStyles.lightboxRoot} ${isLightboxHidden ? galleryStyles.hidden : ''}`}>

      <div className={galleryStyles.lightboxImgContainer}>
        {/* later derive SRC of this image from galleryMetadata[currentImg].path */}
        {galleryMetadata.map(data => {
          const isThisImgActive = data.id === currentImg;

          return (
            <img 
              className={`${galleryStyles.lightboxImg} ${isThisImgActive ? galleryStyles.activeImg : ''}`}
              src={imgArray[data.id]}
              key={data.id}
            />
          )
        })}
          

      </div>
      
      <div className={galleryStyles.lightboxLeft} onClick={toPrevImg}> 
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

  const toNextImg = (): void => {
    if (currentImg !== null) {
      currentImg !== lastImgIndex ? setCurrentImg(currentImg + 1) : setCurrentImg(firstImgIndex)
    }
  }
  const toPrevImg = (): void => {
    if (currentImg !== null) {
      currentImg !== firstImgIndex ? setCurrentImg(currentImg - 1) : setCurrentImg(lastImgIndex)
    }
  }
  const closeLightbox = (): void => {
    // close lightbox animation
    setCurrentImg(null);
  }

  return (
    <>
      <Lightbox 
        currentImg = {currentImg}
        toNextImg = {toNextImg}
        toPrevImg = {toPrevImg}
        closeLightbox = {closeLightbox}
        imgArray = {imgArray}
        galleryMetadata = {galleryMetadata}
      />

      <div id={galleryStyles.galleryRootContainer}>
        {
          galleryMetadata.map((item: GalleryItemShape, index: number): JSX.Element => (
            <div 
              className = {galleryStyles.thumbSquareSizer}
              onClick = {() => setCurrentImg(index)}
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