import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addToPastes, updateToPastes } from '../redux/pasteSlice';

const Home = () => {
  const [title, setTitle] = useState('')
  const [value, setvalue] = useState('')
  const [serachParams, setSearchParams] = useSearchParams();
  const pasteID = serachParams.get("pasteId") // it get pasteId if available in url(http://localhost:5175/?pasteId=ujkftgh) like this

  const dispatch = useDispatch();
  const allpaste = useSelector((state)=> state.paste.pastes)  // take out data from store of redux

  useEffect(()=>{
    if(pasteID){
      const paste = allpaste.find((p)=> p._id === pasteID);
      setTitle(paste.title);
      setvalue(paste.content);
    }
  }, [pasteID])
// agar pasteid available h to sabi pates m use find karo jo equal honi chahiye pasteId se
// then sertitle m title and setvalue m content dal do

  function createPaste() {
    const paste = { // paste which store title, content and make a unique id for every paste
      title: title,  // title is key and their value is what we write inside title field
      content: value,
      _id: pasteID ||
        Date.now().toString(36),  // if pasteid available then id will pasteid otherwise it create by Date.now().toString(36) this method
      createdAt: new Date().toISOString(), // time to create paste
    }

    if (pasteID) {  // if paste is is available
      //update
      dispatch(updateToPastes(paste));

    } else { // otherwise create a paste
      dispatch(addToPastes(paste));
    }

    // after creation or updation title and content will clear
    setTitle('')
    setvalue('')
    setSearchParams({})



  }

  return (
    <div className='flex flex-col gap-7 '>
      <div className='flex flex-row gap-7 place-content-between mt-3'>
        <input
          className='p-1 border-2 rounded-2xl w-[60%] pl-5'
          type="text"
          placeholder='Enter Title here'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button
          onClick={createPaste}
          className=' bg-amber-900 border-2 rounded-2xl pl-5'>
          {
            pasteID ? "Update My Paste" : "Create My Paste"
          }
        </button>
      </div>

      <div className="mt-8">
        <textarea
          className='border-2 rounded-2xl min-w-[500px] p-4 '
          value={value}
          placeholder='Enter the Content here'
          onChange={(e) => setvalue(e.target.value)}
          rows={20}
        />
      </div>

    </div>
  )
}

export default Home
