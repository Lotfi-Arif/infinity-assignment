const FormRow = ({ type, name, value, handleChange, labelText }) => {
    return (
      <>
        <label htmlFor={name} className='capitalize'>
          {labelText || name}
        </label>
        <input
          type={type}
          value={value}
          name={name}
          onChange={handleChange}
          className='shadow appearance-none border rounded w-full py-2 px-3 mr-4 text-grey-darker'
        />
      </>
    )
  }
  
  export default FormRow
  