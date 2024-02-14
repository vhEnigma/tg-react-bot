declare global {
  interface Window {
    Telegram: any;
  }
}

const tg = window.Telegram.WebApp

export const useTelegram = () => {
  tg.expand()
  const user = tg.initDataUnsafe.user
  console.log(tg)
  return {
    tg,
    user
  }
}