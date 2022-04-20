import { FormRow, Alert, Navbar } from '../components'
import { useAppContext } from '../context/appContext'


const AddTask = () => {
  const {
    isLoading,
    isEditing,
    showAlert,
    displayAlert,
    title,
    description,
    handleChange,
    clearValues,
    createTask,
    editTask,
  } = useAppContext()

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!description) {
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
      <div className='w-full max-w-md mx-auto my-auto'>
        <form className='bg-white shadow-xl rounded px-8 pt-6 pb-8 mb-4'>
          <h3 className='font-bold my-3'>{isEditing ? 'Edit task' : 'Add task'}</h3>
          {showAlert && <Alert />}
          <div className='form-center'>
            <div className='mb-4'>
              {/* title */}
              <FormRow
                type='text'
                name='title'
                value={title}
                handleChange={handleTaskInput}
              />
              {/* description */}
              <FormRow
                type='text'
                name='description'
                value={description}
                handleChange={handleTaskInput}
              />
            </div>
            {/* btn container */}
            <div className='space-x-4'>
              <button
                type='submit'
                className='text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                onClick={handleSubmit}
                disabled={isLoading}
              >
                Submit
              </button>
              <button
                className='text-white bg-red-500 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
                onClick={(e) => {
                  e.preventDefault()
                  clearValues()
                }}
              >
                Clear
              </button>
            </div>
          </div>
        </form>
      </div>
    </>
  )
}

export default AddTask
