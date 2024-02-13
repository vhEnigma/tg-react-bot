declare global {
  interface Window {
    Telegram: any;
  }
}

const tg = window.Telegram.WebApp

export const useTelegram = () => {
  tg.expand()

  tg.showAlert(`Добро пожаловать, @${tg.WebAppUser.username}.`)
  return {
    tg,
    tgUser: tg.initData?.user
  }
}