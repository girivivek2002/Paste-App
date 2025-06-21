
import React, { useEffect, useState } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const ViewPaste = () => {
  const {id} = useParams();
  const allpaste = useSelector((state) => state.paste.pastes);
  const paste = allpaste.filter((p) => p._id === id)[0]; // it will give array of all filtered elemnt (same id wale ) uska 0 index wala element de dega 

  return (
     <div className='flex flex-col gap-7 '>
      <div className='flex flex-row gap-7 place-content-between mt-3'>
        <input
          className='p-1 border-2 rounded-2xl w-[60%] pl-5'
          type="text"
          placeholder='enetr title here'
          value={paste.title}
          disabled
          
        />

        
      </div>

      <div className="mt-8">
        <textarea
          className='border-2 rounded-2xl min-w-[500px] p-4 '
          value={paste.content}
          disabled
          placeholder='enter the content here'
          
          rows={20}
        />
      </div>

    </div>
  )
}

export default ViewPaste
