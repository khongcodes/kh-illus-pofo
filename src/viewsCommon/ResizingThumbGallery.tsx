import React from 'react';

const ResizingThumbGallery = () => {
  // return (
  //   <div id={galleryStyles.galleryRootContainer}>
  //     {
  //       galleryMetadata.map((item: GalleryItemShape, index: number): JSX.Element => {
  //         const orientationDependentStyling = makeOrientationDependentStyleObj(imageOrientations[index] as ImageOrientationTypes);

  //         return (
  //           <div 
  //             className = {galleryStyles.thumbSquareSizer}
  //             onClick = {() => {
  //               openLightbox(index)
  //             }}
  //             key = {index}
  //           >
  //             {/* SOME KIND OF FUNCTION */}
  //             {/* on window resize */}
  //             {/* recalculate image size */}

  //             <div className={galleryStyles.thumbContainer}>
  //               {/* later derive SRC of this image from item.thumb */}
  //               <img 
  //                 className={`${galleryStyles.thumbImg} ${galleryThumbStyles[galleryMetadata[index].thumbStyle]}`} 
  //                 src={thumbnailSrcArray[index]}
  //                 onLoad={(event) => getImgOrientation(event.target as HTMLImageElement, index)}
  //                 style={orientationDependentStyling}
  //               />
  //             </div>
  //           </div>
  //       )})
  //     }    
  //   </div>
  // )
}

export default ResizingThumbGallery;