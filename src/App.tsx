import { useEffect } from 'react'
import { useTelegram } from './hooks/useTelegram.ts'

function App() {

  const { tg } = useTelegram()

  useEffect(() => {
    tg.ready()
  }, [])

  const handleClose = () => {
    tg.close()
  }

  return (
    <button onClick={handleClose}>Close</button>
  )
}

export default App
