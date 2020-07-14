//                                       src/viewsCommon/ResizingThumbGallery.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - take in image metadata and create gallery of resizing thumbnails
//  - on click call openLightbox callback


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO
// 1. trim the fat on deploy

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. models & config data
// 3. components & assets
// 4. styles

import React, { useState } from 'react';

import { GalleryItemShape, ThumbGalleryProps, ThumbType } from '../model/Gallery';

import resizingGalleryStyles from '../assets/style/ResizingThumbGallery.module.sass';
import galleryThumbStyles from '../assets/style/GalleryThumbnails.module.sass';


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

// ResizingThumbGallery: FC(main)
// function: take in image metadata and create gallery of resizing thumbnails
//      why: semantic clarity on Gallery
//           and potentially, future reusability
const ResizingThumbGallery = ({ 
  imgArray, galleryMetadata, openLightbox
}: ThumbGalleryProps) => {

  // generate array of image orientations
  // onLoad, check if height or width is bigger
  // if height, thumbnail width maps to windowWidth
  // if width, thumbnail height maps to windowWidth
  const [thumbState, setThumbState] = useState<ThumbType>(galleryMetadata.map(() => (
    {
      orientation: "",
      loaded: ""
    }
  )));

  const handleImgLoad = (img: HTMLImageElement, index: number): void => {
    const adjucatedOrientation = img.naturalHeight <= img.naturalWidth ? "landscape" : "portrait";

    setThumbState(Object.assign([], thumbState, { [index]: {
      orientation: adjucatedOrientation,
      loaded: "loaded"
    }}))
  }

  const galleryDataSortedByOrder = galleryMetadata.sort((a, b) => a.order > b.order ? 1 : -1)

  return (
    <div id={resizingGalleryStyles.galleryRootContainer}>
      {
        galleryDataSortedByOrder.map((item: GalleryItemShape, index: number): JSX.Element => {
          // combine element styles to make classname:
          //    sass class thumbImg
          //    metadata item thumbStyle
          //    loaded image orientation
          //    image loaded-status as boolean
          const imgClassName = [
            resizingGalleryStyles.thumbImg,
            galleryThumbStyles[galleryMetadata[index].thumbStyle],
            resizingGalleryStyles[thumbState[index].orientation],
            resizingGalleryStyles[thumbState[index].loaded]
          ].join(" ");

          return (
            <div 
              className = {resizingGalleryStyles.thumbSquareSizer}
              onClick = {() => openLightbox(index)}
              key = {index}
            >
              <div className={resizingGalleryStyles.thumbContainer}>
                {/* later derive SRC of this image from item.path */}
                <img 
                  className={imgClassName} 
                  src={imgArray[index]}
                  alt={item.alt}
                  onLoad={(event) => handleImgLoad(event.target as HTMLImageElement, index)}
                />
              </div>
            </div>
        )})
      }    
    </div>
  )
}

export default ResizingThumbGallery;