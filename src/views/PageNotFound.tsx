//                                                     src/views/PageNotFound.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Display 404


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                                TODO


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. models & config data
// 3. components & assets
// 4. styles

import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import pnfStyles from "../assets/style/PageNotFound.module.sass";

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const PageNotFound = () => (
  <>
    <Helmet>
      <title>KHong Draws - Page not found</title>
    </Helmet>

    <div className={pnfStyles.root}>
      <h1>404 Error</h1>
      <p>This page could not be found.</p>
      
      <div className={pnfStyles.adviseContainer}>
        <p>
          Check the URL and try again or&nbsp;
          <Link to="/">
            click here
          </Link>
          &nbsp;to return home.
        </p>
      </div>
    </div>
</>
);

export default PageNotFound;