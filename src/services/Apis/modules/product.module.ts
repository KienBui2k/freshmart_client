import axios from "axios";
export default{
    //     findMany: async function() {
    //     return await axios.get(import.meta.env.VITE_SV_HOST + "categories")
    // },
       create: async function(formData: FormData) {
        return await axios.post(import.meta.env.VITE_SV_HOST + "products", formData,{
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })
    },
    getAll: async function(takeItem:number, skipItem:number){
        return await axios.get(import.meta.env.VITE_SV_HOST + `products?skip=${skipItem}&take=${takeItem}`)
    },
    get: async function(){
        return await axios.get(import.meta.env.VITE_SV_HOST + `products`)
    }
}