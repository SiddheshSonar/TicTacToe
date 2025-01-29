import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import "./index.css"

function App() {
  const [grid, setGrid] = useState(['', '', '', '', '', '', '', '', ''])

  const [player, setPlayer] = useState('')
  const [winner, setWinner] = useState(null)
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  const checkWinner = (currPlayer, newGrid) => {

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i]
      if (newGrid[a] == currPlayer && newGrid[b] == currPlayer && newGrid[c] == currPlayer) {
        return true
      }
    }

    return false

  }

  const Square = ({ idx }) => {
    return (
      <div
        onClick={() => {
          // console.log(winner)
          if (player && !grid[idx] && !winner) {
            const newGrid = [...grid]
            newGrid[idx] = player
            setGrid(newGrid)
            if (checkWinner(player, newGrid)) {
              setWinner(player)
            } else {
              setPlayer(player == 'X' ? 'O' : 'X')
            }
          }
        }}
        className={`${grid[idx] == 'X' ? "text-xcol" : "text-ocol"} bg-gray-900 text-7xl font-extrabold flex items-center justify-center cursor-pointer`}
      >
        {grid[idx]}
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen h-full bg-gray-800 flex items-start justify-between gap-0 relative'>
      <div className='absolute top-8 left-[50.56%] transform -translate-x-1/2 -translate-y-1/2 text-white flex items-center justify-center gap-1 md:text-4xl text-2xl font-extrabold w-max'>
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
      <div className={`${player == 'O' ? "bg-opacity-50" : "bg-opacity-100"} bg-xcol text-white text-center p-4 min-h-screen !h-full w-1/2`}>
      </div>
      {/* grid */}
      <div className='z-100 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white md:size-[500px] size-[300px] grid grid-cols-3 grid-rows-3 gap-1'>
        {player ? (<>
          {grid.map((square, idx) => (
            <Square key={idx} idx={idx} />
          ))
          }
        </>) : (
          <div className='md:size-[500px] size-[300px] p-4 flex items-center justify-center text-justify text-5xl text-gray-900'>
            Click Start to Begin!
          </div>
        )
        }
      </div>
      <div className={`${player == 'X' ? "bg-opacity-50" : "bg-opacity-100"} bg-ocol text-white text-center p-4 min-h-screen !h-full w-1/2`}>
      </div>
      <button
        onClick={() => {
          if (player) {
            setPlayer('')
          }
          else {
            setPlayer('X')
          }
          setWinner(null)
          setGrid([
            '', '', '',
            '', '', '',
            '', '', ''
          ])
        }}
        className='w-[200px] absolute bottom-8 left-[50.56%] transform -translate-x-1/2 bg-gray-900 hover:bg-gray-800 text-white text-lg font-bold p-2 rounded-md'>
        {
          player ? 'Reset' : 'Start'
        }
      </button>
    </div>
  )
}

export default App
