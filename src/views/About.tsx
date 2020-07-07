//                                                            src/views/About.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Display About page


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO
// 1. remove image on deploy

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. models & config data
// 3. components & assets
// 4. styles

import React from "react";

import profileSketch from "../assets/images/profile.png";

import aboutStyles from "../assets/style/About.module.sass";


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const About = () => (
  <div className={aboutStyles.root}>
    <div className={aboutStyles.copyContainer}>
      <h1>Kevin Hong</h1>
      <p>is an illustrator and designer currently based in the North Shore who graduated from the Rhode Island School of Design (RISD) in 2017. They enjoy combining traditional and digital media. They also like tabletop RPGs, comics, and walking in the woods.</p>
      <p>Inquries at khongdraws@gmail.com</p>
    </div>

    <div className={aboutStyles.profileContainer}>
      <img src={ profileSketch } alt="Kevin Hong avatar sketch"/>
    </div>

    <div className={aboutStyles.awardsContainer}>
      <p>3x3 Illustration Annual No. 14</p>
      <p>Society of Illustrators LA - Illustration West 56</p>
    </div>
  </div>
)

export default About