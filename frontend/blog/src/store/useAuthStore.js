import { create } from "zustand"
import axiosInstance from "../utills/axios.js"
import { toast } from "react-toastify";



export const useAuthStore = create((set, get) => ({
    authUser: null,
    isSigningUp: false,
    isLoggingIng: false,
    isChechingAuth: true,
    myblogs: null,
    allUsers: null,
    isAllusersloading: false,
    isLoading: false,

    checkAuth: async () => {
        try {
            const res = await axiosInstance.get("/check");
            set({ authUser: res.data })
        } catch (error) {
            console.error("Error checking authentication:", error);
            set({ authUser: null })
        } finally {
            set({ isChechingAuth: false });
        }
    },
    login: async (data) => {
        set({ isLoggingIng: true });
        try {
            const res = await axiosInstance.post("/login", data);
            set({ authUser: res.data });
            get().checkAuth();
            toast.success("Login successfullly")
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong. Server might be offline.");
        } finally {
            set({ isLoggingIng: false });
        }
    },
    logout: async () => {
        try {
            await axiosInstance.post("/logout");
            set({ authUser: null });
            toast.success("Logged out successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    },
    signup: async (data) => {
        set({ isSigningUp: true })
        try {
            const res = await axiosInstance.post("/signup", data);
            set({ authUser: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Something went wrong . Server might be sexy")
        } finally {
            set({ isSigningUp: false });
        }
    },
    updateProfile: async (data) => {
        set({ isLoading: true });
        try {
            const { authUser } = get();
            await axiosInstance.put(`/updateUser/${authUser._id}`, data);
            toast.success("Profile updated successfully!");

        } catch (error) {
            console.error("Error updating profile:", error.response?.data || error.message);
            toast.error("Failed to update profile.");
        } finally {
            set({ isLoading: false })
        }
    },
    handleImageUpload: async (data) => {
        try {
            await axiosInstance.post(`/upload/profile/${userId}`, data);
            toast.success("Profile image uploaded successfully!");
        } catch (error) {
            toast.error("Error uploading profile image.");
        }
    }

}))