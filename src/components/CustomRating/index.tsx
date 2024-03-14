import React, {FC, SyntheticEvent} from 'react'
import {StarOutline} from '@mui/icons-material'
import {Box, Rating} from '@mui/material'
import {styled} from '@mui/material/styles'
import useTgTheme from '../../hooks/useTgTheme'

type RatingProps = {
    rating: number
    onChange: (event: SyntheticEvent<Element, Event>, newValue: number | null) => Promise<void>
}

const CustomRating: FC<RatingProps> = ({rating, onChange}) => {
    const {link_color, button_color, accent_text_color} = useTgTheme()

    const StyledRating = styled(Rating)({
        '& .MuiRating-iconFilled': {
            color: button_color
        },
        '& .MuiRating-iconHover': {
            color: accent_text_color
        }
    })

    return (
        <Box sx={{textAlign: 'center'}}>
            <StyledRating
                name='simple-controlled'
                value={rating}
                onChange={onChange}
                size='large'
                emptyIcon={<StarOutline sx={{color: link_color}} fontSize='inherit'/>}
            />
        </Box>
    )
}

export default CustomRating
