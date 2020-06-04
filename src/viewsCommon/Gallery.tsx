import React, { useState } from 'react';

import { GalleryItemShape } from '../model/GalleryShape';

import galleryStyles from '../style/Gallery.module.sass';

type GalleryProps = {
  thumbnailSrcArray: string[];
  galleryMetadata: GalleryItemShape[];
}
type LightboxProps = {
  currentImg: number | null;
  toNextImg: VoidFunction;
  toPrevImg: VoidFunction;
  closeLightbox: VoidFunction;
}

// CURRENTLY:
// use galleryMetadata index to index-match to thumbnailSrcArray, holding img srcs in array

// IN THE FUTURE:
// use galleryMetadata object's path/thumb members to pull images from 3rd party host

const Lightbox = ({ currentImg, toNextImg, toPrevImg, closeLightbox }: LightboxProps) => {
  return (
    <div id={galleryStyles.lightboxRoot} >
      { currentImg }
      
      <div
        className={galleryStyles.lightboxClose}
        onClick={closeLightbox}
      >
        X  
      </div>
    </div>
  )
}

const Gallery = ({ thumbnailSrcArray, galleryMetadata }: GalleryProps) => {
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