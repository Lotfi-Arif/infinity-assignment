import express from 'express'
const router = express.Router()

import {
  createTask,
  deleteTask,
  getAllTasks,
  updateTask
} from '../controller/tasksController.js'

router.route('/').post(createTask).get(getAllTasks)
// remember about :id
router.route('/:id').delete(deleteTask).put(updateTask)

export default router
