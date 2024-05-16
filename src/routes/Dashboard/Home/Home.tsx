import WorkingPerson from '@/assets/images/working-person.svg'

import '@/assets/css/components/Home.css'

const Home: React.FC = () => {
  return (
    <div className='view default-view'>
      <h1>Hi David,</h1>
      <span>Welcome back !</span>
      <img src={WorkingPerson}></img>
    </div>
  )
}

export default Home
