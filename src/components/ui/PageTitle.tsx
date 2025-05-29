import React from 'react'

interface TitleProps {
    title:string;
}
const PageTitle:React.FC<TitleProps> = ({title}) => {
  return (
    <h1 className='py-5 uppercase text-[32px] font-medium tracking-widest'>{title}</h1>
  )
}

export default PageTitle