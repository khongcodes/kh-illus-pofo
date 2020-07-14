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
  title: string;
  infoContent?: JSX.Element;
  imgArray: string[];
  metadata: ImageData[];
  hrMap?: number[];
}

const ScrollPiece = ({ title, infoContent, imgArray, metadata, hrMap }: ScrollPieceProps) => {
  return (
    <div className={scrollPieceStyles.rootContainer}>
      <div className={scrollPieceStyles.infoContainer}>
        <div className={scrollPieceStyles.infoTitleContainer}>
          <h1>{title}</h1>
        </div>

        <div className={scrollPieceStyles.infoCopyContainer}>
          {infoContent}
        </div>
      </div>

      <div className={scrollPieceStyles.scrollContainer}>
        {
          imgArray.map((src, index) => (
            <React.Fragment key={index}>
              <img 
                src={src} 
                alt={metadata[index].alt}
                key={index}
              />
              {
                !!hrMap && hrMap.includes(index) ? <hr/> : <></>
              }
            </React.Fragment>
          ))
        }
      </div>
    </div>
  )
}

export default ScrollPiece;