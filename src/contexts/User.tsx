import React, { createContext, useEffect, useState } from "react";
import { auth, database } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { UserType as User } from "../types";
import { get, ref } from "firebase/database";
import Loading from "../components/loading/Loading";

export const UserContext = createContext<any | null>(null);

function UserContextProvider({ children }: { children: React.ReactNode }) {
  const [authUser, setAuthUser] = useState<User | null>(null);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        get(ref(database, `users/${user.uid}`)).then((data) => {
          const u = data.val();

          if (u) {
            setAuthUser((prev) => {
              if (prev) return { ...prev, ...user };
              else
                return {
                  color: u.color,
                  nickname: u.username,
                  image: u.image,
                  ...user,
                };
            });
          }

          setLoading(false);
        });
      } else {
        setLoading(false);
        return navigate("/login");
      }
    });
  }, []);

  return (
    <UserContext.Provider
      value={{
        authUser,
      }}
    >
      {loading && <Loading loading={loading} />}
      {children}
    </UserContext.Provider>
  );
}

export default UserContextProvider;
