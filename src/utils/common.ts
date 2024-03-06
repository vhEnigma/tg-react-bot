export const openInNewTab = (url: string): void => {
  const newWindow = window.open(url, '_blank', 'noopener,noreferrer')
  if (newWindow) newWindow.opener = null
}

export const getIntervalDate = (days: number) => {
  const pastDate = new Date()
  pastDate.setDate(pastDate.getDate() - days)
  const today = new Date()

  return {
    from: pastDate.getTime() * 1000,
    to: today.getTime() * 1000
  }
}
