export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export const getIntervalDate = (days: number) => {
  const pastDate = new Date()
  pastDate.setDate(pastDate.getDate() - days)
  const today = new Date()

  return {
    from: Math.floor(pastDate.getTime() / 1000),
    to: Math.floor(today.getTime() / 1000)
  }
}
