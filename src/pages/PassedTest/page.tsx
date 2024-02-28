import React, { FC } from 'react'
import { useParams } from 'react-router-dom'
import useBackButton from '../../hooks/useBackButton'

const PassedTest: FC = () => {
  const { id } = useParams()
  useBackButton()

  return <div>{id}</div>
}

export default PassedTest
