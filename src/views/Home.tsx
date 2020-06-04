import React from 'react';

import illusMetadata from '../configData/illustrationGalleryData.json';
import { illusThumbArray, illusArray } from '../images/index';

import Gallery from '../viewsCommon/Gallery';

const Home = () => (
  <div>
    <Gallery 
      thumbnailSrcArray = {illusThumbArray}
      imgArray = {illusArray}
      galleryMetadata = {illusMetadata}
    />
  </div>
)

export default Home