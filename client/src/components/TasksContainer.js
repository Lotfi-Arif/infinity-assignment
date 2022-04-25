import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Task from './Task'


const TaskList = ({ tasks }) => {
  return tasks?.map((task) => <Task key={task._id} {...task} />)
}

const TasksContainer = () => {
  const {
    getTasks,
    tasks,
    isLoading,
    page
  } = useAppContext()
  useEffect(() => {
    getTasks()
  }, [page])
  if (isLoading) {
    return <Loading center />
  }

  if (tasks.length === 0) {
    return (
      <div>
        <h2>No tasks to display...</h2>
      </div>
    )
  }




  return (
    <div className='relative overflow-x-auto shadow-md sm:rounded-lg'>
      <table className="w-full text-sm text-left text-slate-700">
        <thead className='text-xs text-gray-700 uppercase bg-gray-50'>
          <tr>
            <th scope="col" className="px-6 py-3">Task</th>
            <th scope="col" className="px-6 py-3">Start Date</th>
            <th scope="col" className="px-6 py-3">Deadline</th>
            <th scope="col" className="px-6 py-3">Completed</th>
            <th scope="col" className="px-6 py-3">Remove</th>
          </tr>
        </thead>
        <tbody className='text-center items-center'>
          <TaskList tasks={tasks} />
        </tbody>
      </table>
    </div >
  )
}

export default TasksContainer
