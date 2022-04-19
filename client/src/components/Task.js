import { FaTint, FaArrowDown } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useAppContext } from '../context/appContext'
import TaskInfo from './TaskInfo'

const Task = ({
  _id,
  title,
  description
}) => {
  const { setEditTask, deleteTask } = useAppContext()

  return (
    <div>
      <header>
        <div className='main-icon'>{title.charAt(0)}</div>
        <div className='info'>
          <h5>{title}</h5>
          <p>{description}</p>
        </div>
      </header>
      <div className='content'>
        <div className='content-center'>
          <TaskInfo icon={<FaTint />} text={title} />
          <TaskInfo icon={<FaArrowDown />} text={description} />
        </div>
        <footer>
          <div className='actions'>
            <Link
              to='/add-task'
              className='btn edit-btn'
              onClick={() => setEditTask(_id)}
            >
              Edit
            </Link>
            <button
              type='button'
              className='btn delete-btn'
              onClick={() => deleteTask(_id)}
            >
              Delete
            </button>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Task
