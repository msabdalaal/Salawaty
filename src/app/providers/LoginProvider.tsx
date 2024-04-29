import { auth } from "@/lib/firebaseAuth";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import {
  PropsWithChildren,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import db from "../db/firestore";

type LoginType = {
  loggedin: boolean;
  profilePic: string | null;
  displayName: string | null;
  uid: string | null;
  country: string | null;
  city: string | null;
  changeLogin: (state: boolean) => void;
  changeCountry: (country: string | null) => void;
  changeCity: (city: string | null) => void;
  changeDisplayName: (displayName: string | null) => void;
  changeProfilePic: (url: string | null) => void;
};

export const LoginContext = createContext<LoginType>({
  loggedin: false,
  displayName: "",
  profilePic: "",
  uid: "",
  country: "",
  city: "",
  changeCountry: () => {},
  changeCity: () => {},
  changeLogin: () => {},
  changeDisplayName: () => {},
  changeProfilePic: () => {},
});

const LoginProvider = ({ children }: PropsWithChildren) => {
  const [loggedin, setLoggedin] = useState<boolean>(false);
  const [displayName, changeDisplayName] = useState<string | null>("");
  const [profilePic, setProfilePic] = useState<string | null>("");
  const [country, setCountry] = useState<string | null>("");
  const [city, setCity] = useState<string | null>("");
  const [uid, setUid] = useState<string | null>("");

  const changeLogin = (state: boolean) => {
    setLoggedin(state);
  };
  const changeProfilePic = (url: string | null) => {
    setProfilePic(url);
  };
  const changeCountry = (country: string | null) => {
    setCountry(country);
    storeData(country, "country");
  };
  const changeCity = (city: string | null) => {
    setCity(city);
    storeData(city, "city");
  };

  async function getData() {
    const docSnap = await getDoc(doc(db, `users/${uid}`));
    if (docSnap.exists()) {
      setCountry(docSnap.data().country);
      setCity(docSnap.data().city);
    } else {
      // alert("خطأ في استعادة البيانات");
    }
  }

  async function storeData(data: string | null, type: string) {
    await setDoc(doc(db, `users/${uid}`), {
      country: country,
      city: city,
      [type]: data,
    });
  }

  useEffect(() => {
    if (uid) {
      getData();
    }
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedin(true);
        changeDisplayName(user.displayName);
        setProfilePic(user.photoURL);
        setUid(user.uid);
      } else {
        setLoggedin(false);
      }
    });
  }, [uid]);

  return (
    <LoginContext.Provider
      value={{
        loggedin,
        city,
        country,
        displayName,
        profilePic,
        uid,
        changeCountry,
        changeCity,
        changeLogin,
        changeDisplayName,
        changeProfilePic,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export default LoginProvider;

export const useLogin = () => useContext(LoginContext);
