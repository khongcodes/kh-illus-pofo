//                                                                    src/App.tsx
/////////////////////////////////////////////////////////////////////////////////
/////////////                                                    RESPONSIBILITIES
//  - Organize routes within Layout


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                             IMPORTS
// 1. system & packages
// 2. components & assets
// 3. styles
// 4. lazy imports

import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { HelmetProvider } from "react-helmet-async";

import Home from './views/Home';
import PageNotFound from "./views/PageNotFound";

import Layout from './viewsCommon/Layout';
import TabAccessProvider from './util/TabAccessContext';

const PenInk = lazy(() => import('./views/PenInk'));
const ComicsSnake = lazy(() => import('./views/ComicsSnake'));
const ComicsDarkestKnife = lazy(() => import('./views/ComicsDarkestKnife'));
const ComicsEtc = lazy(() => import('./views/ComicsEtc'));
const Sketchbook = lazy(() => import('./views/Sketchbook'));
const About = lazy(() => import('./views/About'));


/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

const App: React.FC = () => {

  return (
    <Router>
      <HelmetProvider>
      <TabAccessProvider>
        <Layout>
          <Suspense fallback={<div/>}>
            <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/illustration' element={<Navigate to='/' />} />
              <Route path='/pen-ink' element={<PenInk />} />
              <Route path='/comics'>
                <Route path='/snake' element={<ComicsSnake />} />
                <Route path='/darkest-knife' element={<ComicsDarkestKnife />} />
                <Route path='/etc' element={<ComicsEtc />} />
                <Route path='' element={<PageNotFound/>} />
              </Route>
              <Route path='/sketchbook' element={<Sketchbook />} />
              <Route path='/about' element={<About />} />
              <Route path='*' element={<PageNotFound/>} />
            </Routes>
          </Suspense>
        </Layout>
      </TabAccessProvider>
      </HelmetProvider>
    </Router>
  );
}

export default App;
