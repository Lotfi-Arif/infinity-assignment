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
    <>
      <table class="table-auto">
        <thead>
          <tr>
            <th>Task</th>
            <th>Deadline</th>
            <th>Done?</th>
            <th>Remove</th>
          </tr>
        </thead>
      </table>
      <div className="flex mb-4 items-center">
        <p className="w-full text-grey-darkest">
          <TaskList tasks={tasks} />
        </p>
      </div>
    </>
  )
}

export default TasksContainer
