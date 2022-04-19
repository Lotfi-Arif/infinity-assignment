import { useAppContext } from '../context/appContext'
import { useEffect } from 'react'
import Loading from './Loading'
import Task from './Task'
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
      <h5>
        {totalTasks} task{tasks.length > 1 && 's'} found
      </h5>
      <div className='tasks'>
        {tasks.map((task) => {
          return <Task key={task._id} {...task} />
        })}
      </div>
      {numOfPages > 1 && <PageBtnContainer />}
    </div>
  )
}

export default TasksContainer
