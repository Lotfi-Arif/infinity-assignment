import './assets/styles/tailwind.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Register, TodoList, Error } from './pages'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/todo-list' element={<TodoList />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
