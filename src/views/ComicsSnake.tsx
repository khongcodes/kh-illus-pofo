//                                                      src/views/ComicsSnake.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Display Snake comic and info in ScrollPiece


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
import { snakeArray } from "../assets/images/index";


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                               SETUP

const snakeMetadata: ImageData[] = comicsData.snake;


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const snakePageCopy = <>
  <h1>Snake</h1>
  <p>(Spring 2017)</p>
  <p>A 24-page comic written about moving and identity.</p>
  <p>Written and drawn by Kevin Hong</p>
  <p><a href="https://gum.co/snakecomic" target="_blank" rel="noopener noreferrer">
    Full comic available on Gumroad
  </a></p>
</>

const ComicsSnake = () => (
  <ScrollPiece 
    infoContent={ snakePageCopy }
    imgArray={ snakeArray }
    metadata={ snakeMetadata }
  />
)

export default ComicsSnake