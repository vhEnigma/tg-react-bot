import React, { FC, SyntheticEvent } from 'react'
import { StarOutline } from '@mui/icons-material'
import { Box, Rating } from '@mui/material'
import { styled } from '@mui/material/styles'
import useTgTheme from '../../hooks/useTgTheme'

const StyledRating = styled(Rating)({
  '& .MuiRating-iconFilled': {
    color: '#faaf00'
  },
  '& .MuiRating-iconHover': {
    color: '#f2ba39'
  },
  '& .iconFilled': {
    color: 'red',
    background: 'blue'
  },
  iconFilled: {
    color: 'brown'
  }
})

type RatingProps = {
  rating: number
  onChange: (event: SyntheticEvent<Element, Event>, newValue: number | null) => Promise<void>
}

const CustomRating: FC<RatingProps> = ({ rating, onChange }) => {
  const { link_color } = useTgTheme()

  return (
    <Box sx={{ textAlign: 'center' }}>
      <StyledRating
        name='simple-controlled'
        value={rating}
        onChange={onChange}
        size='large'
        emptyIcon={<StarOutline sx={{ borderColor: 'red', color: link_color }} fontSize='inherit' />}
      />
    </Box>
  )
}

export default CustomRating
