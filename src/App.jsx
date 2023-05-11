import { useState } from 'react'
import NavBar from "./components/NavBar"
import { UserProvider } from './components/UserContext';
import About from "./components/About"
import Lista from "./components/Lista"
import Unos from "./components/Unos"
import Donacije from "./components/Donacije"
import Obavijesti from "./components/Obavijesti"

import './App.css'


function App() {

  const [count, setCount] = useState(0);
  function changeCount(e) {
    setCount(e.target.id)
  }

  return (
    <UserProvider>
      <div className='navigacija'>
        <NavBar className="nav-bar"></NavBar>
        <div className='botuni-navigacije'>
          <button id="0" onClick={changeCount}>Opcenito</button>
          <button id="1" onClick={changeCount}>Lista zivotinja</button>
          <button id="2" onClick={changeCount}>Unos zivotinja</button>
          <button id="3" onClick={changeCount}>Donacije</button>
          <button id="4" onClick={changeCount}>Obavijesti</button>
        </div>

      </div>


      {count == 0 && <About></About>}
      {count == 1 && <Lista />}
      {count == 2 && <Unos />}
      {count == 3 && <Donacije />}
      {count == 4 && <Obavijesti />}


    </UserProvider>

  );
}

export default App
