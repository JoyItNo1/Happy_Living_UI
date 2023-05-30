import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Loginpage from './Loginpage/Loginpage';
import Register from './Loginpage/Register';
import { Switch } from 'antd';

function App() {
  return (
    <div className="App">
       <BrowserRouter>
       <Routes>
          <Route path="/" element={<Loginpage />} />
          <Route path="/register" element={<Register />}/>
        </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
