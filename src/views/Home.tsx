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

import illusMetadata from '../configData/illustrationGalleryData.json';
// remove on deploy
import { illusArray } from '../images/index';
import Gallery from '../viewsCommon/Gallery';


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const Home = () => (
  <Gallery 
    imgArray = {illusArray}
    galleryMetadata = {illusMetadata}
  />
)

export default Home