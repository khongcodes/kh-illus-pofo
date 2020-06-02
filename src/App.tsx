import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './views/Home';
import About from './views/About';

import Layout from './viewsCommon/Layout';

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/illustration' element={<Navigate to='/' />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
