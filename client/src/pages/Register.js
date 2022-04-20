import { useState, useEffect } from 'react'
import { FormRow, Alert } from '../components'
import logo from '../assets/images/reg.png'
import { useAppContext } from '../context/appContext'
import { useNavigate } from 'react-router-dom'
const initialState = {
  name: '',
  email: '',
  password: '',
  isMember: false,
}

const Register = () => {
  const navigate = useNavigate()
  const [values, setValues] = useState(initialState)
  const { user, isLoading, showAlert, displayAlert, setupUser } =
    useAppContext()

  const toggleMember = () => {
    setValues({ ...values, isMember: !values.isMember })
  }

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = (e) => {
    e.preventDefault()
    const { name, email, password, isMember } = values
    if (!email || !password || (!isMember && !name)) {
      displayAlert()
      return
    }
    const currentUser = { name, email, password }
    if (isMember) {
      setupUser({
        currentUser,
        endPoint: 'login',
        alertText: 'Login Successful! Redirecting...',
      })
    } else {
      setupUser({
        currentUser,
        endPoint: 'register',
        alertText: 'User Created! Redirecting...',
      })
    }
  }

  useEffect(() => {
    if (user) {
      setTimeout(() => {
        navigate('/')
      }, 3000)
    }
  }, [user, navigate])

  return (
    <div className='flex items-center justify-center min-h-screen bg-gray-100 '>
      <div className="px-8 py-6 mx-4 mt-4 text-left bg-white shadow-lg md:w-1/3 lg:w-1/3 sm:w-1/3 rounded-2xl">
        <form className='form' onSubmit={onSubmit}>
          <h3 className="text-2xl font-bold text-center">Join us</h3>
          <img
            className="h-auto w-auto mx-auto mt-6 mb-6"
            src={logo}
            alt="Test"
          />
          <h3 className="text-2xl font-bold text-center">{values.isMember ? 'Login' : 'Register'}</h3>
          {showAlert && <Alert />}
          {/* name input */}
          {!values.isMember && (
            <FormRow
              type='text'
              name='name'
              value={values.name}
              handleChange={handleChange}
            />
          )}

          {/* email input */}
          <FormRow
            type='email'
            name='email'
            value={values.email}
            handleChange={handleChange}
          />
          {/* password input */}
          <FormRow
            type='password'
            name='password'
            value={values.password}
            handleChange={handleChange}
          />
          <button type='submit' className='w-full px-6 py-2 mt-4 text-white bg-blue-600 rounded-lg hover:bg-blue-900' disabled={isLoading}>
            Submit
          </button>
          <p className='mt-6 text-grey-dark'>
            {values.isMember ? 'Not a member yet?' : 'Already a member?'}
            <button type='button' onClick={toggleMember} className='text-blue-600 hover:underline'>
              {values.isMember ? 'Register' : 'Login'}
            </button>
          </p>
        </form>
      </div>
    </div>
  )
}
export default Register
