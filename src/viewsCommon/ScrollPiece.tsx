//                                                src/viewsCommon/ScrollPiece.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - display page's images


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. types & config data
// 3. components & assets
// 4. styles
// 5. lazy imports

import React from "react";

import { ImageData } from "../model/Image";

import scrollPieceStyles from "../assets/style/ScrollPiece.module.sass";


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

type ScrollPieceProps = {
  infoContent: JSX.Element;
  imgArray: string[];
  metadata: ImageData[];
}

const ScrollPiece = ({ infoContent, imgArray, metadata}: ScrollPieceProps) => {
  console.log(imgArray)
  return (
    <div className={scrollPieceStyles.rootContainer}>
      <div className={scrollPieceStyles.copyContainer}>
        {infoContent}
      </div>

      <div className={scrollPieceStyles.scrollContainer}>
        {
          imgArray.map((src, index) => <img src={src} alt={metadata[index].alt}/>)
        }
      </div>
    </div>
  )
}

export default ScrollPiece;