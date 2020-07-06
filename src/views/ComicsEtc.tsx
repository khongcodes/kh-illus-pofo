//                                                        src/views/ComicsEtc.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Display etc. comics and info in ScrollPiece


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO
// 1. remove imageArray on deploy

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. models & config data
// 3. components & assets
// 4. styles

import React from 'react';

import { ImageData } from "../model/Image";
import comicsData from "../configData/imageDataComics.json";

import ScrollPiece from "../viewsCommon/ScrollPiece";
import { etcArray } from "../assets/images/index";


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                               SETUP

const etcMetadata: ImageData[] = comicsData.etc;


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const ComicsEtc = () => {
  return (
    <ScrollPiece 
      title="Etc. comics"
      imgArray={ etcArray }
      metadata={ etcMetadata }
      hrMap={[0, 2, 6, 7]}
    />
  )
}

export default ComicsEtc