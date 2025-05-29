import React from 'react'
import { Logo } from '../assets'
import UserProfileCard from './ui/UserProfileCard'
import ListItem from './ui/ListItem'
import { sidebarItems } from '../utils/constants'

const Sidebar: React.FC = () => {
  return (
    <div className='bg-darkGray h-screen w-[16rem] shrink-0 relative pb-[100px]'>
      <div className='py-7 px-5'>
        <img src={Logo} alt='Logo' />
      </div>
      <div className='flex flex-col justify-center px-4'>
        <div className='px-[22px]'>
          {sidebarItems.map((item, index) =>(
            <div key={index}>
              <ListItem image={item.icon} name={item.label} subOption={item.children}/>
            </div>
          ))}
        </div>
        
      </div>
      <div className='absolute bottom-0 left-0 w-full p-[16px] z-1'>
          <UserProfileCard />
        </div>
    </div>
  )
}

export default Sidebar