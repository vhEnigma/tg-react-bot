import {FC} from 'react'
import {RouteList} from "../../routes/routes.ts";
import {Box, ListItemButton, ListItemIcon, ListItemText, Typography} from "@mui/material";
import {AccessTime} from "@mui/icons-material";
import StarRateIcon from "@mui/icons-material/StarRate";
import {useNavigate} from "react-router-dom";
import useTgTheme from "../../hooks/useTgTheme.ts";

type ArticleCardProps = {
    rating: number
    topic: string
    reading_time: number
    difficulty: number
}

const ArticleListItem: FC<ArticleCardProps> = ({rating, topic, reading_time, difficulty}) => {
    const navigate= useNavigate()
    const {bg_color, text_color, button_color} = useTgTheme()

    return <ListItemButton onClick={() => navigate(`/${RouteList.Article}`)} sx={{ borderTop: `1px solid ${button_color}`, backgroundColor: bg_color }}>
        <ListItemText primary={topic} />
        <ListItemIcon>
            <Box sx={{display: 'flex', gap: '10px'}}>
                <Typography sx={{color: text_color}}>{reading_time} мин.</Typography>
                <AccessTime sx={{color: text_color}} />
                <Typography sx={{color: text_color}} component='span'> | </Typography>
                <Typography sx={{color: text_color}} component='span'> {difficulty}/{rating}</Typography>
                <StarRateIcon sx={{color: 'yellow'}}/>
            </Box>
        </ListItemIcon>
    </ListItemButton>
}

export default ArticleListItem