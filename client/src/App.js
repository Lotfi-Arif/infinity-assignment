import './assets/styles/tailwind.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Register } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
