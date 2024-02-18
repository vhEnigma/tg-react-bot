import { useTheme } from '@mui/material/styles'

const useTgTheme = () => {
  const {
    palette: {
      customColors: {
        bg_color,
        text_color,
        hint_color,
        link_color,
        button_color,
        button_text_color,
        secondary_bg_color,
        header_bg_color,
        accent_text_color,
        section_bg_color,
        section_header_text_color,
        subtitle_text_color,
        destructive_text_color
      }
    }
  } = useTheme()

  return {
    bg_color: bg_color.main,
    text_color: text_color.main,
    hint_color: hint_color.main,
    link_color: link_color.main,
    button_color: button_color.main,
    button_text_color: button_text_color.main,
    secondary_bg_color: secondary_bg_color.main,
    header_bg_color: header_bg_color.main,
    accent_text_color: accent_text_color.main,
    section_bg_color: section_bg_color.main,
    section_header_text_color: section_header_text_color.main,
    subtitle_text_color: subtitle_text_color.main,
    destructive_text_color: destructive_text_color.main
  }
}

export default useTgTheme
