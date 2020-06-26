//                                       src/viewsCommon/ResizingThumbGallery.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - take in image metadata and create gallery of resizing thumbnails
//  - on click call openLightbox callback


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. models & config data
// 3. components & assets
// 4. styles

import React, { useState, CSSProperties } from 'react';

import { GalleryItemShape } from '../model/GalleryShape';

import useWindowDimensions from '../util/UseWindowDimensions';
import { mobileBreakpoint, maxWindowBreakpoint } from './Layout';

import resizingGalleryStyles from '../style/ResizingThumbGallery.module.sass';
import galleryThumbStyles from '../style/GalleryThumbnails.module.sass';


////////////////////////////////////////////////////////////////////////////////
/////////////                                                               TYPES

type GalleryProps = {
  imgArray: string[];
  galleryMetadata: GalleryItemShape[];
  openLightbox: (currentImg: number) => void;
}
type ImageOrientationTypes = "portrait" | "landscape"| "";
type ImageLoadedTypes = "loaded" | "";
type SingleThumbType = {
  orientation: ImageOrientationTypes,
  loaded: ImageLoadedTypes
};
type ThumbType = SingleThumbType[];

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

// ResizingThumbGallery: FC(main)
// function: take in image metadata and create gallery of resizing thumbnails
//      why: semantic clarity on Gallery
//           and potentially, future reusability
const ResizingThumbGallery = ({ 
  imgArray, galleryMetadata, openLightbox
}: GalleryProps) => {

  // get windowWidth
  // setup thumb to window-width ratio
  const { windowHeight, windowWidth } = useWindowDimensions();
  const getThumbnailWindowRatio = (): number => (
    windowWidth >= mobileBreakpoint ? (360 / maxWindowBreakpoint) : (370 / mobileBreakpoint)
  );

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

  // LEGACY - NO LONGER NEEDED
  // state-dependent classname and CSS attribute object-fit: contain
  // make this function no longer necessary
  // no need to unnecessarily control styles at a granular level from React

  // const makeOrientationDependentStyleObj = (orientation: ImageOrientationTypes): CSSProperties => {
  //   if (windowWidth <= maxWindowBreakpoint) {
  //     switch (orientation) {
  //       case "landscape":
  //         return { "height": getThumbnailWindowRatio() * windowWidth };
  //       case "portrait":
  //         return { "width": getThumbnailWindowRatio() * windowWidth };
  //       default:
  //         return {}
  //     }
  //   } else {
  //     return {}
  //   }
  // }

  const handleImgLoad = (img: HTMLImageElement, index: number): void => {
    const adjucatedOrientation = img.naturalHeight <= img.naturalWidth ? "landscape" : "portrait";

    setThumbState(Object.assign([], thumbState, { [index]: {
      orientation: adjucatedOrientation,
      loaded: "loaded"
    }}))
  }

  return (
    <div id={resizingGalleryStyles.galleryRootContainer}>
      {
        galleryMetadata.map((item: GalleryItemShape, index: number): JSX.Element => {
          
          // LEGACY - NO LONGER NEEDED
          // entry point for setting style of thumbnail in React
          // see const makeOrientationDependentStyleObj
          // const orientationDependentStyling = makeOrientationDependentStyleObj(imageOrientations[index] as ImageOrientationTypes);

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
                {/* later derive SRC of this image from item.thumb */}
                <img 
                  className={imgClassName} 
                  src={imgArray[index]}
                  onLoad={(event) => handleImgLoad(event.target as HTMLImageElement, index)}
                  // LEGACY - NO LONGER NEEDED
                  // see const makeOrientationDependentStyleObj
                  // style = {orientationDependentStyling}
                />
              </div>
            </div>
        )})
      }    
    </div>
  )
}

export default ResizingThumbGallery;