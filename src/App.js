import React from 'react';

import Routes from './Routes';
import Nav from './component/Nav';

function App() {
  return (
    <div>
      <Nav/>
      <main>
        <Routes />
      </main>
    </div>
  );
}

export default App;
