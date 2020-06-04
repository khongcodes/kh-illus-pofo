import React, { useState, useEffect } from 'react';

import { GalleryItemShape } from '../model/GalleryShape';

import galleryStyles from '../style/Gallery.module.sass';

type GalleryProps = {
  thumbnailSrcArray: string[];
  imgArray: string[];
  galleryMetadata: GalleryItemShape[];
}
type LightboxProps = {
  currentImg: number;
  toNextImg: VoidFunction;
  toPrevImg: VoidFunction;
  closeLightbox: VoidFunction;
  imgArray: string[];
}

// CURRENTLY:
// use galleryMetadata index to index-match to thumbnailSrcArray, holding img srcs in array

// IN THE FUTURE:
// use galleryMetadata object's path/thumb members to pull images from 3rd party host

const Lightbox = ({ currentImg, toNextImg, toPrevImg, closeLightbox, imgArray }: LightboxProps) => {
  
  // disable scroll on body while Lightbox modal is open
  useEffect(() => {
    document.body.style.overflow="hidden";
    return () => {document.body.style.overflow="unset"};
  }, [])

  return (
    <div id={galleryStyles.lightboxRoot}>

      <div className={galleryStyles.lightboxImgContainer}>
        <img 
          className={galleryStyles.lightboxImg}
          src={imgArray[currentImg]}
        />

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
  
  const toNextImg = (): void => {
    if (currentImg !== null) {
      setCurrentImg(currentImg + 1)
    }
  }
  const toPrevImg = (): void => {
    if (currentImg!== null) {
      setCurrentImg(currentImg - 1)
    }
  }
  const closeLightbox = (): void => {
    // close lightbox animation
    setTimeout(() => setCurrentImg(null), 100);
  }

  return (
    <>
      { currentImg !== null ? 
        <Lightbox 
          currentImg = {currentImg}
          toNextImg = {toNextImg}
          toPrevImg = {toPrevImg}
          closeLightbox = {closeLightbox}
          imgArray = {imgArray}

        /> : <></> }

      <div id={galleryStyles.galleryRootContainer}>
        {
          galleryMetadata.map((item: GalleryItemShape, index: number): JSX.Element => (
            <div 
              className = {galleryStyles.thumbSquareSizer}
              onClick = {() => setCurrentImg(index)}
              key = {index}
            >
              <div className={galleryStyles.thumbContainer}>
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