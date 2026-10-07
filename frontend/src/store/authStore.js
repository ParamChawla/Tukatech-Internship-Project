import { create } from 'zustand'
import axiosInstance from '../lib/axios'

const useAuthStore = create((set) => ({
  user: null,
  loading: true,
  setUser: (user) => set({ user }),
  logout: () => set({ user: null }),
  checkAuth: async () => {
    try {
      const { data } = await axiosInstance.get('/auth/me')
      set({ user: data, loading: false })
    } catch {
      set({ user: null, loading: false })
    }
  }
}))

export default useAuthStore