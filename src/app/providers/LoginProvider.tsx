import { getAuth, onAuthStateChanged } from "firebase/auth";
import { PropsWithChildren, createContext, useContext, useEffect, useState } from "react";

type LoginType = {
  loggedin: boolean;
  profilePic: string | null,
  displayName: string | null ,
  changeLogin: (state: boolean) => void;
  changeDisplayName: (displayName: string | null) => void,
  changeProfilePic: (url: string | null) => void;
};

export const LoginContext = createContext<LoginType>({
  loggedin: false,
  displayName: "",
  profilePic: "",
  changeLogin: () => {},
  changeDisplayName: () => {},
  changeProfilePic: () => {},
});



const LoginProvider = ({ children }: PropsWithChildren) => {
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [displayName, changeDisplayName] = useState<string | null>("");
  const [profilePic, setProfilePic] = useState<string | null>("");

  const changeLogin = (state: boolean) => {
    setLoggedin(state);
  };
  const changeProfilePic = (url: string | null)=>{
    setProfilePic(url)
  }

useEffect(() => {
  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
  if (user) {
    setLoggedin(true);
    changeDisplayName(user.displayName)
    setProfilePic(user.photoURL)
  } else {
    setLoggedin(false)
  }
});
}, [])


  return (
    <LoginContext.Provider value={{ loggedin, displayName , profilePic, changeLogin, changeDisplayName, changeProfilePic }}>
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => useContext(LoginContext);
