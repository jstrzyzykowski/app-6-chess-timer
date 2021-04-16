import React from 'react';

import Timer from '../components/Timer';
import AppProvider from '../context/AppContext';

import './App.css';

function App() {
  return (
    <AppProvider>
      <div className='app'>
        <Timer/>
      </div>
    </AppProvider>
  );
}

export default App;
