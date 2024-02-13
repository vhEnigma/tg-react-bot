declare global {
  interface Window {
    Telegram: any;
  }
}

const tg = window.Telegram.WebApp

export const useTelegram = () => {
  tg.expand()
  console.log(tg)
  tg.showAlert(`Добро пожаловать, @${tg.initData}.`)
  return {
    tg
  }
}