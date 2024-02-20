import { FC } from 'react'
import { useNavigate } from 'react-router-dom'

const Test: FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }
  return (
    <>
      <button type='submit' onClick={handleBack}>
        Назад!
      </button>
      <div>Test</div>
    </>
  )
}

export default Test
