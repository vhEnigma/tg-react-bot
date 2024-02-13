import { RouterProvider } from "react-router-dom";
import { AuthContext } from "core/context/AuthContext";
import { useAuth } from "core/hooks/useAuth";
import { router } from "Routes";
import { ThemeProvider } from "@mui/material/styles";
import { useTelegram } from "core/hooks/useTelegram";
import { createCustomTheme } from "core/configs/theme";

export const Providers = () => {
  const { login, isLogin, user } = useAuth();

  const { tg } = useTelegram();
  const theme = createCustomTheme(tg);

  return (
    <AuthContext.Provider value={{ login, isLogin, user }}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={router} />
      </ThemeProvider>
    </AuthContext.Provider>
  );
};
