import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from './Loginpage/Loginpage';
import Register from './Loginpage/Register';
import Pginfo from './Loginpage/Pginfo';
import Pay from './Loginpage/Pay';


function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/register" element={<Register />}/>
          <Route path="/AddPGinfo" element={<Pginfo />}/>
          <Route path="/Pay" element={<Pay />}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
