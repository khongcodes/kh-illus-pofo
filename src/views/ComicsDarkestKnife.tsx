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

import ScrollPiece from "../viewsCommon/ScrollPiece";


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const darkestPageCopy = <>
  <h1>Darkest Knife</h1>
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
  // <ScrollPiece 
  //   infoContent={ darkestPageCopy }
  // />
  <div></div>
)

export default ComicsDarkestKnife