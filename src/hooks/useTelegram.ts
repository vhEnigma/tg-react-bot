declare global {
  interface Window {
    Telegram: any;
  }
}

const tg = window.Telegram.WebApp

export const useTelegram = () => {
  tg.expand()
  console.log(tg)
  if (tg.initData?.user) {
    tg.showAlert(`Добро пожаловать, @${tg.initData?.user}.`)
  }
  return {
    tg,
    tgUser: tg.initData?.user
  }
}