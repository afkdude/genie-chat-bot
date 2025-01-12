import avatar from '../assets/avatar2.svg'
const Header = () => {
  return (
    <div className="text-white  flex justify-end w-full  py-4 px-4 text-xl ">

      <div className='theme-switch'>

        

      </div>
      <div className='h-11 w-11  rounded-lg flex items-center justify-center   bg-white '>
        <img src={avatar} alt="" className='h-full w-full' />
      </div>
    </div>
  )
}

export default Header