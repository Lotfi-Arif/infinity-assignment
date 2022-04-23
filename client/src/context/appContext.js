import React, { useReducer, useContext } from 'react'

import reducer from './reducer'
import axios from 'axios'
import {
  DISPLAY_ALERT,
  CLEAR_ALERT,
  SETUP_USER_BEGIN,
  SETUP_USER_SUCCESS,
  SETUP_USER_ERROR,
  LOGOUT_USER,
  UPDATE_USER_BEGIN,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_ERROR,
  HANDLE_CHANGE,
  CREATE_TASK_BEGIN,
  CREATE_TASK_SUCCESS,
  CREATE_TASK_ERROR,
  GET_TASKS_BEGIN,
  GET_TASKS_SUCCESS,
  SET_DONE_TASK,
  DELETE_TASK_BEGIN,
  EDIT_TASK_BEGIN,
  EDIT_TASK_ERROR,
  CLEAR_VALUES
} from './actions'

const token = localStorage.getItem('token')
const user = localStorage.getItem('user')

const initialState = {
  isLoading: false,
  showAlert: false,
  alertText: '',
  alertType: '',
  editTaskId: '',
  title: '',
  search: '',
  tasks: [],
  numOfPages: 1,
  page: 1,
  completed: false,
  isEditing: false,
  totalTasks: 0,
  user: user ? JSON.parse(user) : null,
  token: token
}

const AppContext = React.createContext()

const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState)

  // axios
  const authFetch = axios.create({
    baseURL: '/api/v1',
  })
  // request

  authFetch.interceptors.request.use(
    (config) => {
      config.headers.common['Authorization'] = `Bearer ${state.token}`
      return config
    },
    (error) => {
      return Promise.reject(error)
    }
  )
  // response

  authFetch.interceptors.response.use(
    (response) => {
      return response
    },
    (error) => {
      // console.log(error.response)
      if (error.response.status === 401) {
        logoutUser()
      }
      return Promise.reject(error)
    }
  )

  const displayAlert = () => {
    dispatch({ type: DISPLAY_ALERT })
    clearAlert()
  }

  const clearAlert = () => {
    setTimeout(() => {
      dispatch({ type: CLEAR_ALERT })
    }, 3000)
  }

  const addUserToLocalStorage = ({ user, token }) => {
    localStorage.setItem('user', JSON.stringify(user))
    localStorage.setItem('token', token)
  }

  const removeUserFromLocalStorage = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('user')
  }

  const setupUser = async ({ currentUser, endPoint, alertText }) => {
    dispatch({ type: SETUP_USER_BEGIN })
    try {
      const { data } = await axios.post(`/api/v1/auth/${endPoint}`, currentUser)

      const { user, token } = data
      dispatch({
        type: SETUP_USER_SUCCESS,
        payload: { user, token, alertText },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      dispatch({
        type: SETUP_USER_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    clearAlert()
  }
  const logoutUser = () => {
    dispatch({ type: LOGOUT_USER })
    removeUserFromLocalStorage()
  }
  const clearValues = () => {
    dispatch({ type: CLEAR_VALUES })
  }
  const updateUser = async (currentUser) => {
    dispatch({ type: UPDATE_USER_BEGIN })
    try {
      const { data } = await authFetch.patch('/auth/updateUser', currentUser)

      const { user, token } = data

      dispatch({
        type: UPDATE_USER_SUCCESS,
        payload: { user, token },
      })
      addUserToLocalStorage({ user, token })
    } catch (error) {
      if (error.response.status !== 401) {
        dispatch({
          type: UPDATE_USER_ERROR,
          payload: { msg: error.response.data.msg },
        })
      }
    }
    clearAlert()
  }

  const handleChange = ({ name, value }) => {
    dispatch({ type: HANDLE_CHANGE, payload: { name, value } })
  }

  const createTask = async () => {
    dispatch({ type: CREATE_TASK_BEGIN })
    try {
      const { title } = state
      await authFetch.post('/tasks', {
        title
      })
      dispatch({ type: CREATE_TASK_SUCCESS })
      dispatch({ type: CLEAR_VALUES })
    } catch (error) {
      if (error.response.status === 401) return
      dispatch({
        type: CREATE_TASK_ERROR,
        payload: { msg: error.response.data.msg },
      })
    }
    getTasks()
    clearAlert()
  }

  const getTasks = async () => {

    let url = `/tasks`
  
    dispatch({ type: GET_TASKS_BEGIN })
    try {
      const { data } = await authFetch.get(url)
      const { tasks, totalTasks } = data
      dispatch({
        type: GET_TASKS_SUCCESS,
        payload: {
          tasks,
          totalTasks
        },
      })
    } catch (error) {
      console.log(error)
    }
    clearAlert()
  }

  const setEditTask = (id) => {
    dispatch({ type: SET_DONE_TASK, payload: { id } })
  }
  const editTask = async (task) => {
    dispatch({ type: EDIT_TASK_BEGIN })

    try {
      const updatedTodo = { completed: !task.completed }
      await authFetch.put(`/tasks/${task._id}`, updatedTodo)
      dispatch({ type: SET_DONE_TASK, payload: {...task, completed:!task.completed} })

    } catch (error) {
      if (error.response?.status === 401) return
      dispatch({
        type: EDIT_TASK_ERROR,
        payload: { msg: error.response?.data.msg },
      })
    }
    clearAlert()
  }
  const deleteTask = async (taskId) => {
    dispatch({ type: DELETE_TASK_BEGIN })
    try {
      await authFetch.delete(`/tasks/${taskId}`)
      getTasks()
    } catch (error) {
      logoutUser()
    }
  }

  return (
    <AppContext.Provider
      value={{
        ...state,
        displayAlert,
        setupUser,
        logoutUser,
        updateUser,
        handleChange,
        createTask,
        getTasks,
        setEditTask,
        deleteTask,
        editTask,
        clearValues
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

const useAppContext = () => {
  return useContext(AppContext)
}

export { AppProvider, initialState, useAppContext }
