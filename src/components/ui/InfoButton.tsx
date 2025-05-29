import React from 'react'

interface InfoProps {
    icon:string,
    label:string,
    count?:number,
    bgColor?:string,
    setJobs?:() =>void,
    isActive?:boolean,
}
const InfoButton:React.FC<InfoProps> = ({icon, label, count, bgColor='#1E2027', setJobs, isActive}) => {
  return (
    <button onClick={setJobs} className='min-w-[139px] flex items-center gap-2 px-4 py-4 rounded-[14px] cursor-pointer hover:opacity-75' style={{background:bgColor, border: isActive ? '2px solid #ffffff' : 'none',}}>
        <img src={icon} alt='draft Icon' />
        <span className='text-base font-normal'>{label}</span>
        <span className='px-2'>{count}</span>
    </button>
  )
}

export default InfoButton