import Task from '../models/Task.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'
const createTask = async (req, res) => {
  const { title } = req.body

  if (!title) {
    throw new BadRequestError('Please provide all values')
  }
  req.body.createdBy = req.user.userId
  const task = await Task.create(req.body)
  res.status(StatusCodes.CREATED).json({ task })
}
const getAllTasks = async (req, res) => {
  const { title } = req.query

  const queryObject = {
    createdBy: req.user.userId,
  }
  // add stuff based on condition
  if (title && title !== '') {
    queryObject.title = title
  }

  let result = Task.find(queryObject)

  const tasks = await result

  const totalTasks = await Task.countDocuments(queryObject)

  res.status(StatusCodes.OK).json({ tasks, totalTasks })
}
const updateTask = async (req, res) => {
  const { id: taskId } = req.params
  // const { completed } = req.body
  
  const task = await Task.findOne({ _id: taskId })

  if (!task) {
    throw new NotFoundError(`No task with id :${taskId}`)
  }

  checkPermissions(req.user, task.createdBy)

  const updatedTask = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
    new: true,
    runValidators: true,
  })

  res.status(StatusCodes.OK).json({ updatedTask })
}
const deleteTask = async (req, res) => {
  const { id: taskId } = req.params

  const task = await Task.findOne({ _id: taskId })

  if (!task) {
    throw new NotFoundError(`No task with id :${taskId}`)
  }

  checkPermissions(req.user, task.createdBy)

  await task.remove()

  res.status(StatusCodes.OK).json({ msg: 'Success! Task removed' })
}

export { createTask, deleteTask, getAllTasks, updateTask }
