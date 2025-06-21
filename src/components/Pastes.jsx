import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { removeFromPastes } from '../redux/pasteSlice';
import toast from 'react-hot-toast';

const Pastes = () => {
  const pastes = useSelector((state) => state.paste.pastes);  // The selector function is responsible for selecting a part of the Redux store's state or computing derived data
  //const count = useSelector((state) => state.counter.value)
  const [searchTerm, setsearchTerm] = useState('')
  const dispatch = useDispatch()

  const filteredData = pastes.filter((paste) => paste.title.toLowerCase().includes(searchTerm.toLowerCase()))
  // All pastes par filter lagao
  // har paste par jao or check karo jo tumne serchTerm m search kiya h wo include h ki nahi pastes m yadi h to dika do

  function handleDelete(pasteId) {
    dispatch(removeFromPastes(pasteId))
  }




  return (
    <div>
      <input
        className='p-1 border-2 rounded-2xl pl-5 w-[100%] mt-3'
        type="search"
        placeholder='Search here'
        value={searchTerm}
        onChange={(e) => setsearchTerm(e.target.value)}
      />
      <div className='flex flex-col gap-5 mt-5'>
        {
          filteredData.length > 0 &&
          filteredData.map(
            (paste) => {
              return (
                <div className='border p-3 rounded-2xl' key={paste?._id}>
                  <div className='text-2xl'>
                    <h1>{paste.title}</h1>
                  </div>
                  <div className=''>
                    {paste.content}
                  </div>
                  <div className='flex flex-row place-content-evenly'>
                    <button
                      onClick={() => handleDelete(paste?._id)}  >
                      Delete
                    </button>
                    <button>
                      <a href={`/?pasteId=${paste?._id}`}>Edit</a>
                    </button>
                    <button>
                      <a href={`/pastes/${paste?._id}`}>View</a>
                    </button>
                    <button
                      onClick={() => {
                        navigator.clipboard.writeText(paste?.content)
                        toast.success("copied to clipboard")
                      }}>
                      Copy
                    </button>
                    <button onClick={() => navigator.share({
                      title: paste.title,
                      text: paste.content,
                      url: window.location.href + `?pasteId=${paste._id}`,
                    })}>
                      Share
                    </button>
                  </div>
                  <div className='text-center text-blue-600'>
                    {
                      (() => {
                        const d = new Date(paste.createdAt);
                        // const o = (n) => ["th", "st", "nd", "rd"][(n % 10 > 3 || Math.floor(n % 100 / 10) === 1) ? 0 : n % 10];
                        return `${d.toLocaleString('en-US', { month: 'long' })} ${d.getDate()}, ${d.getFullYear()}`;
                      })()
                    }
                  </div>


                </div>

              )
            }
          )

        }

      </div>
    </div>
  )
}



export default Pastes




// onClick={() => handleDelete(paste?._id)} = onclick paste id aa jayegi iske pass aor ye ese handleDelete function ko paste id de dega
//  function handleDelete(pasteId) {
//   dispatch(removeFromPastes(pasteId))
// }


// key={paste?._id} = use for uniqueness of every child
