import { Alert, Navbar } from '../components'
import { useAppContext } from '../context/appContext'
import { TasksContainer } from '../components'



const TodoList = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    title,
    handleChange,
    createTask,
    editTask
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!title) {
      displayAlert()
      return
    }
    if (isEditing) {
      editTask()
      return
    }
    createTask()
  }
  
  const handleTaskInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    handleChange({ name, value })
  }

  return (
    <>
      <Navbar />
      <div className='w-full max-w-5xl mx-auto my-auto'>
        <form className='bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4'>
          <div className='mx-auto'>
            <div className="mb-4">
              <h3 className='font-bold my-3'>{isEditing ? 'Edit task' : 'Add task'}</h3>
              {showAlert && <Alert />}
                <label htmlFor='title' className='capitalize'>
                  {'title'}
                </label>
              <div className="flex mt-4">
                <input
                  type='text'
                  name='title'
                  value={title}
                  onChange={handleTaskInput}
                  className= 'shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
                />
                <button type='submit' onClick={handleSubmit} disabled={isLoading} className="flex-no-shrink text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center">Add</button>
              </div>
            </div>
            <div>
              <TasksContainer />
            </div>
          </div>
        </form>
      </div >
    </>
  )
}

export default TodoList
