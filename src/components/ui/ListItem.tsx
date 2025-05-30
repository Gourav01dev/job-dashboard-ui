import { ChevronDown, ChevronUp } from 'lucide-react'
import React, { useState } from 'react'


interface SubOptionsProps {
  label:string,
  icon: string,
  count?:number,
}
interface ListProps{
    name:string,
    image:string,
    subOption: SubOptionsProps[]
}
const ListItem:React.FC<ListProps> = ({name, image, subOption}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  return (
    <>
    <div onClick={() => setIsOpen(!isOpen)} className='flex gap-4 py-[14px] cursor-pointer'>
        <img src={image || ''} alt={name} />
        <h6 className='text-sm fw-[400]'>{name || 'name'}</h6>

        {subOption && subOption.length > 0 && (
          !isOpen ? (
            <ChevronDown className='w-4 h-4 text-Secondary ml-auto' />
          ) : (
            <ChevronUp className='w-4 h-4 text-Secondary ml-auto' />
          )
        )}
      </div>

      {subOption?.length > 0 && isOpen && (
        <div className='flex flex-col gap-2 pl-6 mt-1'>
          {subOption.map((item, idx) => (
            <div key={idx} className='flex items-center gap-2 py-3 cursor-pointer'>
              <img src={item.icon || ''} alt={item.label} width={22} height={20} />
              <h6 className='text-sm font-normal'>{item.label || 'label'}</h6>
              {item.count !== undefined && (
                <span className='text-[11px] text-Primary bg-[#2A2A2A] rounded-full px-2 ml-auto'>{item.count}</span>
              )}
            </div>
          ))}
        </div>
      )}
      </>
  )
}

export default ListItem