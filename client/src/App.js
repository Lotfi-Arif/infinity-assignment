import './assets/styles/tailwind.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Landing, Register, AddTask, TodoList, Error } from './pages'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Landing />} />
        <Route path='/todo-list' element={<TodoList />} />
        <Route path='/add-task' element={<AddTask />} />
        <Route path='/register' element={<Register />} />
        <Route path='*' element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
