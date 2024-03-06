declare global {
  interface Window {
    // eslint-disable-next-line
    Telegram: any
  }
}

const tg = window.Telegram.WebApp

export const useTelegram = () => {
  tg.expand()
  const { user } = tg.initDataUnsafe

  return {
    tg,
    user
  }
}
