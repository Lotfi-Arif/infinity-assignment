import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'

const Task = ({
  _id,
  title
}) => {
  const { setEditTask, deleteTask } = useAppContext()

  return (
    <div>
      <div className='content'>
          <div className='flex p-2'>
          <p class="w-full text-green">{title}</p>
            <Link
              to='/add-task'
              className='flex-no-shrink text-white bg-green-500 hover:bg-green-600 mx-6 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              onClick={() => setEditTask(_id)}
            >
              Done
            </Link>
            <button
              type='button'
              className='text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
              onClick={() => deleteTask(_id)}
            >
              Remove
            </button>
          </div>
      </div>
    </div>
  )
}

export default Task
