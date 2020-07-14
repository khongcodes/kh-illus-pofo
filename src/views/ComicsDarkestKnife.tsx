//                                               src/views/ComicsDarkestKnife.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Display Darkest Knife comic and info in ScrollPiece


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
import { Helmet } from "react-helmet-async";

import { ImageData } from "../model/Image";
import comicsData from "../configData/imageDataComics.json";

import ScrollPiece from "../viewsCommon/ScrollPiece";
import { dkArray } from "../assets/images/index";


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                               SETUP

const dkMetadata: ImageData[] = comicsData["darkest-knife"];


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const darkestPageCopy = <>
  <p>(Fall 2016)</p>
  <p>A 4-page comic based on an exquisite corpse exercise.</p>
  <p>
    <em>The darkest knife binds academic arguments</em>
  </p>
  <p>
    Written and drawn by David Han and Kevin Hong. <br/>
    Drawn by Kevin Hong
  </p>
</>

const ComicsDarkestKnife = () => (
  <>
    <Helmet>
      <title>KHong Draws - Darkest Knife</title>
    </Helmet>

    <ScrollPiece 
      title="Darkest Knife"
      infoContent={ darkestPageCopy }
      imgArray={ dkArray }
      metadata={ dkMetadata }
    />
  </>

)

export default ComicsDarkestKnife