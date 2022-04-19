import { FormRow, Alert } from '../components'
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
      <form className='form'>
        <h3>{isEditing ? 'edit task' : 'add task'}</h3>
        {showAlert && <Alert />}
        <div className='form-center'>
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
          {/* btn container */}
          <div className='btn-container'>
            <button
              type='submit'
              className='btn btn-block submit-btn'
              onClick={handleSubmit}
              disabled={isLoading}
            >
              submit
            </button>
            <button
              className='btn btn-block clear-btn'
              onClick={(e) => {
                e.preventDefault()
                clearValues()
              }}
            >
              clear
            </button>
          </div>
        </div>
      </form>
  )
}

export default AddTask
