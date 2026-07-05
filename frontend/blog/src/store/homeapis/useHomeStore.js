import { create } from "zustand"
import axiosInstance from "../../utills/axios.js"
import { toast } from "react-toastify";


export const useHomeStore = create((set, get) => ({
  blogs: [],
  isLoading: false,

  fetchAllBlogs: async (page = 1, limit = 8) => {
    set({ isLoading: true });
    try {
      const res = await axiosInstance.get(`/gethomeblogs?page=${page}&limit=${limit}`);
      set({ blogs: res.data });
    } catch (error) {
      toast.error("Cannot get blogs");
    } finally {
      set({ isLoading: false });
    }
  },
  handleGetQuery: async (formData) => {
    set({ isLoading: true });
    try {
      await axiosInstance.post('/addQuery', formData)
      toast.success("Your contact is sent successfully")
    } catch (error) {
      toast.error("Cannot sent Query");
    } finally {
      set({ isLoading: false })
    }
  }

}))