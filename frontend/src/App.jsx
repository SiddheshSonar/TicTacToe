import React from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import "./index.css"

function App() {

  return (
    <div className='w-full min-h-screen h-full bg-gray-800 flex items-start justify-between gap-0 relative'>
      <div className='absolute top-8 left-[50.56%] transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center gap-1 text-4xl font-extrabold p-4 w-max'>
        <CircleOutlinedIcon
          className='text-ocol !text-4xl'
        />
        <p>
          <span className='text-ocol'>TIC-T</span>
          <span className='bg-gradient-to-r from-ocol to-xcol text-transparent bg-clip-text'
          >A</span>
          <span className='text-xcol'>C-TOE</span>
        </p>
        <CloseIcon
          className='text-xcol !text-4xl'
        />
      </div>
      <div className='bg-xcol text-white text-center p-4 min-h-screen !h-full w-1/2'>
      </div>
      <div className='bg-ocol text-white text-center p-4 min-h-screen !h-full w-1/2'>
      </div>
    </div>
  )
}

export default App
