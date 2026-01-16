import { create } from "zustand"
import axiosInstance from "../../utills/axios.js"
import { toast } from "react-toastify";


export const useAdminStore = create((set, get) => ({
    allUsers: [],
    isAllusersloading: false,
    action: {},
    carouselItems: [],
    loading: false,
    isProcessing: false,
    blogs: [],
    queries: [],
    lyricsList: [],


    getusers: async () => {
        set({
            isAllusersloading: true
        })
        try {
            const res = await axiosInstance.get("/getUsers")
            set({ allUsers: res.data })

        } catch (error) {
            toast.error(error.response?.data?.message || "Failed to fetch users")
        } finally {
            set({
                isAllusersloading: false
            })
        }
    },

    removeEditor: async (userId) => {
        //  alert("removeEditor ")
        try {
            set((state) => ({
                action: { ...state.action, [userId]: true },
            }));

            await axiosInstance.patch(`/removeEditor/${userId}`);

            toast.success("Editor privileges removed");

            // update allUsers list
            set((state) => ({
                allUsers: state.allUsers.map((user) =>
                    user._id === userId ? { ...user, isEditor: false } : user
                ),
                action: { ...state.action, [userId]: false },
            }));
        } catch (error) {
            set((state) => ({
                action: { ...state.action, [userId]: false },
            }));
            toast.error(error.response?.data?.message || "Failed to remove Editor");
        }
    },

    makeEditor: async (userId) => {
        try {
            set((state) => ({
                action: { ...state.action, [userId]: true },
            }));

            await axiosInstance.patch(`/makeEditor/${userId}`);

            toast.success("User is now Editor");
            set((state) => ({
                allUsers: state.allUsers.map((user) =>
                    user._id === userId ? { ...user, isEditor: true } : user
                ),
                action: { ...state.action, [userId]: false },
            }));
        } catch (error) {
            set((state) => ({
                action: { ...state.action, [userId]: false },
            }));
            toast.error(error.response?.data?.message || "Failed to make Editor");
        }
    },

    removeAdmin: async (userId) => {
        try {
            set((state) => ({
                action: { ...state.action, [userId]: true },
            }));

            await axiosInstance.patch(`/removeAdmin/${userId}`);
            toast.success("User is now admin");

            set((state) => ({
                allUsers: state.allUsers.map((user) =>
                    user._id === userId ? { ...user, isAdmin: false } : user
                ),
                action: { ...state.action, [userId]: false },
            }));
        } catch (error) {
            set((state) => ({
                action: { ...state.action, [userId]: false },
            }));
            toast.error(error.response?.data?.message || "Failed to make Admin");
        }
    },

    makeAdmin: async (userId) => {
        try {
            set((state) => ({
                action: { ...state.action, [userId]: true },
            }));

            await axiosInstance.patch(`/makeAdmin/${userId}`);
            toast.success("user is now admin")

            set((state) => ({
                allUsers: state.allUsers.map((user) =>
                    user._id === userId ? { ...user, isAdmin: true } : user
                ),
                action: { ...state.action, [userId]: false },
            }));
        } catch (error) {
            set((state) => ({
                action: { ...state.action, [userId]: false },
            }));
            toast.error(error.response?.data?.message || "Failed to mAKE Admin");
        }
    },

    handleDelete: async (userId) => {
        try {
            set((state) => ({
                action: { ...state.action, [userId]: true }
            }))

            await axiosInstance.delete(`/deleteUser/${userId}`);
            toast.success("user is now in vain");
            set((state) => ({
                allUsers: state.allUsers.map((user) =>
                    user._id === userId ? { ...user, isAdmin: true } : user
                ),
                action: { ...state.action, [userId]: false },
            }));
        } catch (error) {
            set((state) => ({
                action: { ...state.action, [userId]: false },
            }));
            toast.error(error.response?.data?.message || "Failed to Delete User");
        }
    },

    fetchCarousel: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get("/allCars");
            set({ carouselItems: res.data });
        } catch (error) {
            toast.error("Failed to fetch carousel items");
        } finally {
            set({ loading: false });
        }
    },

    addCarousel: async (formData) => {
        const { carouselItems } = get();
        set({ isProcessing: true });
        try {
            const res = await axiosInstance.post("/addCar", formData);
            set({ carouselItems: [...carouselItems, res.data.data] });
            toast.success("Carousel added successfully");
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Failed to add Carousel");
            throw error;
        } finally {
            set({ isProcessing: false });
        }
    },

    deleteCarousel: async (id) => {
        const { carouselItems } = get();
        try {
            await axiosInstance.delete(`/deleteCar/${id}`);
            set({ carouselItems: carouselItems.filter((item) => item._id !== id) });
            toast.success("Carousel deleted successfully");
        } catch (error) {
            toast.error(error?.response?.data?.message || "Cannot delete Carousel");
        }
    },

    updateCarousel: async (id, formData) => {
        const { carouselItems } = get();
        set({ isProcessing: true });
        try {
            const res = await axiosInstance.put(`/updateCar/${id}`, formData);
            set({
                carouselItems: carouselItems.map((item) =>
                    item._id === id ? res.data : item
                ),
            });
            toast.success("Carousel updated");
            return res.data;
        } catch (error) {
            toast.error(error?.response?.data?.message || "Unable to update carousel");
            throw error;
        } finally {
            set({ isProcessing: false });
        }
    },
    adminBlogs: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get('/allBlogs')
            set({ blogs: res.data })
        } catch (error) {
            toast.error("Failed to fetch blogs");
        } finally {
            set({ loading: false });
        }
    },
    handleDeleteblog: async (blogId) => {
        if (!window.confirm("Are you sure you want to delete this blog?")) return;
        try {
            await axiosInstance.delete(`/deleteBlog/${blogId}`);
            get().adminBlogs();
            toast.success("Blog deleted successfully!");
        } catch (error) {
            toast.error("Failed to delete blog.");
        }
    },
    fetchQueries: async () => {
        set({ loading: true });
        try {
            const res = await axiosInstance.get('/getQuery')
            set({ queries: res.data });
        } catch (error) {
            toast.error("Failed to fetch queries", error)
        } finally {
            set({ loading: false });
        }
    },
    handleDeleteQuery: async (queryId) => {
        try {
            await axiosInstance.delete(`/deleteQuery/${queryId}`)
            toast.success("Query deleted successfully")
            get().fetchQueries();
        } catch (error) {
            toast.error("Cannot delete query", error);
        }

    },
    fetchLyrics: async () => {
        set({ loading: true })
        try {
            const res = await axiosInstance.get('/getlyrics');
            set({ lyricsList: res.data });
        } catch (error) {
            toast.error("Cannot fetch lyrics")
        } finally {
            set({ loading: false })
        }
    },
    handleDeletes: async (songId) => {
        try {
            await axiosInstance.delete(`/deletelyrics/${songId}`);
            toast.success("Song lyrics deleted successfully")
            get().fetchLyrics()
        } catch (error) {
            toast.error("Unable to delte song lyrics")
        }
    },
    handleSubmits:async(data)=>{
        set({loading:true});
        try {
            await axiosInstance.post('/admin/postlyrics' , data);
            toast.success("Song lyrics added successfully");
            get().fetchLyrics();
        } catch (error) {
            toast.error("cannot add lyrics")
        } finally{
            set({loading:false});
        }
    }

}))