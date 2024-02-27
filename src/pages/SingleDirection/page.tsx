import React, { FC, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Typography } from '@mui/material'
import { DirectionService } from '../../services/Direction'
import Catalog from '../../components/Catalog'
import Loader from '../../components/Loader'
import useTgTheme from '../../hooks/useTgTheme'

const SingleDirection: FC = () => {
  const { text_color } = useTgTheme()
  const [isLoading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { name } = await DirectionService.getDirectionInfoRequest(id)
        setTitle(name)
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  if (isLoading || !id) return <Loader />

  return (
    <>
      <Typography
        component='h1'
        sx={{
          color: text_color,
          textAlign: 'center',
          m: '20px 0',
          textTransform: 'uppercase'
        }}
      >
        {title}
      </Typography>
      <Catalog
        requestId={id}
        articlesByFilterRequest={DirectionService.getArticleListByDirectionRequest}
        testsByFilterRequest={DirectionService.getTestListByDirectionRequest}
      />
    </>
  )
}

export default SingleDirection
