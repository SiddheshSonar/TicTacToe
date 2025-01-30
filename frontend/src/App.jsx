import React, { useState } from 'react'
import CloseIcon from '@mui/icons-material/Close';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import Confetti from 'react-confetti';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import "./index.css"

function App() {
  const [grid, setGrid] = useState(['', '', '', '', '', '', '', '', ''])
  const [history, setHistory] = useState([])
  const [currMove, setCurrMove] = useState(0)
  const [player, setPlayer] = useState('')
  const [winner, setWinner] = useState(null)
  const [draw, setDraw] = useState(false)
  const [open, setOpen] = useState(false)
  const height = window.innerHeight - 1
  const width = window.innerWidth - 1
  const winningCombos = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ]

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  const checkWinner = (currPlayer, newGrid) => {
    // 

    for (let i = 0; i < winningCombos.length; i++) {
      const [a, b, c] = winningCombos[i]
      if (newGrid[a] == currPlayer && newGrid[b] == currPlayer && newGrid[c] == currPlayer) {
        return true
      }
    }

    return false

  }

  const handlePlay = (idx) => {
    if (player && !grid[idx] && !winner) {
      // update history
      const newGrid = [...grid]
      newGrid[idx] = player
      const newHistory = history.slice(0, currMove + 1)
      const newCurrMove = currMove + 1
      newHistory.push(newGrid)
      setHistory(newHistory)
      setCurrMove(newCurrMove)
      setGrid(newGrid)
      if (checkWinner(player, newGrid)) {
        setWinner(player)
        handleOpen()
      } else if (!newGrid.includes('')) {
        setDraw(true);
      } else {
        setPlayer(player == 'X' ? 'O' : 'X')
      }
    }
  }

  const drawDialog = () => {
    return (
      <Dialog
        open={draw}
        // onClose={() => setWinner(null)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>
          Match Draw
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='!text-gray-900'>
            Nobody won, you may jump to any previous moves or reset the game!
            <p className='!font-bold !text-lg my-2'>Game History:</p>
            <div className='w-full flex flex-wrap content-center items-center justify-center gap-4'>
              {history.map((move, idx) => (
                <div
                onClick={() => {
                  if (idx == (history.length - 1)) {
                    return
                  }
                  setGrid(move)
                  setCurrMove(idx)
                  setPlayer(idx % 2 == 0 ? 'O' : 'X')
                  setDraw(false)
                  setWinner(null)
                }}
                  className={`w-[220px] rounded-md shadow-md p-2 !font-bold bg-white text-gray-900 !text-lg flex items-center justify-between ${idx == (history.length - 1) ? 'text-ocol' : 'hover:bg-gray-900 hover:text-white cursor-pointer'}`}
                  key={idx}
                >
                  <CircleOutlinedIcon className='text-ocol' />
                  Move {idx + 1} ({idx % 2 == 0 ? 'O' : 'X'})
                  <CloseIcon className='text-xcol' />
                </div>
              ))
              }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setWinner(null)
              setPlayer('')
              setGrid([
                '', '', '',
                '', '', '',
                '', '', ''
              ])
              setHistory([])
              setCurrMove(0)
              setDraw(false)
            }}
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  const Square = ({ idx }) => {
    return (
      <div
        onClick={() => handlePlay(idx)}
        className={`${grid[idx] == 'X' ? "text-xcol" : "text-ocol"} bg-gray-900 text-7xl font-extrabold flex items-center justify-center cursor-pointer`}
      >
        {grid[idx]}
      </div>
    )
  }

  const winnerDialog = () => {
    return (
      <Dialog
        open={open}
        // onClose={() => setWinner(null)}
        maxWidth='sm'
        fullWidth
      >
        <DialogTitle>
          {winner == 'X' ? 'Player X Wins!' : 'Player O Wins!'}
        </DialogTitle>
        <DialogContent>
          <DialogContentText className='!text-gray-900'>
            Wohooo! Congratulations to Player <span className='!font-bold'>{player}!</span> Better luck next time Player <span className='!font-bold'>{player == 'X' ? 'O' : 'X'}!</span>
            <p className='!font-bold !text-lg my-2'>Game History:</p>
            <div className='w-full flex flex-wrap content-center items-center justify-center gap-4'>
              {history.map((move, idx) => (
                <div
                  className={`w-[220px] rounded-md shadow-md p-2 !font-bold !text-lg flex items-center justify-between ${idx == (history.length - 1) ? 'text-ocol' : 'text-gray-900'}`}
                  key={idx}
                >
                  <CircleOutlinedIcon className='text-ocol' />
                  Move {idx + 1} ({idx % 2 == 0 ? 'O' : 'X'})
                  <CloseIcon className='text-xcol' />
                </div>
              ))
              }
            </div>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              setWinner(null)
              setPlayer('')
              setGrid([
                '', '', '',
                '', '', '',
                '', '', ''
              ])
              setHistory([])
              setCurrMove(0)
              handleClose()
            }}
          >
            Reset
          </Button>
        </DialogActions>
      </Dialog>
    )
  }

  return (
    <div className='w-full max-md:h-[120vh] h-full min-h-screen bg-gray-800 flex items-start justify-between gap-0 relative'>
      {winnerDialog()}
      {drawDialog()}
      {winner && <Confetti width={width} height={height} />}
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
      <div className={`${player == 'O' ? "bg-opacity-50" : "bg-opacity-100"} bg-xcol text-white text-center p-4 !h-full min-h-screen w-1/2`}>
      </div>
      <div className='z-100 absolute max-md:top-[40%] top-[58%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full h-max flex items-center justify-center'>
        <div className='bg-white md:size-[500px] size-[300px] grid grid-cols-3 grid-rows-3 gap-1 relative'>
          {player ? (<>
            {grid.map((square, idx) => (
              <Square key={idx} idx={idx} />
            ))
            }
          </>) : (
            <div className='md:size-[500px] size-[300px] p-4 flex items-center justify-center text-justify md:text-5xl text-3xl text-gray-900'>
              Click Start to Begin!
            </div>
          )
          }
          <div className='absolute z-100 lg:left-[105%] md:left-[101%] max-md:top-[105%] left-[15%] flex flex-col items-start gap-2 md:h-[500px] h-[300px] overflow-scroll scroll-hide'>
            {history.map((move, idx) => (
              <div
                onClick={() => {
                  setGrid(move)
                  setCurrMove(idx)
                  setPlayer(idx % 2 == 0 ? 'O' : 'X')
                  setWinner(null)
                }}
                className={`lg:w-[220px] lg:p-2 lg:text-lg max-md:w-[200px] w-[150px] text-sm flex items-center justify-between rounded-md shadow-md cursor-pointer font-bold bg-white text-gray-900 hover:bg-gray-900 hover:text-white ${idx == currMove ? '' : ''}`}
                key={idx}
              >
                <CircleOutlinedIcon className='text-ocol' />
                Go To Move {idx + 1} ({idx % 2 == 0 ? 'O' : 'X'})
                <CloseIcon className='text-xcol' />
              </div>
            ))
            }
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
              setHistory([])
            }}
            className='w-[200px] absolute md:bottom-[105%] bottom-[110%] left-[50.56%] transform -translate-x-1/2 bg-gray-900 hover:bg-gray-800 text-white text-lg font-bold p-2 rounded-md'>
            {
              player ? 'Reset' : 'Start'
            }
          </button>
        </div>
      </div>
      <div className={`${player == 'X' ? "bg-opacity-50" : "bg-opacity-100"} bg-ocol text-white text-center p-4 min-h-screen !h-full w-1/2`}>
      </div>
    </div>
  )
}

export default App
