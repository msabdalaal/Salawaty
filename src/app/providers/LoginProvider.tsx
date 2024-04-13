import { PropsWithChildren, createContext, useContext, useState } from "react";

type LoginType = {
  loggedin: boolean;
  changeLogin: (state: boolean) => void;
};

export const LoginContext = createContext<LoginType>({
  loggedin: false,
  changeLogin: () => {},
});

const LoginProvider = ({ children }: PropsWithChildren) => {
  const [loggedin, setLoggedin] = useState<boolean>(false);

  const changeLogin = (state: boolean) => {
    setLoggedin(state);
  };
  return (
    <LoginContext.Provider value={{ loggedin, changeLogin }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => useContext(LoginContext);
