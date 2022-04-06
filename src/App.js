import './App.css';
import React, { useState, useMemo } from 'react';
import Nav from './Components/Top_Nav/Top_Nav';

export const ImagesContext = React.createContext(null);

function App() {
  //Flag to track whether the game has started
  const [isItBeforeThePuzzle, setIsItBeforeThePuzzle] = useState(true);
  const [user, setUser] = useState({});

  const [mainImages, setMainImages] = useState(null);
  const providerImages = useMemo(() => ({ mainImages, setMainImages }), [mainImages, setMainImages]);

  return (
    <div className="App">
      <ImagesContext.Provider value={providerImages}>
        <Nav
          isItBeforeThePuzzle={isItBeforeThePuzzle}
          setIsItBeforeThePuzzle={setIsItBeforeThePuzzle}
          user={user}
          setUser={setUser}
        />
      </ImagesContext.Provider>
    </div>
  );
}

export default App;
