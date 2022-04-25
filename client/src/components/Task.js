import { useAppContext } from '../context/appContext'
import moment from "moment";

const Task = ({
  _id,
  title,
  completed,
  startDate,
  deadline
}) => {
  const { editTask, deleteTask } = useAppContext()

  startDate = moment(startDate).format("ddd, DD MMM YYYY - H:mm");
  startDate = startDate === "Invalid date" ? "Not set" : startDate;
  
  deadline = moment(deadline).format("ddd, DD MMM YYYY - H:mm");
  deadline = deadline === "Invalid date" ? "Not set" : deadline;


  return (
    <>
    <tr className='bg-white border-b whitespace-nowrap word-table'>
        <td className="px-6 py-4 font-medium text-gray-900"> <strong className={completed ? 'line-through' : 'text-slate-800'}>{title}</strong></td>
        <td className="px-6 py-4">{completed ? <del>{startDate}</del> : startDate}</td>
        <td className="px-6 py-4">{completed ? <del>{deadline}</del> : deadline}</td>
        <td className='mx-auto'>
        <input className="h-5 w-5 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 align-baseline bg-no-repeat bg-center bg-contain float-none cursor-pointer"
          type="checkbox"
          checked={completed}
          id="flexCheckDefault"
          onChange={() => editTask({ _id, title, completed, startDate, deadline})} />
        </td>
        <td className="px-6 py-4">
        <button
          type='button'
          className='text-white bg-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center'
          onClick={() => deleteTask(_id)}
        >
          Remove
        </button>
        </td>
      </tr>
    </>
  )
}

export default Task
