import { FC } from 'react'
import {useNavigate} from "react-router-dom";

const Article: FC = () => {
  const navigate = useNavigate()

  const handleBack = () => {
    navigate(-1)
  }
  return <>
    <button onClick={handleBack}>Назад </button>
    <div>Article</div>
    </>
}

export default Article