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

// import Home from './views/Home';
// import PenInk from './views/PenInk';
// import ComicsSnake from './views/ComicsSnake';
// import ComicsDarkestKnife from './views/ComicsDarkestKnife';
// import ComicsEtc from './views/ComicsEtc';
// import Sketchbook from './views/Sketchbook';
// import About from './views/About';

import Layout from './viewsCommon/Layout';
import TabAccessProvider from './util/TabAccessContext';

const Home = lazy(() => import('./views/Home'));
const PenInk = lazy(() => import('./views/PenInk'));
const ComicsSnake = lazy(() => import('./views/ComicsSnake'));
const ComicsDarkestKnife = lazy(() => import('./views/ComicsDarkestKnife'));
const ComicsEtc = lazy(() => import('./views/ComicsEtc'));
const Sketchbook = lazy(() => import('./views/Sketchbook'));
const About = lazy(() => import('./views/About'));

/////////////////////////////////////////////////////////////////////////////////
/////////////                                                  COMPONENTS & LOGIC

// const TabAccessToggle = () => {
//   const [tabAccessMode, toggleTabAccessMode] = useContext(TabAccessContext);
//   return () => toggleTabAccessMode(tabAccessMode.lightbox == -1 ? tabAccessScheme.modal : tabAccessScheme.default)
// }

const App: React.FC = () => {

  return (
    <Router>
      <TabAccessProvider>
        <Layout>
          <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/illustration' element={<Navigate to='/' />} />
            <Route path='/pen-ink' element={<PenInk />} />
            <Route path='/comics'>
              <Route path='/snake' element={<ComicsSnake />} />
              <Route path='/darkest-knife' element={<ComicsDarkestKnife />} />
              <Route path='/etc' element={<ComicsEtc />} />
            </Route>
            <Route path='/sketchbook' element={<Sketchbook />} />
            <Route path='/about' element={<About />} />
          </Routes>
          </Suspense>
        </Layout>
      </TabAccessProvider>
    </Router>
  );
}

export default App;
