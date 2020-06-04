import React from 'react';

import illusMetadata from '../configData/illustrationGalleryData.json';
import { illusThumbArray } from '../images/index';

import Gallery from '../viewsCommon/Gallery';

const Home = () => (
  <div>
    <Gallery 
      thumbnailSrcArray = {illusThumbArray}
      galleryMetadata = {illusMetadata}
    />
  </div>
)

export default Home