//                                                             src/views/Home.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Home page
//  - serve Illustration Gallery and Lightbox


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO
// 1. remove illusArray on deploy

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. models & config data
// 3. components & assets
// 4. styles

import React from 'react';
import { Helmet } from "react-helmet-async";

import sketchMetadata from "../configData/galleryDataSketch.json";
// remove on deploy
import { sketchArray } from "../assets/images/index";
import Gallery from "../viewsCommon/Gallery";


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const Sketchbook = () => (
  <>
    <Helmet>
      <title>KHong Draws - Sketchbook</title>
    </Helmet>

    <Gallery 
      imgArray={sketchArray}
      galleryMetadata={sketchMetadata}
    />
  </>
)

export default Sketchbook