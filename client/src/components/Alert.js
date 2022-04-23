import { useAppContext } from '../context/appContext'

const Alert = () => {
  const { alertType, alertText } = useAppContext()
  if (alertType === 'danger') {
    return (
      <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg dark:bg-red-200 dark:text-red-800" role="alert">
        <span className="font-medium">{alertText}</span>
      </div>

    )
  }
  if (alertType === 'success') {
    return (
      <div className="p-4 mb-4 text-sm text-green-700 bg-green-100 rounded-lg dark:bg-green-200 dark:text-green-800" role="alert">
        <span className="font-medium">{alertText}</span></div>

    )
  }

}

export default Alert
