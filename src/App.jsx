import './App.css';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from './components/Header';
import Login from './pages/Login';
import Inventory from './pages/Inventory';
import Add from './pages/Add';

function App() {
  return (
    <div className='App'>
      <Header />
      <BrowserRouter>
        <Routes>
          <Route path='/'></Route>
          <Route path='login' element={<Login />}></Route>
          <Route path='inventory' element={<Inventory />}></Route>
          <Route path='add' element={<Add />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
