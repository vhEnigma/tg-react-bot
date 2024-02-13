declare global {
  interface Window {
    Telegram: any;
  }
}

const tg = window.Telegram.WebApp

export const useTelegram = () => {
  tg.expand()
  return {
    tg,
    tgUser: tg.initData?.user
  }
}