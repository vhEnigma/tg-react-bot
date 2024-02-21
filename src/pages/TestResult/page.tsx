import { FC } from 'react'
import { useParams } from 'react-router-dom'

const TestResult: FC = () => {
  const { id } = useParams()
  return <div>{`TestResult ${id}`}</div>
}

export default TestResult
