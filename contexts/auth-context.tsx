"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { type User, type AuthState, type LoginCredentials, type RegisterData, authService } from "@/lib/auth"

interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<void>
  register: (data: RegisterData) => Promise<void>
  logout: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  updateProfile: (updates: Partial<User>) => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AuthState>({
    user: null,
    isLoading: true,
    isAuthenticated: false,
  })

  // Initialize auth state on mount
  useEffect(() => {
  const initAuth = async () => {
    try {
      const user = await authService.getCurrentUser()

      console.log("User from localStorage:", user)   // ✅ ADD THIS

      setState({
        user,
        isLoading: false,
        isAuthenticated: !!user,
      })
    } catch (error) {
      console.error("Auth initialization error:", error)
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }

  initAuth()
}, [])


  const login = async (credentials: LoginCredentials) => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const user = await authService.login(credentials)
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const register = async (data: RegisterData) => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const user = await authService.register(data)
      setState({
        user,
        isLoading: false,
        isAuthenticated: true,
      })
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const logout = async () => {
    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      await authService.logout()
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    } catch (error) {
      console.error("Logout error:", error)
      // Force logout even if API call fails
      setState({
        user: null,
        isLoading: false,
        isAuthenticated: false,
      })
    }
  }

  const resetPassword = async (email: string) => {
    await authService.resetPassword(email)
  }

  const updateProfile = async (updates: Partial<User>) => {
    if (!state.user) throw new Error("No user logged in")

    setState((prev) => ({ ...prev, isLoading: true }))

    try {
      const updatedUser = await authService.updateProfile(state.user.id, updates)
      setState((prev) => ({
        ...prev,
        user: updatedUser,
        isLoading: false,
      }))
    } catch (error) {
      setState((prev) => ({ ...prev, isLoading: false }))
      throw error
    }
  }

  const value: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    resetPassword,
    updateProfile,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
