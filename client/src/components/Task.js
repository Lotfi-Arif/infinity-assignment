import { useAppContext } from '../context/appContext'

const Task = ({
  _id,
  title,
  completed
}) => {
  const { editTask, deleteTask } = useAppContext()

  return (
    <div>
        <div className='flex p-2'>
          <p className={completed ? 'w-full line-through' : 'w-full text-slate-800'}>{title}</p>
          <input class=" mr-8 appearance-none h-5 w-5 mt-3 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-top bg-no-repeat bg-center bg-contain float-left cursor-pointer"
            type="checkbox"
            checked={completed}
            id="flexCheckDefault"
            onChange={() => editTask({ _id, title, completed })} />
          <button
            type='button'
            className='text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
            onClick={() => deleteTask(_id)}
          >
            Remove
          </button>
        </div>
      
    </div>
  )
}

export default Task
