import {create} from 'zustand'
import { axiosInstance } from '../lib/axios.js'

export const UseAuthStore = create((set)=>({
    authUser: null,
    isSigningUp: false,
    isloggingIn : false,
    isUpdatingProfiel: false,
    isCheckingAuth: true,


    checkAuth: async ()=>{
        try {
            const response = await axiosInstance.get("/auth/check");
            set({ authUser: res.data});
        } catch (error) {
            console.log("Error in checkAuth", error.message)
            set({authUser:null})
        }finally{
            set({isCheckingAuth: false})
        }
    }
}))