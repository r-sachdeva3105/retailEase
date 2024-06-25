import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from './pages/Login';
import Inventory from './pages/Inventory';

function App() {
  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path='/'></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='inventory' element={<Inventory />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
