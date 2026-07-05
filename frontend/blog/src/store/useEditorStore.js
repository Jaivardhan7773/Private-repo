import { create } from "zustand";
import { useAuthStore } from "./useAuthStore";
import { toast } from "react-toastify";
import axiosInstance from "../utills/axios.js"

export const useEditorStore = create((set, get) => ({
    myblogs: null,
    isloading: false,


    fetchmyblogs: async () => {
        const userId = useAuthStore.getState().authUser?._id;
        if (!userId) {
            toast.error("Login first");
            return;
        }
        set({ isloading: true })

        try {
            const res = await axiosInstance.get(`/userBlogs/${userId}`);
            set({ myblogs: res.data });
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch blogs");
        } finally {
            set({ isloading: false })
        }
    },
    addblog: async (blogData) => {
        const userId = useAuthStore.getState().authUser?._id;

        if (!userId) {
            toast.error("Login first");
            return;
        }

        if (blogData.description.split(" ").length < 300) {
            return toast.error("Description must be at least 300 words.");
        }

        if (!blogData.category) {
            return toast.error("Please select a category.");
        }

        set({ isloading: true });

        try {
            await axiosInstance.post(
                `/addBlog`,
                {
                    ...blogData,
                    userId,
                    tags: blogData.tags.split(","),
                    category: blogData.category,
                }
            );

            toast.success("Blog posted successfully!");
            get().fetchmyblogs(); // refresh blogs
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to post blog.");
        } finally {
            set({ isloading: false });
        }
    },
    // inside useEditorStore.js
    updateBlog: async (updatedBlog) => {
        if (!updatedBlog?._id) return toast.error("No blog selected.");

        if (updatedBlog.description.split(" ").length < 300) {
            return toast.error("Description must be at least 300 words.");
        }

        set({ isloading: true });
        try {
            await axiosInstance.put(`/updateBlog/${updatedBlog._id}`, updatedBlog);
            toast.success("Blog updated successfully!");
            get().fetchmyblogs(); // refresh blogs after update
        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to update blog.");
        } finally {
            set({ isloading: false });
        }
    },
    deleteBlog: async (blogId) => {
  if (!window.confirm("Are you sure you want to delete this blog?")) return;

  set({ isloading: true });
  try {
    await axiosInstance.delete(`/deleteBlog/${blogId}`);
    toast.success("Blog deleted successfully!");
    get().fetchmyblogs(); // refresh blogs after deletion
  } catch (error) {
    toast.error(error.response?.data?.message || "Failed to delete blog.");
  } finally {
    set({ isloading: false });
  }
},


}))