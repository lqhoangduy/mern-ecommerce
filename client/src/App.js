import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { DataProvider } from './GlobalState';
import Header from './components/headers/Header';
import MainPages from './components/mainpages/Pages';
import SlideShowList from './components/slideshow-gallery/SlideShowList';

function App() {
  return (
    <DataProvider>
      <Router>
        <div className='App'>
          <Header />
          <SlideShowList />
          <MainPages />
        </div>
      </Router>
    </DataProvider>
  );
}

export default App;