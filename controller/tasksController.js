import Task from '../models/Task.js'
import { StatusCodes } from 'http-status-codes'
import {
  BadRequestError,
  NotFoundError,
} from '../errors/index.js'
import checkPermissions from '../utils/checkPermissions.js'


const createTask = async (req, res) => {
  
  if (!req.body.title && (req.body.createdAt > req.body.deadline && req.body.deadline !== null)) {
    throw new BadRequestError('Please provide all values or pick the deadline to be after the created date')
  }
  if (!req.body.title ) {
    throw new BadRequestError('Please provide all values')
  }
  if (req.body.createdAt > req.body.deadline && req.body.deadline !== null) {
    throw new BadRequestError('Please pick the deadline to be after the created date')
  }
  if(req.body.completed) {
    req.body.completedAt = req.body.completedAt ? req.body.completedAt : Date.now();
  } else {
    req.body.completedAt = null;
  }

  req.body.createdBy = req.user.userId
  const task = await Task.create(req.body)
  res.status(StatusCodes.CREATED).json({ task })
}

const getAllTasks = async (req, res) => {
  const { title, deadline, startDate } = req.query
  const queryObject = {
    createdBy: req.user.userId,
  }

  if (title && title !== '') {
    queryObject.title = title
  }

  new Date(startDate)

  let result = Task.find(queryObject)
  const tasks = await result
  const totalTasks = await Task.countDocuments(queryObject)

  res.status(StatusCodes.OK).json({ tasks, totalTasks, deadline, startDate })
}

const updateTask = async (req, res) => {
  const { id: taskId } = req.params
  const task = await Task.findOne({ _id: taskId })

  if (!task) {
    throw new NotFoundError(`No task with id :${taskId}`)
  }

  if (!req.body.title && (req.body.createdAt > req.body.deadline && req.body.deadline !== null)) {
    throw new BadRequestError('Please provide all values or pick the deadline to be after the created date')
  }
  if (req.body.createdAt > req.body.deadline && req.body.deadline !== null) {
    throw new BadRequestError('Please pick the deadline to be after the created date')
  }
  if(req.body.completed) {
    req.body.completedAt = req.body.completedAt ? req.body.completedAt : Date.now();
  } else {
    req.body.completedAt = null;
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
