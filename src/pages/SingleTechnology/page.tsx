import React, { FC, useEffect, useState } from 'react'
import { Typography } from '@mui/material'
import { useParams } from 'react-router-dom'
import { TechnologyService } from '../../services/Technology'
import Catalog from '../../components/Catalog'
import useTgTheme from '../../hooks/useTgTheme'
import Loader from '../../components/Loader'

const SingleTechnology: FC = () => {
  const { text_color } = useTgTheme()
  const [isLoading, setLoading] = useState(true)
  const [title, setTitle] = useState('')
  const { id } = useParams()

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        const { name } = await TechnologyService.getTechnologyInfoRequest(id)
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
        articlesRequest={TechnologyService.getArticleListByTechnologyRequest}
        testsRequest={TechnologyService.getTestListByTechnologyRequest}
      />
    </>
  )
}
export default SingleTechnology
