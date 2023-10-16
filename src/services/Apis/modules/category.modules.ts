import axios from "axios";
export default{
        findMany: async function() {
        return await axios.get(import.meta.env.VITE_SV_HOST + "categories")
    },
       create: async function(formData: FormData) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "categories", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    update: async function(id: string, data:any) {
        return await axios.patch(import.meta.env.VITE_SV_HOST + `categories/${id}`,data)
    }
}