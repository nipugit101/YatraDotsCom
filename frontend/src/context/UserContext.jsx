// frontend/src/context/UserContext.jsx
import React, { createContext, useState } from 'react'

// Create context
export const UserDataContext = createContext()

// Provider component
const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    email: '',
    fullname: {
      firstname: '',
      lastname: ''
    }
  })

  return (
    <UserDataContext.Provider value={[user, setUser]}>
      {children}
    </UserDataContext.Provider>
  )
}

export default UserContextProvider
