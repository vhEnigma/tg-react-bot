
const tg = window.Telegram.WebApp
function App() {

  const handleClose = () => {
    tg.close()
  }

  return (
      <button onClick={handleClose}>Close</button>
  )
}

export default App
