import  React, { createContext , useContext, useState } from "react";

interface Props {
  children: React.ReactNode
}
type UserType = {
  email: string | null,
  uid: string | null,
  setUid: React.Dispatch<React.SetStateAction<string>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>
}

const Context = React.createContext<UserType>({} as UserType)

const UserProvider: React.FC<Props> = ({children}) => {
  const [uid, setUid] = useState('')
  const [email, setEmail] = useState('')
  return(
    <Context.Provider value={{uid, setUid, email, setEmail}}>
      {children}
    </Context.Provider>
  )
}

export default UserProvider

export const useUser = () => useContext(Context)