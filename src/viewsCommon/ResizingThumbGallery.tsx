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
  thumbnailSrcArray: string[];
  imgArray: string[];
  galleryMetadata: GalleryItemShape[];
  openLightbox: (currentImg: number) => void;
}
type ImageOrientationTypes = "portrait" | "landscape" | "square" | "";
type ImageOrientations = ImageOrientationTypes[];

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

// ResizingThumbGallery: FC(main)
// function: take in image metadata and create gallery of resizing thumbnails
//      why: semantic clarity on Gallery
//           and potentially, future reusability
const ResizingThumbGallery = ({ 
  thumbnailSrcArray, imgArray, galleryMetadata, openLightbox
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
  const [imageOrientations, setImageOrientations] = useState<ImageOrientations>(galleryMetadata.map(() => ""));

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

  return (
    <div id={resizingGalleryStyles.galleryRootContainer}>
      {
        galleryMetadata.map((item: GalleryItemShape, index: number): JSX.Element => {
          const orientationDependentStyling = makeOrientationDependentStyleObj(imageOrientations[index] as ImageOrientationTypes);

          return (
            <div 
              className = {resizingGalleryStyles.thumbSquareSizer}
              onClick = {() => openLightbox(index)}
              key = {index}
            >
              <div className={resizingGalleryStyles.thumbContainer}>
                {/* later derive SRC of this image from item.thumb */}
                <img 
                  className={`${resizingGalleryStyles.thumbImg} ${galleryThumbStyles[galleryMetadata[index].thumbStyle]}`} 
                  src={thumbnailSrcArray[index]}
                  onLoad={(event) => getImgOrientation(event.target as HTMLImageElement, index)}
                  style={orientationDependentStyling}
                />
              </div>
            </div>
        )})
      }    
    </div>
  )
}

export default ResizingThumbGallery;