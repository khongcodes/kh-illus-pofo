import React from 'react';

import illusMetadata from '../configData/illustrationGalleryData.json';
import { illusArray } from '../images/index';

import Gallery from '../viewsCommon/Gallery';

const Home = () => (
  <div>
    <Gallery 
      imgArray = {illusArray}
      galleryMetadata = {illusMetadata}
    />
  </div>
)

export default Home