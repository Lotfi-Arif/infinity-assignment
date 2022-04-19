import logo from './assets/images/logo.svg';
import './assets/styles/tailwind.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing } from './pages'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
