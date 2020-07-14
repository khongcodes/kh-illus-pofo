//                                                           src/views/PenInk.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Pen & Ink page
//  - serve Pen & Ink Gallery and Lightbox


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO
// 1. remove peninkArray on deploy

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. models & config data
// 3. components & assets
// 4. styles
import React from 'react';
import { Helmet } from "react-helmet-async";

import peninkMetadata from "../configData/galleryDataPenInk.json";
// remove on deploy
import { peninkArray } from "../assets/images/index";
import Gallery from "../viewsCommon/Gallery";


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const PenInk = () => (
  <>
    <Helmet>
      <title>KHong Draws - Pen & Ink</title>
    </Helmet>

    <Gallery 
      imgArray = {peninkArray}
      galleryMetadata = {peninkMetadata}
    />
  </>
)

export default PenInk