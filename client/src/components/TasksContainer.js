import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Task from './Task'
import Navbar from './Navbar'
import PageBtnContainer from './PageBtnContainer'

const TasksContainer = () => {
  const {
    getTasks,
    tasks,
    isLoading,
    page,
    totalTasks,
    search,
    numOfPages,
    completed
  } = useAppContext()
  useEffect(() => {
    getTasks()
    // eslint-disable-next-line
  }, [page, search])
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
    <div>
      <div>
        <div className="flex mb-4 items-center">
          <p className="w-full text-grey-darkest">{tasks.map((task) => {
            return <Task key={task._id} {...task} />
          })}</p>
        </div>
      </div>
    </div>
  )
}

export default TasksContainer
