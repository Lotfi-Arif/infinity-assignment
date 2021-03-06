import Logos from '../assets/images/Infinity.png'
import { Navbar } from '../components'
const Landing = () => {
  return (
    <div>
      <Navbar />
      <div className='grid items-center mb-2'>
        <img src={Logos} alt='React Test' className='h-24 m-6 w-24 mx-auto' />
        <article className='p-2 mx-auto text-justify'>
          <h1 className='text-5xl font-bold text-center text-gray-900'>
            Infinity Wave Assignment
          </h1>
          <div className='mt-8 prose'>
            <h2 className='text-xl'>Welcome to my submission of this coding assignment!</h2>
            <h4 className='font-bold text-l'>
              What is the tech stack am i using?
            </h4>
            <div className='px-2'>
              <p className='font-bold'>
                FrontEnd:
              </p>
              <ul className="list-disc">
                <li>React v17</li>
                <li>Tailwindcss v3</li>
              </ul>
              <p className='font-bold'>
                BackEnd:
              </p>
              <ul className="list-disc">
                <li>MongoDB</li>
                <li>ExpressJs</li>
              </ul>
            </div>
          </div>
        </article>
      </div>
    </div>
  )
}

export default Landing