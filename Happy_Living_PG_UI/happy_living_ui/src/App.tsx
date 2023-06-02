import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from './Loginpage/Loginpage';
import Register from './Loginpage/Register';
import Pginfo from './Loginpage/Pginfo';
import Pay from './Loginpage/Pay';
import JoyTS from './Loginpage/Layoutpage/HOME_PAGE';


function App() {
  return (
    <div className="App">
    <JoyTS />
  </div>
  );
}

export default App;
