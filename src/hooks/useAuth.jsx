import React, {
  createContext,
  useContext,
  useState,
} from 'react'

import * as authService
  from '../services/authService'

const AuthContext =
  createContext(null)


export function AuthProvider({
  children,
}) {

  const [user, setUser] =
    useState(
      () =>
        authService.getSession()
    )

  const initializing = false


  // =======================================================
  // LOGIN
  // =======================================================

  const login = async (
    credentials
  ) => {

    const session =
      await authService.login(
        credentials
      )

    setUser(session)

    return session
  }


  // =======================================================
  // CREATE ACCOUNT
  // =======================================================

  const register = async (
    accountData
  ) => {

    const session =
      await authService.register(
        accountData
      )

    setUser(session)

    return session
  }


  // =======================================================
  // GOOGLE LOGIN
  // =======================================================

  const loginWithGoogle =
    async (googleUser) => {

      const session =
        await authService.loginWithGoogle(
          googleUser
        )

      setUser(session)

      return session
    }


  // =======================================================
  // DEMO LOGIN
  // =======================================================

  const loginAsDemo =
    async () => {

      const session =
        await authService.loginAsDemo()

      setUser(session)

      return session
    }


  // =======================================================
  // UPDATE PROFILE
  // =======================================================

  const updateProfile =
    async (updates) => {

      const updatedUser =
        await authService.updateProfile(
          updates
        )

      setUser(updatedUser)

      return updatedUser
    }


  // =======================================================
  // LOGOUT
  // =======================================================

  const logout = () => {

    authService.logout()

    setUser(null)
  }


  return (
    <AuthContext.Provider
      value={{
        user,
        initializing,

        login,
        register,

        loginWithGoogle,

        loginAsDemo,

        updateProfile,

        logout,
      }}
    >

      {children}

    </AuthContext.Provider>
  )
}


export function useAuth() {

  const ctx =
    useContext(AuthContext)

  if (!ctx) {

    throw new Error(
      'useAuth must be used within an AuthProvider'
    )

  }

  return ctx
}