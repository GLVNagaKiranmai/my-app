import React, { useState } from 'react';
import Savesegment from './Savesegment';
import './App.css';


function App() {
  const [isOpen, setIsOpen] = useState(false);

  const openPopup = () => setIsOpen(true);
  const closePopup = () => setIsOpen(false);

  return (
    <div className='main-container'>
      <button onClick={openPopup}>Save segment</button>
      {isOpen && <Savesegment onClose={closePopup} />}
    </div>
  );
}

export default App;
