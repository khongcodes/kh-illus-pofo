import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './views/Home';
import PenInk from './views/PenInk';
import ComicsSnake from './views/ComicsSnake';
import ComicsDarkestKnife from './views/ComicsDarkestKnife';
import ComicsEtc from './views/ComicsEtc';
import Sketchbook from './views/Sketchbook';
import About from './views/About';

import Layout from './viewsCommon/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
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
      </Layout>
    </Router>
  );
}

export default App;
